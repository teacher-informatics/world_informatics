const draggableElems = document.querySelectorAll(".draggable");
const droppableElems = document.querySelectorAll(".droppable");

draggableElems.forEach((elem) => {
  elem.addEventListener("dragstart", dragStart);
});

droppableElems.forEach((elem) => {
  elem.addEventListener("dragenter", dragEnter);
  elem.addEventListener("dragover", dragOver);
  elem.addEventListener("dragleave", dragLeave);
  elem.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}


function dragEnter(event) {
  event.preventDefault();
  event.target.classList.add("droppable-hover");
}

function dragOver(event) {
  event.preventDefault();
}

function dragLeave(event) {
  event.target.classList.remove("droppable-hover");
}

function drop(event) {
  event.preventDefault();
  
  let draggableElemData = event.dataTransfer.getData("text");
  let droppableElemData = event.target.dataset.draggableId;
  
  if (draggableElemData === droppableElemData) {
    let droppableElem = event.target;
    let draggableElem = document.getElementById(draggableElemData);

    droppableElem.classList.add("dropped");
    let draggableElemParent = draggableElem.parentElement;
    draggableElemParent.classList.add('new_block');
   
    draggableElem.classList.add("dragged");

    draggableElem.setAttribute("draggable", "false");
	event.target.appendChild(document.getElementById(draggableElemData));
   
  } else {
    event.target.classList.remove("droppable-hover");
  }

  setTimeout(()=>{
    location.reload()
  },30000)
}


let activeDrag = null;
let offsetX = 0;
let offsetY = 0;

// ================= START DRAG =================
draggableElems.forEach(elem => {
  elem.addEventListener("pointerdown", e => {
    if (elem.classList.contains("dragged")) return;

    activeDrag = elem;
    elem.setPointerCapture(e.pointerId);

    const rect = elem.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    elem.style.position = "absolute";
    elem.style.zIndex = "1000";
  });
});

// ================= MOVE =================
document.addEventListener("pointermove", e => {
  if (!activeDrag) return;

  activeDrag.style.left = e.clientX - offsetX + "px";
  activeDrag.style.top = e.clientY - offsetY + "px";

  droppableElems.forEach(drop => {
    drop.classList.toggle(
      "droppable-hover",
      isOver(activeDrag, drop)
    );
  });
});

// ================= END DRAG =================
document.addEventListener("pointerup", () => {
  if (!activeDrag) return;

  droppableElems.forEach(drop => {
    drop.classList.remove("droppable-hover");

    if (isOver(activeDrag, drop)) {
      handleDrop(activeDrag, drop);
    }
  });

  activeDrag = null;
});

// ================= DROP LOGIC =================
function handleDrop(draggableElem, droppableElem) {
  if (draggableElem.id === droppableElem.dataset.draggableId) {
    droppableElem.classList.add("dropped");

    draggableElem.parentElement.classList.add("new_block");
    draggableElem.classList.add("dragged");

    draggableElem.style.position = "static";
    draggableElem.style.zIndex = "auto";

    droppableElem.appendChild(draggableElem);
  }
}

// ================= COLLISION =================
function isOver(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();

  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

// ================= AUTO RELOAD =================
setTimeout(() => {
  location.reload();
}, 80000);
