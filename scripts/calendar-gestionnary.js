$(document).ready(function() {
	/*
	 * Objects
	 */
	// event
	function Event(title, start, end) {
		this.title = title;
		this.start = start;
		this.end = end;

		return this;
	}
	function EventDto(event) {
		this.title = event.title;
		this.start = event.start;
		this.end = event.end;
		this.allDay = event.allDay;
		this.color = event.color;

		return this;
	}

	var events = [];


	/*
	 * CREATE CALENDAR
	 */
	var calendar = $('#calendar'); 
	calendar.fullCalendar({
		// Current jQueryUI theme
		theme: true,
		// Drag & Drop event
		editable: true,
		dayClick: function(date, allDay, jsEvent, view) {
			var event = new Event('Rendezvous name', date, date);
			editEvent(event, 'Add a Rendezvous', false);
		},
		eventClick: function(event) {
			if(event.end == null) {
				event.end = event.start;
			}
			editEvent(event, 'Edit a Rendezvous', true);
		}
	});

	/*
	 * CALENDAR FUNCTIONS
	 */
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
	}

	/*
	 * 
	 */
	// 
	$('#saveEvents').click(function() {
		localStorage.setItem('events', JSON.stringify(events));
	});
	// 
	$('#loadEvents').click(function() {
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
		$('#start').val(formatToBasic(event.start));
		$('#end').val(formatToBasic(event.end));
		
		// Form submission
		$('#editEvent').unbind().submit(function() {
			var el = $(this),
				title = el.find('#name').val(),
				start = el.find('#start').val(),
				end = el.find('#end').val();
			
			if(end == '') {
				end = start;
			}

			if(title != '' && testDate(start) && testDate(end)) {
				event.title = title;
				event.start = convertBasicDate(start);
				event.end = convertBasicDate(end);

				addDay(state, event);

				$('#dialogEditEvent').dialog('close');
			} else {
				alert('Empty Fields Or Bad Date Format');
			}

			return false;
		});
	}
	// Listen dialog creation event for init fields with datepicker
	$('#dialogEditEvent').on('dialogcreate', function(event, ui) {
		$('#start').datepicker({ dateFormat: 'dd-mm-yyyy' });
		$('#end').datepicker({ dateFormat: 'dd-mm-yyyy' });
	});

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