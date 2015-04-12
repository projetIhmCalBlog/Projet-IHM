localStorage.clear();

var events = [{"id":1,"title":"Cours IHM","start":"2015-04-07T06:00:00.000Z","end":"2015-04-07T08:00:00.000Z","allDay":false,"description":"\n"},{"id":2,"title":"TD IHM","start":"2015-04-07T08:00:00.000Z","end":"2015-04-07T10:00:00.000Z","allDay":false,"description":"\n"},{"id":3,"title":"Cours CAR","start":"2015-04-07T11:30:00.000Z","end":"2015-04-07T13:00:00.000Z","allDay":false,"description":"\n"},{"id":4,"title":"TD CAR","start":"2015-04-07T13:00:00.000Z","end":"2015-04-07T14:30:00.000Z","allDay":false,"description":"\n"},{"id":5,"title":"TP CAR","start":"2015-04-07T15:00:00.000Z","end":"2015-04-07T17:00:00.000Z","allDay":false,"description":"\n"},{"id":6,"title":"Cours M3DS","start":"2015-04-08T06:00:00.000Z","end":"2015-04-08T08:00:00.000Z","allDay":false,"description":"\n"},{"id":7,"title":"TP M3DS","start":"2015-04-08T08:00:00.000Z","end":"2015-04-08T10:00:00.000Z","allDay":false,"description":""},{"id":8,"title":"TD RDF","start":"2015-04-08T11:30:00.000Z","end":"2015-04-08T13:30:00.000Z","allDay":false,"description":""},{"id":9,"title":"TP RDF","start":"2015-04-08T13:30:00.000Z","end":"2015-04-08T15:30:00.000Z","allDay":false,"description":""},{"id":10,"title":"Cours LABD","start":"2015-04-09T06:00:00.000Z","end":"2015-04-09T08:00:00.000Z","allDay":false,"description":""},{"id":11,"title":"TP LABD","start":"2015-04-09T08:00:00.000Z","end":"2015-04-09T10:00:00.000Z","allDay":false,"description":""},{"id":12,"title":"Cours FAA","start":"2015-04-06T06:00:00.000Z","end":"2015-04-06T08:00:00.000Z","allDay":false,"description":""},{"id":13,"title":"TP FAA","start":"2015-04-06T08:00:00.000Z","end":"2015-04-06T10:00:00.000Z","allDay":false,"description":""}];

var profs = [{"id":1,"name":"Forest","firstname":"Dylan"}];

var documents = [{"id":1,"link":"undocument.pdf ou undocument.html","description":"description du cours par le prof","idEvent":"1"}];

var students = [{"id":0, "name":"", "firstname":"Anonymous"},{"id":1, "name":"nomEleve", "firstname":"prenomEleve"}];

var commentaries = [{"id":1, "idEvent":1, "idStudent":1,"text":"Est-ce que les poly du cours seront disponnible à la séance ou devons nous les imprimer ?", "date":"2015-04-07T06:00:00.000Z"}];

localStorage.setItem('events',JSON.stringify(events));
localStorage.setItem('profs',JSON.stringify(profs));
localStorage.setItem('documents',JSON.stringify(documents));
localStorage.setItem('students',JSON.stringify(students));
localStorage.setItem('commentaries',JSON.stringify(commentaries));