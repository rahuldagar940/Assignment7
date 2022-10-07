import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = 'ProfilePage';
  imageURL = 'https://i.pinimg.com/564x/bc/51/24/bc51248c1856ab524fddeae7a843634a.jpg';
  viewCount = 0;
  name = 'Rony';
  // items = ["Item1", "Item2", "Item3"];
  user!: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe(
      userProfile => { 
        this.user = <User>userProfile;
        console.log('got user details', this.user);
      }
    )
  }

  incrementCount() {
    this.viewCount++;
  }
}
