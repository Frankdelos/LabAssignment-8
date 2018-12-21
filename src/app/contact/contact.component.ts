import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = [];
  contactParams = '';
  localStorageService: LocalStorageService<Contact>;
  currentUser: IUser;

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private router: Router) {
    this.localStorageService = new LocalStorageService('contacts');
  }

  async ngOnInit() {
    const currentUser = this.localStorageService.getItemsFromLocalStorage('user')
    if(currentUser== null) {
      this.router.navigate(['login']);
    }
    this.loadContacts();
    this.activatedRoute.params.subscribe((data: IUser) => {
      console.log('data passed from login component to this component', data);
      this.currentUser = data;
    });
  }

  async loadContacts() {
    const savedContacts = this.getItemsFromLocalStorage('contacts');
    if (savedContacts && savedContacts.length > 0) {
      this.contacts = savedContacts;
    } else {
      this.contacts = await this.loadItemsFromFile();
    }
    this.sortByID(this.contacts);
  }
  async loadItemsFromFile() {
    const data = await this.http.get('assets/contacts.json').toPromise();
    console.log('from var: ', data.json());
    return data.json();
  }

  saveContact(contact: Contact) {
    console.log('from saveContact..', contact);
    contact.editing = false;
    this.saveItemsToLocalStorage(this.contacts);
  }

  addContact() {
    this.contacts.unshift(new Contact({}));
    console.log('this.contacts... ', this.contacts);
  }

  saveItemsToLocalStorage(contacts: Array<Contact>) {
    contacts = this.sortByID(contacts);
    return this.localStorageService.saveItemsToLocalStorage(contacts);
    // const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));
    // return savedContacts;
  }
  getItemsFromLocalStorage(key: string) {
    const savedContacts = JSON.parse(localStorage.getItem(key));
    return this.localStorageService.getItemsFromLocalStorage();
    // return savedContacts;
  }

  searchContact(params: string) {
    console.log('from searchContact params: ', params);
    this.contacts = this.contacts.filter((item: Contact) => {
      const fullName = item.firstName + ' ' + item.lastName;
      console.log('item ----> ', item.firstName);
      if (params === fullName || params === item.firstName || params === item.lastName) {
        return true;
      } else {
        return false;
      }
    });
  }

  sortByID(contacts: Array<Contact>) {
    contacts.sort((a: Contact, b: Contact) => {
      return a.id > b.id ? 1 : -1;
    });
    console.log('the sorted contacts', contacts);
    return contacts;
  }

  logout() {
    this.localStorageService.clearItemFromLocalStorage('user');
    this.router.navigate(['']);
  }
}
