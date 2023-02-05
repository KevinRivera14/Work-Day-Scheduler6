$(function () {

  
  // i used the day.js to represent the current hour 
  const currentHour = dayjs().hour();

  
  // below is for any saved taks that i have, and create empty array's if none are present 
  const savedTasks = JSON.parse(window.localStorage.getItem("savedTasks")) || [];

  
  // below will format today's current date 
  $("#currentDay").text(dayjs().format("dddd, D MMMM"));

  //dynamically creating time blocks in for loop, appending to container
  function createRows() {
    for (let i = 9; i < 18; i++) {
      const container = $(".container-lg")
      //converting military format to am/pm
      const fromMilitary = i <= 12 ? i + "AM" : (i - 12) + "PM"
      let row = $("<div>");
      let hourCol = $("<div>");
      let taskCol = $("<textarea>")
      let btnSave = $("<button>")
      row.addClass("row time-block").attr("id", "hour-" + i)
      hourCol.addClass("col-2 col-md-1 hour text-center py-3").text(fromMilitary)
      taskCol.addClass("col-8 col-md-10 description").attr("rows", 3)
      btnSave.addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>')
      row.append(hourCol).append(taskCol).append(btnSave)
      container.append(row)
    }
  }

  //invoke it before the rest
  createRows();

  //save task
  $("body").on("click", ".saveBtn", function (e) {
    e.preventDefault();
    //get id hour from parent div
    let hour = $(this).parent().attr("id");
    //get value from textarea
    const task = $(this).siblings("textarea").val();
    //check if textarea is not empty
    if (task != " ") {
      //push before save
      savedTasks.push({ hour, task })
      //save new
      window.localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    }
  })

  //coloring time block rows
  $(".time-block").each(function () {
    // getting hour id of parent, splitting to have only number 
    let hour = $(this).attr("id");
    hour = hour.split(("-"))[1];
    //coloring
    if (parseInt(hour) === currentHour) {
      $(this).addClass("present")
    } else if (parseInt(hour) < currentHour) {
      $(this).addClass("past")
    } else {
      $(this).addClass("future")
    }
  })
//dynamically display saved tasks using for loop and comparing hour id
  $(".description").each(function () {
    const id = $(this).parent().attr("id");
    for (let i = 0; i < savedTasks.length; i++) {
      const el = savedTasks[i];
      if (id === el.hour) {
        $(this).text(el.task)
      }
    }
  })
});
