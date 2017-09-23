// Global X-Team
var contactsJSON;
var contactsPerPageX = 10;
var pageX = 0;
var load;

// sort data alphabetically X-Team
function sortByName(x,y) {
  return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
}

// List Contacts X-Team
function listContacts(contactsPerPage, page) {
	startX = page * contactsPerPage;
	endX = startX + contactsPerPage;

	for(i = startX; i < endX; i++){
		load(i);
		console.log(i);
	}
}

// load json Data X-Team
$(function() {
	$.getJSON("js/mock-data.json", function(data) {
		load = function loadData(i) {
			data.sort(sortByName);
			contactsJSON = data;
						
			var newName = data[i].name;
			var newPhoneNumber = data[i].phone;
			var newEmail = data[i].email;

			var divContact = document.createElement('div');
			divContact.className = "col-sm-6 contactX";
			contactsContainer.appendChild(divContact);
				
			var divCard = document.createElement('div');
			divCard.className = "card p-3 mb-3 text-center";
			divContact.appendChild(divCard);

			var nameX = document.createElement('h4');
			nameX.className = "card-title";
			nameX.appendChild(document.createTextNode(newName));
			divCard.appendChild(nameX);

			var deleteBtn = document.createElement('button');
			deleteBtn.className = "btn btn-danger btn-sm float-right delete fa fa-close";
			nameX.appendChild(deleteBtn);

			var phoneX = document.createElement('p');
			phoneX.className = "card-text";
			phoneX.appendChild(document.createTextNode(newPhoneNumber));
			divCard.appendChild(phoneX);

			var emailX = document.createElement('p');
			emailX.className = "card-text";
			emailX.appendChild(document.createTextNode(newEmail));
			divCard.appendChild(emailX);
		}
		listContacts(15, 2);
	});
});

// data sample X-Team
var contactInfo = {
	name: "Ahmed",
	phone: "02-333-8831", 
	email: "ahmed@Lkabeer.com"
}

// object Constructor X-Team
var PhoneBook = function (name, phone, email) {
	this.name = name;
	this.phone = phone;
	this.email = email;
	
	this.add = function() {
		contactsJSON.push(this);

		console.log(contactsJSON.length);

		var divContact = document.createElement('div');
		divContact.className = "col-sm-6 contactX";
		contactsContainer.appendChild(divContact);

		var divCard = document.createElement('div');
		divCard.className = "card p-3 mb-3 text-center";
		divContact.appendChild(divCard);

		var nameX = document.createElement('h4');
		nameX.className = "card-title";
		nameX.appendChild(document.createTextNode(this.name));
		divCard.appendChild(nameX);

		var deleteBtn = document.createElement('button');
		deleteBtn.className = "btn btn-danger btn-sm float-right delete fa fa-close";
		nameX.appendChild(deleteBtn);

		var phoneX = document.createElement('p');
		phoneX.className = "card-text";
		phoneX.appendChild(document.createTextNode(this.phone));
		divCard.appendChild(phoneX);

		var emailX = document.createElement('p');
		emailX.className = "card-text";
		emailX.appendChild(document.createTextNode(this.email));
		divCard.appendChild(emailX);
	};
	this.remove = function (index) {};
	this.search = function (query) {};
	this.list = function (contactsPerPage, page) {};
}

// selections X-Team
var form = document.getElementById('addContact');
var contactsContainer = document.getElementById('contacts');
var filter = document.getElementById('filterX');

// events X-Team
form.addEventListener('submit', addContact);
contactsContainer.addEventListener('click', removeContact);
filter.addEventListener('keyup', filterContacts);

// add Contact X-Team
function addContact(e) {
	e.preventDefault();

	var newName = document.getElementById('nameX').value;
	var newPhoneNumber = document.getElementById('phoneNumberX').value;
	var newEmail = document.getElementById('emailX').value;

	var newContact = new PhoneBook(newName, newPhoneNumber, newEmail);
	newContact.add();
}

// remove Contact X-Team
function removeContact(e) {
	if(e.target.classList.contains('delete')) {
		if(confirm('Are you sure?')) {
			var divContact = e.target.parentElement.parentElement.parentElement;
			contactsContainer.removeChild(divContact);
			
			for(i = 0; i < contactsJSON.length; i++) {
				if(contactsJSON[i].email == e.target.parentElement.nextElementSibling.nextElementSibling.innerHTML) {
					console.log(i);
					contactsJSON.splice(i, 1);
				}
			}
			console.log(contactsJSON.length);
		}
	}
}

// filter Contacts X-Team
function filterContacts(e) {
	var searchX = e.target.value.toUpperCase();
	var contacts = contactsContainer.getElementsByClassName('contactX');
	var searchResults = [];
	
	for (i = 0; i < contacts.length; i++) {
		var contact = contacts[i];
		var contactName = contacts[i].firstElementChild.firstElementChild;
		var contactPhone = contact.firstElementChild.children[1];
		
		if((contactName.innerHTML.toUpperCase().indexOf(searchX) > -1)|| (contactPhone.innerHTML.toUpperCase().indexOf(searchX) > -1)) {
			contact.style.display = "";
			searchResults.push(contact);
		} else {
			contact.style.display = "none";
		}
	}
}
