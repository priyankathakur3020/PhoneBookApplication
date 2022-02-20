import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})


@Injectable({
    providedIn: 'root'
})
export class ContactsApiService  {
    apiBaseURL: any = "https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts";

    constructor(private http: HttpClient) { }
  
    getContactList(): Observable<Contact[]>
    {
      return this.http.get<Contact[]>(this.apiBaseURL);
    }
}