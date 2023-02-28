$(function () {
  var allRows = $(".container-lg").find(".time-block");
  var currentHour = dayjs().hour();

  /* Iterate over every row element on page, check the time, check for local storage entry. */
  for (var i = 0; i < allRows.length; i++) {
    var rowIds = $(allRows[i]).prop('id');
    var blockTime = parseInt(rowIds.slice(5));
    var currentClass = $(allRows[i]).prop('class');
    var savedData = localStorage.getItem(rowIds);

    if (blockTime < currentHour) {
      $(allRows[i]).removeClass(currentClass).addClass('row time-block past')
    }
    if (blockTime == currentHour) {
      $(allRows[i]).removeClass(currentClass).addClass('row time-block present')
    }
    if (blockTime > currentHour) {
      $(allRows[i]).removeClass(currentClass).addClass('row time-block future')
    }
    if (savedData) {
      $(allRows[i]).find("textarea").val(savedData);
    }
  }
  /*  Grab the hour from the parent, grab the description from the clicked block, store with ID*/
  $('.saveBtn').on('click', function () {
    var timeBlock = $(this).parent().prop('id');
    var blockText = $(this).siblings('.description').val();
    localStorage.setItem(timeBlock, blockText);
  })
});

$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D"))
})
