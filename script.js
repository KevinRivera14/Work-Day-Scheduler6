$(function () {

  
  // i used the day.js to get  the current hour 
  const currentHour = dayjs().hour();

  
  // below is for any saved task's  and create empty array's if none are available 
  const savedTasks = JSON.parse(window.localStorage.getItem("savedTasks")) || [];

  
  // below will  show the format today's current date 
  $("#currentDay").text(dayjs().format("dddd, D MMMM"));

  //dynamically creating time blocks in for loop, appending to container
  function createRows() {
    for (let i = 9; i < 18; i++) {
      const container = $(".container-lg")
      //Below is showing  military time convert to am/pm
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

  // below will invoke it before the rest
  createRows();

  // below will show the save task
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

  // below will show the color-coded time block rows
  $(".time-block").each(function () {
    //  Below will show the getting hour id of parent, splitting to have only number 
    let hour = $(this).attr("id");
    hour = hour.split(("-"))[1];
    // Bellow will show the coloring
    if (parseInt(hour) === currentHour) {
      $(this).addClass("present")
    } else if (parseInt(hour) < currentHour) {
      $(this).addClass("past")
    } else {
      $(this).addClass("future")
    }
  })

  
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
