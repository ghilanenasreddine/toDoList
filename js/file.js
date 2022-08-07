let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let warning = document.querySelector(".warning");
let arrayOfTasks=[];


// get tasks from local storege if they exist and make them th array of tasks
if(window.localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}

// get tasks from local storege and put them in th epage if they exist
getTasksFromLocal()


//  submit on click 

submit.onclick=function(){
    if(input.value!==""){
        addInputToArray(input.value);
        input.value="";
    }
}


//when we click on the task div

tasksDiv.onclick=(e) => {
    // check the delete button
    if(e.target.classList.contains("del")){
        deleteFromArray(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove();
    }
    // check the state of it done or not(the div task)
    if(e.target.classList.contains("task")){
        modifyDone(e.target.getAttribute("data-id"))
        e.target.classList.add("done")
    }
}

// add task to array of tasks
function addInputToArray(inputData){
    const task = {
        id:Date.now(),
        text:inputData,
        done:false
    };
    arrayOfTasks.push(task);
    addTasksToPage(arrayOfTasks);
    addTaskstoLocal(arrayOfTasks);
}

// add task of array to page
function addTasksToPage(arrayOfTasks){
    tasksDiv.innerHTML="";
    arrayOfTasks.forEach((task) => {
        let div=document.createElement("div");
        div.className="task";
        div.setAttribute("data-id",task.id)
        if(task.done){
            div.classList.add("done")
        }
        div.appendChild(document.createTextNode(task.text))
        let span=document.createElement("span");
        span.className="del"
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span)
        tasksDiv.appendChild(div)
    });
}


// add task of array to local storage
function addTaskstoLocal(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}


// get tasks from local storage and add them to page
function getTasksFromLocal(){
    let data=window.localStorage.getItem("tasks")
    if(data){
        let tasks=JSON.parse(data)
    addTasksToPage(tasks);
    }
}
// delete task from array and add the array to page
function deleteFromArray(taskId){
    arrayOfTasks=arrayOfTasks.filter(task=>task.id != taskId)
    addTaskstoLocal(arrayOfTasks)
}

// chanege the state of the task and add the array to page
function modifyDone(taskId){
    for(let i=0;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].done == false ? arrayOfTasks[i].done = true : arrayOfTasks[i].done = false
        }
    }
    addTaskstoLocal(arrayOfTasks)
}