import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../album-details/Photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  photoId: any;
  photo!: any;
  allComments!: any;
  newComment!: any;

  constructor(private route: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.photoId = params.get('photoId');
      console.log('got photoId', this.photoId);
      this.loadPhoto(this.photoId);
      this.loadComment(this.photoId);

      

    //   this.photoService.getComment(this.photoId).subscribe(comment => {
    //     this.allComments = <Comment[]>comment;
    //     console.log('got photos for this album', this.allComments);
    //   })
     })
     
  }
  loadPhoto(photoId: string){
    this.photoService.getPhoto(photoId).subscribe(photo =>{ 
      this.photo = <Photo>photo;
      console.log('loaded photo details', this.photo);
    })
  }
  loadComment(photoId: string){
    this.photoService.getComment(photoId).subscribe(comments =>{ 
      this.allComments = (<Comment[]>comments).reverse();
      console.log('loaded photo details: comments', this.allComments);
    })
  }

  makeProfilePhoto(){
    this.photoService.makeProfilePhoto(this.photo.photoURL).subscribe(response =>{
      console.log('Profile photo updated:', response);
    })
  }

  saveComment(){
    this.photoService.saveComment(/*this.photoId,*/ this.newComment).subscribe(response =>{
      console.log('Comment poster');
      this.loadComment(this.photoId);
      this.newComment = "";
    })
  }

}
