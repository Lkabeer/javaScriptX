var contactInfo = {
	name: "Ahmed",
	phone: "02-333-8831", 
	email: ""
}

var PhoneBook = function (name, phone, email) {
	this.name = name;
	this.phone = phone;
	this.email = email;
	
	this.add = function (contactInfo) {};
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
	
	console.log(newName, newPhoneNumber, newEmail);
	
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
	deleteBtn.className = "btn btn-danger btn-sm float-right delete";
	deleteBtn.appendChild(document.createTextNode('X'));
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

// remove Contact X-Team
function removeContact(e) {
	if(e.target.classList.contains('delete')) {
		if(confirm('Are you sure?')) {
			var divContact = e.target.parentElement.parentElement.parentElement;
			contactsContainer.removeChild(divContact);
		}
	}
}

// filter Contacts X-Team
function filterContacts(e) {
	var searchX = e.target.value.toLowerCase();
	var contacts = contactsContainer.getElementsByClassName('contactX');
	
	Array.from(contacts).forEach(function (contact) {
		var contactName = contact.firstElementChild.firstElementChild.innerText;
		var contactPhone = contact.firstElementChild.children[1].innerText;
	
		if(contactName.toLowerCase().indexOf(searchX) != 1){
			contact.style.display = 'block';
		} else {
			contact.style.display = 'none';	
		}
	});
}