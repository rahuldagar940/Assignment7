import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from './Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient, public router: Router) { }


  saveAlbum(albumTitle: string, fileId: string) {
    var album: Album = {
      coverPhotoURL: environment.API_URL + "files" + fileId,
      creatredBy: "",
      dateCreated: "",
      id: "",
      name: albumTitle
    };
  
    return this.http.post(environment.API_URL + "albums", album /*{headers}*/)
    .subscribe(albumData=>{
      console.log('Album', albumData);
      var album: Album= <Album>(albumData);
      var albumId = album.id;
      this.router.navigate(['albums/', albumId]);
    })
  }


  getAllAlbums() {
    var headers: any = this.getHeaders();
    console.log('calling get all albums method and header value: ', headers);
    return this.http.get(environment.API_URL + "albums", /*{headers}*/);
  }
  getPhotos(albumId: string) {
    var headers: any = this.getHeaders();
    console.log('calling get all photos method and header value: ', headers);
    //return this.http.get(environment.API_URL+"albums/" +albumId +"/photos", /*{headers}*/);
    return this.http.get(environment.API_URL + "photos", /*{headers}*/);
  }
  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    return headers;
  }
}
