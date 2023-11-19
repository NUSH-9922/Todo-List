// this is the mein input. we get
let meinInput = document.getElementById("meinInput");

// select all toDoList-container-row-3-container in one variable [ container ].
let container = document.querySelector(".toDoList-container-row-3-container");
let taskData = []; // all task data stor in the from of array.
let taskDone = []; // all check or done data index value stor in this array.

// *************************************************** create read and delete ****************************************************************
function showing() {
  if (taskData.length === 0) {
    document.querySelector(".toDoList-container-row-3-container").classList.add("backgroundImage");
  }
  else {
    document.querySelector(".toDoList-container-row-3-container").classList.remove("backgroundImage");
  }
  console.log(taskData.length);
}


if (taskData.length === "") {
  document.querySelector(".toDoList-container-row-3-container").classList.add("backgroundImage");
}

// for addData btn.
document.getElementById("addBtn").addEventListener("click", function () {
  meinFunction();

});

// if i press enter.
meinInput.onkeydown = function (keyValue) {
  if (keyValue.key === "Enter") {
    meinFunction();
  }
}
// mein function it stor in a function because we use it in 2 difarent place thats why we make this
function meinFunction() {
  let taskInput = meinInput.value.trim();
  let task;

  // this regex make by chatGpt
  // Regular expression to match strings containing only letters and allowing numbers
  // const lettersAndNumbersRegex = ;
  if (!/^[a-zA-Z0-9\s]*$/.test(taskInput)) {
    // Input is invalid
    alert("Invalid input. Please enter a valid task starting with an alphabetical character.");
  } else {
    // Input is valid, capitalize the first letter
    task = taskInput.charAt(0).toUpperCase() + taskInput.slice(1);
  }

  if (!task) { // if task or no input given.
    meinInput.style.borderColor = "red";
  } else { // if i enter task.
    document.querySelector(".toDoList-container-row-3-container").classList.remove("backgroundImage");
    meinInput.style.borderColor = "";
    taskData.push(task);
    storDataInLocalStorage();
    setData();
    resetInputValue();
  }


  // Add the "completed" class to the first element in the allTaskListStatus Node
  removeLine();
  allTaskListStatus[0].classList.add("completed");
  // Call the removeLine function to remove the line (assuming this function exists).
}


// stor clearAllbtn in a vairiable 
let clearAllbtn = document.getElementById("clearAllbtn");
clearAllbtn.onclick = function () {

  taskData.length = 0; // if i click clearAllbtn then empty my all taskdata
  taskDone.length = 0; // if i click clearAllbtn then empty my all taskDone index data
  // Update the UI to reflect the cleared data
  setData();
  // Store the updated data in local storage
  storDataInLocalStorage();
  showing();
}



// if my given condition is true then this function is called and stor data in local storage if help us when user page reload then showing his previse data.
function storDataInLocalStorage() {
  localStorage.setItem("taskData", JSON.stringify(taskData)); // in set my task data in the form of json
  localStorage.setItem("taskDone", JSON.stringify(taskDone)); // in set my taskdone data in the form of json
}

// if function call 2 time when the page is reload and when user adds any data
function setData() {
  // Clear existing content in the container before adding new data.
  container.innerHTML = "";

  // Use a document fragment for better performance.
  const fragment = document.createDocumentFragment();

  taskData.forEach((task, index) => {
    const isChecked = taskDone.includes(index);

    // Create elements instead of using innerHTML for better performance.
    const listItem = document.createElement('div');
    listItem.className = 'toDoList-container-row-3-list-box';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'toDoList-container-row-3-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = '';
    checkbox.className = 'checkbox';
    checkbox.id = `checkbox${index}`;
    checkbox.checked = isChecked;

    const taskText = document.createElement('h3');
    taskText.className = 'toDoList-container-row-3-left-text';
    taskText.textContent = task;

    const rightDiv = document.createElement('div');
    rightDiv.className = 'toDoList-container-row-3-right';

    const editIcon = document.createElement('i');
    editIcon.className = 'ri-sip-line edit-icon';
    editIcon.id = 'edit-icon';

    // Append child elements
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(taskText);
    listItem.appendChild(leftDiv);
    listItem.appendChild(rightDiv);
    rightDiv.appendChild(editIcon);

    fragment.appendChild(listItem);
  });

  // Append the fragment to the container outside the loop for better performance.
  container.appendChild(fragment);

  showEditBox();
  // Initialize event handlers for newly created checkboxes
  checkMark();
}
// this function make our input fuild empty when we input some text and click add
function resetInputValue() {
  meinInput.value = "";
}

// this function call first time when page reload 
function checkMark() {
  // select all checkbox in one variable [ checkbox ].
  let checkboxes = document.querySelectorAll(".checkbox");
  // select all toDoList-container-row-3-left-text in one variable [ task ].
  let task = document.querySelectorAll(".toDoList-container-row-3-left-text");
  // Attach event handlers to each checkbox

  checkboxes.forEach((checkbox, index) => {
    function checkMarkIndexStore() {
      checkbox.onclick = function () {
        // Check if the checkbox is checked
        if (checkbox.checked) {
          // Apply line-through style to the corresponding task text


          // Add the task index to taskDone if it's not already present
          if (!taskDone.includes(index)) {
            taskDone.push(index);
          }
        } else {
          // Remove line-through style from the corresponding task text
          task[index].style.textDecoration = "";

          // Remove the task index from taskDone
          taskDone = taskDone.filter(item => item !== index);
        }

        // Store the updated taskDone data in local storage
        storDataInLocalStorage();
      };
    }
    checkMarkIndexStore();
    // add line-through on selected line





  })
};

