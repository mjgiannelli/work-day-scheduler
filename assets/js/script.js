// add current day to display at top of page under header
//  - will add text content of current day and append to the <p> element in the header in the format 'Name of Day', 'Full name of month', 'Numerical Day with suffix th or st'
// add time blocks to div container using jquery (3 columns in a row, 9 rows):
//  - first time in format '12AM'
//  - then task container
//  - then save icon
// create formatting feature to color code time block:
//  - grey for past
//  - red for in progress
//  - green for upcoming
// add functionality so when user clicks into time block:
//  - can edit the text content on focus
//  - hardcode the content on blur
// when user clicks the save button icon the text for the event saves into local storage via an array object
// when user refreshes page - get the object array from local storage and recreate the events on the page

// ** GLOBAL VARIABLES ** // 

//target <p> element for currentDay to display
var currentDayEl = $('#currentDay');
//target containter <div>
var containerEl = $('.container');
//get current time in hA format
var currentHour = moment().hour();
//create array that lists all of the hours for current work day
var workDayHours = [
    moment().hour(9).format('hA'),
    moment().hour(10).format('hA'),
    moment().hour(11).format('hA'),
    moment().hour(12).format('hA'),
    moment().hour(13).format('hA'),
    moment().hour(14).format('hA'),
    moment().hour(15).format('hA'),
    moment().hour(16).format('hA'),
    moment().hour(17).format('hA')
];
//target the div that holds the time block hour
var timeBlockHour = $('col-1 hour')

// ** END GLOBAL VARIABLES ** //

//add current day to <p> tag in jumbotron
var currentDay = moment().format('dddd, MMMM Do');
currentDayEl.text(currentDay);


//compare each time block to the current time
// - if after, if present, add class of 'future' to timeBlockEventSpace
// - if equal, add class of 'present' to timeBlockEventSpace
// - else add class of past to timeBlockEventSpace

function auditTimeBlock(timeBlockEventSpace) {
    //retrieve the hour from the div and convert it to the x'th hour of the day
    var currentTimeBlockHour = moment($(timeBlockHour).text().trim(), 'hA').hour();

    //remove class of 'past present future
    $(timeBlockEventSpace).removeClass('past present future');

    //if currentTimeBlockHour
    if (currentTimeBlockHour > currentHour) {
        $(timeBlockEventSpace).addClass('future');
    }
    else if (currentTimeBlockHour === currentHour) {
        $(timeBlockEventSpace).addClass('present');
    }
    else {
        $(timeBlockEventSpace).addClass('past');
    }
}

//add time blocks for each hour (3 columns in 9 rows: 9AM to 5PM) format for 9AM is hA
for (var i = 0; i < workDayHours.length; i++) {
    //add div with class row
    var timeBlockRow = $('<div>')
        .addClass('row time-block')

    // add 1 div with class hour
    var timeBlockHour = $('<div>')
        .addClass('col-1 hour')
        .text(workDayHours[i])

    // add 1 div with class
    var timeBlockEventSpace = $('<div>')
        .addClass('col-10')
        .attr({
            id: 'Hour-' + i
        });

    // add p element with class of description
    var userInput = $('<p>')
        .addClass('description')
        .text(' ');

    //check time
    auditTimeBlock(timeBlockEventSpace);

    // add a button with class saveBtn
    var saveBtn = $('<button>')
        .addClass('col-1 saveBtn')
        .attr({
            id: 'save-button',
            type: 'button',
        });

    // add save icon
    var saveIcon = $('<i>')
        .addClass('fas fa-save');

    //append timeBlockRow to div container
    $(containerEl).append(timeBlockRow);
    //append timeBlockHour to TimbeBlockRow
    $(timeBlockRow).append(timeBlockHour);
    //append timeBlockEventSpace to timeBlockRow
    $(timeBlockRow).append(timeBlockEventSpace);
    //append <p> element to timeBlockEventSpace
    $(timeBlockEventSpace).append(userInput);
    //append save button to timeBlowRow
    $(timeBlockRow).append(saveBtn);
    //append save icon to save button
    $(saveBtn).append(saveIcon);
}

// add functionality so when user clicks into time block:
//  - can edit the text content on focus
//  - hardcode the content on blur

$('.col-10').on('click', 'p', function () {
    console.log('clicked');

    var text = $(this)
        .text()
        .trim()

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger('focus');
});

$('.col-10').on('blur', 'textarea', function () {
    // get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();

    // recreate p element
    var userTextP = $("<p>")
        .addClass("description")
        .text(text);

    // replace textarea with p element
    $(this).replaceWith(userTextP);
})


