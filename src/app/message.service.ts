import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public message: string[];

  constructor() { 
    this.message = [];
  }
  newMessage(message: string ){
    this.message.unshift(message);
    this.message = this.message.slice(0,2);
  }
  clearMessage(){
    this.message = [];
  }
}
