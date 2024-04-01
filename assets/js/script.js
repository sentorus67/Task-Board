
// Retrieve tasks and nextId from localStorage
 let taskList = JSON.parse(localStorage.getItem("tasks"));
// let taskList = localStorage.getItem("tasks");
let nextId = JSON.parse(localStorage.getItem("nextId"));
let taskbox=[];
let taskIPBox=[];
let taskDone=[];

function setExisitingTasks(){
if(taskList != null){
    
    for (let index = 0; index < taskList.length; index++) {
        const element = taskList[index];
        createTaskCard(element.title,element.description,element.date,element.id);
        taskbox.push(element);
        
    }
}
}

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
function createTaskCard(title, description, date,id) {
   const cardBody= document.createElement("body");
   const cardHeader= document.createElement('header');
   const cardMain= document.createElement('main');
   const cardFooter= document.createElement('button');

   const cardHeadText= document.createElement('h3');
   const cardBodyText1= document.createElement('p');
   const cardBodyText2= document.createElement('p');
   const cardFooterText= document.createElement('h3');
   const uniqueID= id;
  
   cardHeadText.textContent=title;
   cardBodyText1.textContent=description;
   cardBodyText2.textContent=date;
   cardFooterText.textContent="Remove";

   $(cardBody).addClass('body').css('z-index',1000);

    cardBody.id=uniqueID;
    
   $(cardHeader).addClass('header');
   $(cardMain).addClass('main');
   $(cardFooter).addClass('footer delete-btn');

   cardHeader.appendChild(cardHeadText);
   cardMain.appendChild(cardBodyText1);
   cardMain.appendChild(cardBodyText2);
   cardFooter.appendChild(cardFooterText);

   cardFooter.addEventListener('click',function(){
    handleDeleteTask(cardFooter)
   });

   cardBody.appendChild(cardHeader);
   cardBody.appendChild(cardMain);
   cardBody.appendChild(cardFooter);

   $(cardBody).draggable
   ({
    revert: 'invalid'
    });

  cardBody.ondragover = function(event) {
    event.preventDefault();
  }

    $('#to-do').append(cardBody);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
//  for (let index = 0; index < taskbox.length; index++) {
//     const element = taskbox[index];

    
//  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    
    const cardTitle=$('#title').val();
    const cardDescription=$('#Due-Date').val();
    const cardDate=$('#Description').val();
    const uniqueID= generateTaskId();
    createTaskCard(cardTitle,cardDescription,cardDate,uniqueID);

    const taskInfo={
        title: cardTitle,
        description: cardDescription,
        date: cardDate,
        id: uniqueID,
    }
    taskbox.push(taskInfo);

    $('#title').val('');
    $('#Due-Date').val('');
    $('#Description').val('');
    console.log(taskbox);
    taskList=localStorage.setItem('tasks',JSON.stringify(taskbox));
    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(x){
   const parent=x.parentNode;
   for (let index = 0; index < taskList.length; index++) {
    const element = taskList[index];
    if (element.id == parent.id){
        newBox=taskbox.toSpliced(index,1);
        taskList=localStorage.setItem('tasks',JSON.stringify(newBox));
         break;
    }
   }
  parent.remove();
    
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

$('#in-progress').droppable();
$('#to-do').droppable();
$('#done').droppable();

    setExisitingTasks();
    $("#openTaskForm").on("click", function() 
    {
      $( "#enterTask" ).dialog();
    });
  
  $("#submitButton").on("click",function(){
     if($('#title').val() !='' && $('#Due-Date').val()!='' && $('#Description').val() !='' )
      {
      handleAddTask();
     
      $( "#enterTask" ).dialog("close");
      }
      else
      {
          alert('One or more boxes are empty.')
      }
  });
  
});
