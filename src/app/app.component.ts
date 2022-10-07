import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment3';
  constructor(public userService : UserService, public messageService : MessageService) { }

logout(){
  this.userService.logout();
}
clearMessage(){
  this.messageService.clearMessage();
}
}