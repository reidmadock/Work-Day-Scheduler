// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
renderLastMessage();

var rowMessage = {
  rowId: "",
  rowTxt: ""
};

function renderLastMessage() {
  localStorage.getItem("saved-task")
}

$(function () {
  var allRows = $(".container-lg").find(".time-block");
  var allButtons = $(".container-lg").find(".saveBtn");
  var allTextAreas = $(".container-lg").find(".description")
  var currentHour = dayjs().hour();
  console.log(allButtons);

  for (var i = 0; i < allRows.length; i++) {
    var rowIds = $(allRows[i]).prop('id');
    console.log(allRows[i]);
    var blockTime = parseInt(rowIds.slice(5));
    var currentClass = $(allRows[i]).prop('class');
    var savedData = localStorage.getItem("block-" + blockTime);
    if (blockTime < currentHour) {
      $(allRows[i]).removeClass(currentClass).addClass('row time-block past')
    }
    if (blockTime == currentHour) {
      $(allRows[i]).removeClass(currentClass).addClass('row time-block present')
    }
    if (blockTime > currentHour) {
      $(allRows[i]).removeClass(currentClass).addClass('row time-block future')
    }
    // localStorage.setItem(allRows[i],"");
    if (savedData) {
      $(allRows[i]).find("textarea").val(savedData);
    }
  }

  $('.saveBtn').on('click', function () {
    // console.log("HEATHER WAS RIGHT");
    // console.log($(this).find(".description"));
    // console.log(this.parentElement);
    // var currText = this.parentElement.childNodes[3].value
    // localStorage.setItem("saved-task",currText);
    var timeBlock = $(this).parent().prop('id');
    var blockText = $(this).siblings('.description').val();
    localStorage.setItem("block-" + timeBlock.slice(5), blockText);
  })
  // TODO: Add code to display the current date in the header of the page.
});

$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D"))
})
