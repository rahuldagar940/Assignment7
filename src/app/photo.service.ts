import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from './Comment';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photoId: any;


  constructor(private http: HttpClient) { }

  saveComment(/*photoId: string,*/ newComment: string) {

    var comment: Comment = {
      createdBy: "",
      dateCreated: "",
      id: "",
      message: newComment,
      photoID: "this.photoId",
    };
    return this.http.post(environment.API_URL + "comments", comment);
  }

  makeProfilePhoto(profilePicURL: string) {
    var headers: any = this.getHeaders();
    var params = new HttpParams;
    params.set('photoURL', profilePicURL);
    console.log('calling put from photoservice: ', headers);
    return this.http.put(environment.API_URL + "users", headers);
    //return this.http.put(environment.API_URL+"photos", /*{headers}*/);
  }

  getPhoto(photoId: any) {
    var headers: any = this.getHeaders();
    console.log('calling get all Photos method and header value from getPhotos: ', headers);
    return this.http.get(environment.API_URL + "photos", /*{headers}*/);
  }

  getComment(photoId: string) {
    var headers: any = this.getHeaders();
    console.log('calling get all Comments method and header value from getComments: ', headers);
    return this.http.get(environment.API_URL + "comments", /*{headers}*/);
  }

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    return headers;
  }
}