checkMark();





// ********************************************* update task *************************************** 
function showEditBox() {
  let editIcon = document.querySelectorAll(".edit-icon");
  let editBox = document.querySelector(".edit-container");
  let editinput = document.getElementById("row-1-1-input");
  let editBtn = document.getElementById("row-1-2-inputbtn");

  // show editbox ---- 
  editIcon.forEach((el, i) => {
    el.onclick = function () {
      editBox.style.display = "flex";
      editinput.value = taskData[i];
      updateTaskData(i);
      deleteTask(i);
    }
  })

  function updateTaskData(i) {
    editBtn.onclick = function () {
      let taskInput = editinput.value.trim();
      let task;

      // this regex make by chatGpt
      // Regular expression to match strings containing only letters and allowing numbers
      // const lettersAndNumbersRegex = ;
      if (!/^[a-zA-Z0-9\s]*$/.test(taskInput)) {
        // Input is invalid
        alert("Invalid input. Please enter a valid task starting with an alphabetical character.");
      } else {
        // Input is valid, capitalize the first letter
        task = taskInput.charAt(0).toUpperCase() + taskInput.slice(1);
        taskData[i] = task;

        setData();
        storDataInLocalStorage();
       
        resetEditboxAllitem();
      }



    }
  }
}

function deleteTask(i) {
  let deleteTaskBox = document.getElementById("row-2-top-icon");
  let row_2_bottom = document.querySelector(".row-2-bottom");
  let deleteTaskBtn = document.querySelector(".row-2-bottom-left");
  let cancleTaskBtn = document.querySelector(".row-2-bottom-right");
  deleteTaskBox.onclick = function () {
    row_2_bottom.style.display = "flex";

  }
  deleteTaskBtn.onclick = function () {
    taskData.splice(i, 1);
    resetEditboxAllitem();
    setData();
    storDataInLocalStorage();
    showing();
  }
  cancleTaskBtn.onclick = function () {
    resetEditboxAllitem();
  }
}


showEditBox();

function resetEditboxAllitem() {
  document.querySelector(".edit-container").style.display = "none";
  document.querySelector(".row-2-bottom").style.display = "none"
}


// Retrieve taskData and taskDone data from local storage
let JSONData = localStorage.getItem("taskData");
let JSONTaskdone = localStorage.getItem("taskDone");

// Parse and update taskData if available
if (JSONData) {
  taskData = JSON.parse(JSONData);
}

// Parse and update taskDone if available
if (JSONTaskdone) {
  taskDone = JSON.parse(JSONTaskdone);
}

// Populate the UI with tasks and update checkbox states
setData();



// ************************************************************************filter data  ***************************************************************

let allTaskListStatus = document.querySelectorAll(".toDoList-container-row-2-left-h3");
// show no 1 bottom line
allTaskListStatus[0].classList.add("completed");
// Add click event listener to each element in the NodeList
allTaskListStatus.forEach((taskListStatus, index) => {
  taskListStatus.addEventListener("click", function () {
    //reset classList if i click again 
    showing()
    removeLine();
    // Toggle a class to control styles
    allTaskListStatus[index].classList.add("completed");

  });
});




function removeLine() {
  allTaskListStatus.forEach((taskListStatus, index) => {
    allTaskListStatus[index].classList.remove("completed");
  });
}
let allTask = document.getElementById("allTask");
allTask.onclick = function () {
  setData();
  checkMark();
  storDataInLocalStorage();
}



// Assume 'PendingTask' is the element representing the action for displaying pending tasks
let PendingTask = document.getElementById("pendingTask");
PendingTask.onclick = function () {
  // Clear the container before adding pending tasks
  container.innerHTML = "";
  showing();
  // Iterate through the taskData array and add pending tasks to the container
  taskData.forEach((task, i) => {
    if (!taskDone.includes(i)) {
      container.innerHTML += `
        <div class="toDoList-container-row-3-list-box">
          <div class="toDoList-container-row-3-left">
            <input type="checkbox" name="" class="checkbox" id="checkbox${i}">
            <h3 class="toDoList-container-row-3-left-text">${task}</h3>
          </div>
          <div class="toDoList-container-row-3-right">
            <i class="ri-sip-line" class="edit-icon" id="edit-icon"></i>
          </div>
        </div>`;
    }
  });
  let editIcon = document.querySelectorAll(".edit-icon");

  checkMark();
  storDataInLocalStorage();
  showEditBox();
};

// we store Complited task in a variable
let completedTask = document.getElementById("Completedtask");
completedTask.onclick = function () {
  document.querySelector(".toDoList-container-row-3-container").classList.remove("backgroundImage");
  container.innerHTML = "";
  taskData.forEach((task, i) => {
    if (taskDone.includes(i)) {
      container.innerHTML += `
      <div class="toDoList-container-row-3-list-box">
        <div class="toDoList-container-row-3-left">
          <input type="checkbox" name="" class="checkbox" id="checkbox${i}" ${taskDone.includes(i) ? 'checked' : ''}>
          <h3 class="toDoList-container-row-3-left-text">${taskData[i]}</h3>
        </div>
        <div class="toDoList-container-row-3-right">
          <i class="ri-sip-line" class="edit-icon" id="edit-icon"></i>
        </div>
      </div>`;

    }




  })

  let checkboxes = document.querySelectorAll(".checkbox");
  if (!checkboxes[0].checked) {
    document.querySelector(".toDoList-container-row-3-container").classList.add("backgroundImage");
  }


  checkMark();
  storDataInLocalStorage();

}

