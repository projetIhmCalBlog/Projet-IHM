/**
 * Created by Dylan on 31/03/2015.
 */
/*
 jQuery document ready
 */

$(document).ready(function()
{

    /*
    import script localstorage
     */


   /* $('#saveEvents').click(function() {
        console.log(JSON.stringify(events));
        localStorage.setItem('events', JSON.stringify(events));
    });*/

    // event objects
    function Event(id, title, start, end, allDay, description) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.description = description;

        return this;
    }
    function EventDto(event) {
        this.id = event.id;
        this.title = event.title;
        this.start = event.start;
        this.end = event.end;
        this.allDay = event.allDay;
        this.description = event.description;
        this.color = event.color;

        return this;
    }
    /*
     events is the main option for calendar.
     for demo we have added predefined events in json object.
     */
    var events = [

    ];

    var id = 1;

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
                //var title = prompt('Event Title:');

                var event = new Event(null,'Event',start,end,allDay,'');
                editEvent(event,'New event',false);
            },

            eventClick: function(event)
            {
                window.location.href = 'detailCours.html?event='+event.id;
            },

            /*
             editable: true allow user to edit events.
             */
            editable: true,
            /*
             set the first hour of each day to 8am
             TODO : see if we can set first and last hour
             */
            firstHour: 8
        });

    //localStorage.clear();

    var levents = localStorage.getItem('events');

    //if(levents == null)
    //    alert("no data in localstorage.");
    levents = JSON.parse(levents);
    levents.sort(levents.id);
    $.each(levents, function(key, event) {
        if(event.id >= id) id = event.id+1;
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        if(event.end == null)
            event.end = event.start;
        addDay(false, event);
    });

    /*
     * EVENT FORM
     */
    function editEvent(event, title, state) {
        // Transform to dialog
        $('#dialogEditEvent').dialog({
            modal: true,
            title: title
        });

        // Init val of the input with the date of the clicked item
        $('#name').val(event.title);

        // Form submission
        $('#editEvent').submit(function(e) {
            var el = $(this),
            title = el.find('#name').val(),
            description = el.find('#desc').val();

            if(title != '') {
                event.title = title;
                event.description = description;
                event.id = id++;
                //alert(event.id);
                addDay(state, event);

                $('#dialogEditEvent').dialog('close');

                localStorage.setItem('events', JSON.stringify(events));

            } else alert('Empty Fields');
        });
    }
    /************************
     calendar functions
     ***********************/
    // addDay Function (state : update or not)
    function addDay(state, event) {
        if(state == false) {
            calendar.fullCalendar('renderEvent', event, true);
        } else {
            calendar.fullCalendar('updateEvent', event);
        }
        if(event.end == null)
            event.end = event.start;
        var eventDto = new EventDto(event);
        events.push(eventDto);
        console.log(JSON.stringify(events));
    }

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