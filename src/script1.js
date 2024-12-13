/* drag and drop elements */

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






draggableElems.forEach((elem) => {
  elem.addEventListener("touchstart", touchStart);
});

droppableElems.forEach((elem) => {
  elem.addEventListener("touchmove", touchMove);
  elem.addEventListener("touchleave", touchLeave);
  elem.addEventListener("drop", drop);
});


function touchStart(event) {
  event.preventDefault();
  event.target.classList.add("droppable-hover");
  alert('start');
}





