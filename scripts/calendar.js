/**
 * Created by Dylan on 31/03/2015.
 */
/*
 jQuery document ready
 */

$(document).ready(function()
{
    /*
     date store today date.
     d store today date.
     m store current month.
     y store current year.
     */
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /*
     Initialize fullCalendar and store into variable.
     Why in variable?
     Because doing so we can use it inside other function.
     In order to modify its option later.
     */

    var calendar = $('#calendar').fullCalendar(
        {
            /*
             header option will define our calendar header.
             left define what will be at left position in calendar
             center define what will be at center position in calendar
             right define what will be at right position in calendar
             */
            header:
            {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            /*
             defaultView option used to define which view to show by default,
             for example we have used agendaWeek.
             */
            defaultView: 'agendaWeek',
            /*
             selectable:true will enable user to select datetime slot
             selectHelper will add helpers for selectable.
             */
            selectable: true,
            selectHelper: true,
            /*
             when user select timeslot this option code will execute.
             It has three arguments. Start,end and allDay.
             Start means starting time of event.
             End means ending time of event.
             allDay means if events is for entire day or not.
             */
            select: function(start, end, allDay)
            {
                /*
                 after selection user will be promted for enter title for event.
                 */
                var title = prompt('Event Title:');
                /*
                 if title is enterd calendar will add title and event into fullCalendar.
                 */
                if (title)
                {
                    calendar.fullCalendar('renderEvent',
                        {
                            title: title,
                            start: start,
                            end: end,
                            allDay: allDay
                        },
                        true // make the event "stick"
                    );
                }
                calendar.fullCalendar('unselect');
            },
            /*
             editable: true allow user to edit events.
             */
            editable: true,
            /*
             set the first hour of each day to 8am
             TODO : see if we can set first and last hour
             */
            firstHour: 8,




            /*
             events is the main option for calendar.
             for demo we have added predefined events in json object.
             */
            events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1)
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d-5),
                    end: new Date(y, m, d-2)
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d-3, 16, 0),
                    allDay: false
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d+4, 16, 0),
                    allDay: false
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d+1, 19, 0),
                    end: new Date(y, m, d+1, 22, 30),
                    allDay: false
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
                }
            ]
        });

    var levents = localStorage.getItem('events');
    levents = JSON.parse(levents);
    if(levents.length == 0) {
        alert('Nothing in the localStorage !');
        return;
    }
    $.each(levents, function(key, event) {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        if(event.end == null)
            event.end = event.start;
        var events = calendar.fullCalendar('clientEvents');
        // Check if event already exist in calendar
        if(events.length != 0) {
            $.each(events, function(key2, event2) {
                // If an element has the same dates of an other it's needed to have different title
                if( (event.title != event2.title && event.start.toDateString() == event2.start.toDateString() && event.end.toDateString() == event2.end.toDateString()) || (event.start.toDateString() != event2.start.toDateString() && event.end.toDateString() != event2.end.toDateString()) )  {
                    addDay(false, event);
                }
                // Remove from the current collection becoming of localstorage because you can duplicate entry
                events.splice(key2, 1);
            });
        } else {
            addDay(false, event);
        }
    });


    /************************
          Other functions
     ************************/
    // Format Internationnal date to dd-mm-yyyy
    function formatToBasic(dateObject) {
        return [dateObject.getDate(), dateObject.getMonth()+1, dateObject.getFullYear()].join('-');
    }
    // convert dd-mm-yyyy to Internationnal date
    function convertBasicDate(dateString) {
        dateString = dateString.split('-');
        return new Date(dateString[2], dateString[1] - 1, dateString[0]);
    }
    // Check if date format is dd-mm-yy
    function testDate(dateString) {
        var regex = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
        if(regex.test(dateString)) {
            return true;
        } else {
            return false;
        }
    }
});