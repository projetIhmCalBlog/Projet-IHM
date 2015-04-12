/*
 jQuery document ready
 */

$(document).ready(function()
{
 
    // prof constructor
    function Prof(id, name, firstname) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;

        return this;
    }
    function ProfDto(prof) {
        this.id = prof.id;
        this.name = prof.name;
        this.firstname = prof.firstname;

        return this;
    }
	
	// document constructor
    function Document(id, link, description, idEvent) {
        this.id = id;
        this.link = link;
        this.description = description;
		this.idEvent = idEvent;

        return this;
    }
    function DocumentDto(document) {
        this.id = document.id;
        this.link = document.link;
        this.description = document.description;
		this.idEvent = document.idEvent;

        return this;
    }
	
	// student constructor
    function Student(id, name, firstname) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
		
        return this;
    }
    function StudentDto(student) {
        this.id = student.id;
        this.name = student.name;
        this.firstname = student.firstname;
		
        return this;
    }
	
	// comment constructor
    function Comment(id, idEvent, idStudent, text, date) {
        this.id = id;
        this.idEvent = idEvent;
        this.idStudent = idStudent;
		this.text = text;
		this.date = date;
		
        return this;
    }
    function CommentDto(comment) {
        this.id = comment.id;
        this.idEvent = comment.idEvent;
        this.idStudent = comment.idStudent;
		this.text = comment.text;
		this.date = comment.date;
		
        return this;
    }
	
    var profs = [

    ];
	
	var documents = [

    ];
	
	var students = [

    ];
	
	var comments = [

    ];

    var idComment = 1;
	var idStudent = 1;
	var idProf = 1;
	var idDocument = 1;
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

    //localStorage.clear();

    var lcomments = localStorage.getItem('commentaries');
    lcomments = JSON.parse(lcomments);
    lcomments.sort(lcomments.id);
	var lstudents = localStorage.getItem('students');
    lstudents = JSON.parse(lstudents);
    lstudents.sort(lstudents.id);
	var lprofs = localStorage.getItem('profs');
    lprofs = JSON.parse(lprofs);
    lprofs.sort(lprofs.id);
	var ldocuments = localStorage.getItem('documents');
    ldocuments = JSON.parse(ldocuments);
    ldocuments.sort(ldocuments.id);
	
	var urlParameters = window.location.search.substring(1).split("&");
	var eventId;
	//search url param "event" and get his value
	$.each(urlParameters, function(key,param){
		if(param.indexOf("event=")>-1){
			eventId = param.split("=")[1];
			return false;
		}
	});
	
    $.each(ldocuments, function(key, document) {
		if(document.idEvent == eventId){
			addDocumentHTML(document);
		}
		documents.push(document);
		idDocument = document.id;
    });
	
	$.each(lcomments, function(key, comment) {
		if(comment.idEvent == eventId){
			addCommentHTML(comment);
		}
		comments.push(comment);
		idComment = comment.id;
    });
	
	$.each(lstudents, function(key, student) {
		students.push(student);
		idStudent = student.id
    });
	
	$.each(lprofs, function(key, prof) {
		profs.push(prof);
		idProf = prof.id;
    });
	
	//add a new comment in the localstorage
	$("#addComment").click(function(){
		//TODO recup info student
		var student = students[0];
		var text = $("#newComment").val();
		var comment = new Comment(++idComment, eventId, 0, text, formatToBasic(new Date()));
		comments.push(comment);
		localStorage.setItem('comments', JSON.stringify(comments));
		$("#addComment").val('');
		location.reload();
	});

	// add a document in the html list 
    function addDocumentHTML(document) {
        documents.push(document);
		var documentHTML = formatDocument(document);
		$("#documentList").append(documentHTML);
    }
	
    // addComment Function 
    function addCommentHTML(comment) {
        comments.push(comment);
		var commentHTML = formatComment(comment);
		$("#commentList").append(commentHTML);
    }

	//Format document html
    function formatDocument(document) {
		var documentHTML = "<li>\n";
		documentHTML += "\t<p>"+document.description+"</p>\n";
		documentHTML += "\t<a href=\""+document.link+"\">Telecharger le document</a>\n";
		documentHTML += "</li>";
        return documentHTML;
    }
	
	// get name student 
    function getNameStudent(studentId) {
		var studentDto;
		$.each(lstudents, function(key, student) {
			if(student.id == studentId){
				studentDto = student;
				return false;
			}
		});
        return studentDto.firstname+" "+studentDto.name;
    }
	 // Format Internationnal date to dd-mm-yyyy
    function formatComment(comment) {
		var commentHTML = "<li>\n";
		commentHTML += "\t<em>"+getNameStudent(comment.idStudent)+"</em>\n";
		commentHTML += "\t<p>"+comment.text+"</p>\n";
		commentHTML += "\t<em>"+formatToBasic(new Date(comment.date))+"</em>\n"
		commentHTML += "</li>";
        return commentHTML;
    }
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