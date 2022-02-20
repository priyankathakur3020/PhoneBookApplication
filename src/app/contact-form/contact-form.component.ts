import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contact = {} as Contact;

  submitting = false;
  error = false;
  success = false;
  phoneInValid: boolean = false;
  disabledBtn: boolean = true;

  @Output('addContact')
  addContactEmitter = new EventEmitter();

  @ViewChild("contactName")
  contactNameRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  keyPress(event: any, param: any) {
    const phonePattern = /[0-9]/;
    var namePattern = /[a-z]/i;
    if (param == 'firstName' || param == 'lastName') {
      let inputChar = String.fromCharCode(event.charCode);
      if (!namePattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    else if (param == 'phone') {
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !phonePattern.test(inputChar)) {
        event.preventDefault();
      }

    }
  }

  modelChangeFn(value: any, param?: any) {
    if (!this.contact.firstName && !this.contact.lastName && !this.contact.phone) {

      this.disabledBtn = true;

    }
    else if (this.contact.firstName && this.contact.lastName && this.contact.phone) {
      if (param == 'phone') {
        if (value?.length < 10) {
          this.phoneInValid = true;
          this.disabledBtn = true;
        }
        else {
          this.phoneInValid = false;
          this.disabledBtn = false
        }
      }
    }
  }

  onAddContact() {
    this.submitting = true
    this.clearStatus()

    this.addContactEmitter.emit(this.contact);
    this.contactNameRef.nativeElement.focus();

    this.contact = {} as Contact;

    this.error = false;
    this.success = true;
    this.submitting = false;

    setTimeout(() => {
      this.clearStatus();
    }, 3000);
  }

  clearStatus() {
    this.success = false;
    this.error = false;
    this.disabledBtn = true;
  }


}