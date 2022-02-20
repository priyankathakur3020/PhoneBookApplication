import { Component, OnInit } from '@angular/core';
import { ContactsApiService } from './services/api.service';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Contacts';

    contacts: Array<Contact> = [];
    contactsLoaded = false;
    baseUrl: string;

    constructor(private contactsApi: ContactsApiService) { 
        this.baseUrl = location.href;
    }
   
    ngOnInit(): void {
        this.contactsApi.getContactList().subscribe({
          next: (data) => {
              this.contacts = data;         
          },
          error: (error) => {
              console.log(error);
              alert(`Error Occurred: Unable to fetch data from api. Please try again!`); 
          },
      }).add(() => {
          this.contactsLoaded = true           
      });  
      }
    
      onAddContact(contact: Contact) {
                let maxId = this.contacts.length;
                let nextId = maxId + 1;
                contact.id = nextId;
                this.contacts.push(contact)
            
    }   
    
    onDeleteContact(contact: Contact) {
       
                let index = this.contacts.findIndex((x) => x.id == contact.id);
                this.contacts.splice(index, 1); 
                
    }
    
    onEditContact(info: any) {  
        let index = this.contacts.findIndex((x) => x.id == info.updated.id);
        let errorOccurred = false;
                this.contacts[index] = {} as Contact;
                this.contacts[index] = info?.updated;
           
               
    }   
    }
    