import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../localStorageService';
import { Router } from '@angular/router';
import {ToastService} from '../toast/toast.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: IUser = {username: '', password: ''};
  localStorageService: LocalStorageService<IUser>;
currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) { 
    this.localStorageService = new LocalStorageService('user');
  }

  ngOnInit() {
    this.currentUser = this.localStorageService.getItemsFromLocalStorage();
    if (this.currentUser != null ) {
      this.router.navigate(['contacts']);
    }
  }

  login(user: IUser) {

    console.log('from login: ', user);
    const defaultUser: IUser = {username: "franklin", password: "123"};
    if (user.username !== '' && user.password !== '') {
      if(user.username === defaultUser.username && user.password === defaultUser.password){
        this.localStorageService.saveItemsToLocalStorage(user);
        this.router.navigate(['contacts', user]);
      } else{
              this.toastService.showToast('warning',2000, 'Login failed. Check User name and password');

      }
    } else {
      this.toastService.showToast('warning',2000, 'Login failed. specify user name and password');

    }
  }

}
