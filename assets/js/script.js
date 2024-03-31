
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));



// Todo: create a function to generate a unique task id
function generateTaskId() {
 let charlist="1234567890qwertyuiopasdfghjklzxcvbnm";
 let uniqueID="";

 for (let index = 0; index < 11; index++) {
    const keyPiece = charlist.charAt(Math.floor(Math.random()*(charlist.length)));

    uniqueID +=keyPiece;
 }
 return uniqueID;
 
}

// Todo: create a function to create a task card
function createTaskCard(task) {
   const cardBody= document.createElement("body");
   const cardHeader= document.createElement('header');
   const cardMain= document.createElement('main');
   const cardFooter= document.createElement('button');

   const cardHeadText= document.createElement('h2');
   const cardBodyText1= document.createElement('p');
   const cardBodyText2= document.createElement('p');
   const cardFooterText= document.createElement('h2');

   cardHeadText.textContent=generateTaskId();
   cardBodyText1.textContent=generateTaskId();
   cardBodyText2.textContent=generateTaskId();
   cardFooterText.textContent="Remove";

   $(cardBody).addClass('body');
   $(cardHeader).addClass('header');
   $(cardMain).addClass('main');
   $(cardFooter).addClass('footer');

   cardHeader.appendChild(cardHeadText);
   cardMain.appendChild(cardBodyText1);
   cardMain.appendChild(cardBodyText2);
   cardFooter.appendChild(cardFooterText);

   cardBody.appendChild(cardHeader);
   cardBody.appendChild(cardMain);
   cardBody.appendChild(cardFooter);


    $('#to-do').append(cardBody);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

$("#openTaskForm").on("click", function() 
  {
    $( "#enterTask" ).dialog();
  } );


$("#submitButton").on("click",function(){
    createTaskCard();
});


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
