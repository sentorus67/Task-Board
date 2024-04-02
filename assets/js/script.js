
// Retrieve tasks and nextId from localStorage
 let taskList = JSON.parse(localStorage.getItem("tasks"));
 let taskProgList=JSON.parse(localStorage.getItem('progress'));
 let taskDoList=JSON.parse(localStorage.getItem("done"));
// let taskList = localStorage.getItem("tasks");
let nextId = JSON.parse(localStorage.getItem("nextId"));

let taskbox=[];

const today= dayjs();

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
   const timeDue=dayjs().format(date);

   cardHeadText.textContent=title;
   cardBodyText1.textContent=description;
  
   cardBodyText2.textContent=date;
   cardFooterText.textContent="Remove";

   $(cardBody).addClass('body').css('z-index',100).css({"border-width":'5px', "border-style":"solid", "border-color":'black'});


    cardBody.id=uniqueID;
    
   $(cardHeader).addClass('header');
   $(cardMain).addClass('main');
   $(cardFooter).addClass('footer delete-btn');

   cardHeader.appendChild(cardHeadText);
   cardMain.appendChild(cardBodyText1);
   cardMain.appendChild(cardBodyText2);
   cardFooter.appendChild(cardFooterText);

   

   cardBody.appendChild(cardHeader);
   cardBody.appendChild(cardMain);
   cardBody.appendChild(cardFooter);

   cardFooter.addEventListener('click',function(){
    handleDeleteTask(cardFooter)

   });
   const approachingTime=today.diff(timeDue);
   if(approachingTime <0){
    $(cardBody).css('background-color','yellow');
   }
   else{
    $(cardBody).css('background-color','red');
   }
 

   $(cardBody).draggable
   ({
    revert: 'invalid'
    });

  cardBody.ondragover = function(event) {
    event.preventDefault();
  }
  return cardBody
    
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    if(taskList != null){
    
        for (let index = 0; index < taskList.length; index++) {
            const element = taskList[index];

            if(element.taskStatus==1){
            $('#to-do').append(createTaskCard(element.title,element.description,element.date,element.id))};

            if(element.taskStatus==2){
                $('#in-progress').append(createTaskCard(element.title,element.description,element.date,element.id))};

            if(element.taskStatus==3){
                $('#done').append(createTaskCard(element.title,element.description,element.date,element.id))};
            
            taskbox.push(element);
            
        }
    }

 
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    
    const cardTitle=$('#title').val();
    const cardDate=$('#Due-Date').val();
    const cardDescription=$('#Description').val();
    const uniqueID= generateTaskId();
   $('#to-do').append(createTaskCard(cardTitle,cardDescription,cardDate,uniqueID));

    const taskInfo={
        title: cardTitle,
        description: cardDescription,
        date: cardDate,
        id: uniqueID,
        taskStatus: 1,
    }
    taskbox.push(taskInfo);

    $('#title').val('');
    $('#Due-Date').val('');
    $('#Description').val('');

    taskList=localStorage.setItem('tasks',JSON.stringify(taskbox));
    taskList = JSON.parse(localStorage.getItem("tasks"));
    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(x){
   const parent=x.parentNode;
   for (let index = 0; index < taskList.length; index++) {
    const element = taskList[index];
    if (element.id == parent.id){
        newBox=taskbox.toSpliced(index,1);
        taskList=localStorage.setItem('tasks',JSON.stringify(newBox));
        taskList = JSON.parse(localStorage.getItem("tasks"));
         break;
    }
   }
  parent.remove();
    
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const draggedBody=ui.draggable[0];
    const parentBox=$(this)[0].id;
    $(draggedBody).css('top',0);
    $(draggedBody).css('left',0);
    $(draggedBody).detach();
    $(draggedBody).appendTo($(this));
    if(parentBox== 'to-do'){
        draggedBody.taskStatus=1;
    }
    if(parentBox== 'in-progress'){
        draggedBody.taskStatus=2;
    }
    if(parentBox== 'done'){
        draggedBody.taskStatus=3;
    }
    for (let index = 0; index < taskbox.length; index++) {
        if(taskbox[index].id == draggedBody.id){
            taskbox[index].taskStatus=draggedBody.taskStatus;
        }
        
    }

    taskList=localStorage.setItem('tasks',JSON.stringify(taskbox));
    taskList = JSON.parse(localStorage.getItem("tasks"));
    

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();

    $("#openTaskForm").on("click", function() 
    { 
      $( "#enterTask" ).dialog({draggable:false, modal:true,width:600,height:500}).css('z-index',3000);
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
  
    $('#in-progress').droppable({
        drop: handleDrop,
     });

    $('#to-do').droppable({
         drop: handleDrop,
    });
   $('#done').droppable({
        drop: handleDrop,
   });

  
   $('#Due-Date').datepicker({

    beforeShow: function() {
        $("#ui-datepicker-div").appendTo($("#enterTask"));
        $.datepicker._pos = [50, 100];
    }
    
    });

// $("#Due-Date").datepicker({ 

//     beforeShow:function(textbox, instance){
//         $('#ui-datepicker-div').css({
//             position: 'absolute',
//             top:-40,
//             left:5                   
//         });
//         // $('#bookingBox').append($('#Due-Date'));
//         // $('#ui-datepicker-div').hide();
//     } });
   
  
});
