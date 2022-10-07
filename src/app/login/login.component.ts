import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInFormVisible = true;
  email!: string;
  password!: string;
  name!: string;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }
  makeSignInFormVisible(){
    this.signInFormVisible = true;
  }

  makeSignUpFormVisible(){
    this.signInFormVisible = false;
  }

  login(){
    console.log('login tried');
    this.userService.login(this.email, this.password);
    this.email = "";
    this.password = "";
  }
  signup(){
    console.log('tried signup');
    this.userService.signup(this.email, this.password, this.name);
    this.email = "";
    this.password = "";
    this.name= "";
  }
}
