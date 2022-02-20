import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
    selector: 'app-contact-table',
    templateUrl: './contact-table.component.html',
    styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {
    @Input()
    contacts!: Array<Contact>;

    @Output('deleteContact')
    deleteContactEmitter = new EventEmitter();

    @Output('editContact')
    editContactEmitter = new EventEmitter();

    editing: number | null = null;

    cachedContact = {} as Contact | null;

    disabledBtn: boolean = false;


    constructor() { }

    ngOnInit(): void {
    }

    getRowClasses(id: number) {
        return {
            'editing': this.isEditing(id)
        };
    }

    isEditing(id: number) {
        return this.editing === id;
    }

    onCancelEdit(contact: any) {
        Object.assign(contact, this.cachedContact);
        this.cachedContact = null;
        this.editing = null;
    }

    onBeginEdit(contact: any) {
        if (this.editing != null && this.editing != contact.id) {
            let prevEmp = this.contacts.find((x) => x.id == this.editing);
            if (prevEmp != null) {
                this.onCancelEdit(prevEmp);
            }
        }
        this.cachedContact = Object.assign({}, contact);
        this.editing = contact.id;
    }

    modelChangeFn(value: any, param: any, contact: any) {
        if (!contact.firstName && !contact.lastName && !contact.phone) {

            this.disabledBtn = true;

        }
        else if (contact.firstName && contact.lastName && contact.phone) {
            if (param == 'phone') {
                if (value?.length < 10) {
                    this.disabledBtn = true;
                }
                else {

                    this.disabledBtn = false
                }
            }
            if (value == '') {
                this.disabledBtn = true;
            }
            else {
                this.disabledBtn = false
            }
        }

    }


    onEditContact(contact: any) {
        if (contact.firstName === '' || contact.lastName === '' || contact.phone === '') return;
        this.editContactEmitter.emit({
            updated: contact,
            original: Object.assign({}, this.cachedContact)
        });
        this.cachedContact = null;
        this.editing = null;
    }

    onDeleteContact(contact: any) {
        if (!confirm(`Are you sure you want to delete ${contact.firstName}?`)) {
            return;
        }
        this.deleteContactEmitter.emit(contact);
    }

}
