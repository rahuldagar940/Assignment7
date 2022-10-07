import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-create-albums',
  templateUrl: './create-albums.component.html',
  styleUrls: ['./create-albums.component.css']
})
export class CreateAlbumsComponent implements OnInit {

  constructor(private fileService : FileService, private albumService: AlbumService ) { }
  albumTitle!: any;

  ngOnInit(): void {
  }

  
  createAlbum(event : any){
    var file = event.target?.files[0];
    console.log('Event:', file );
    this.fileService.uploadFile(file).subscribe(fileResponse => {
      //var fileId = fileResponse["fileId"];
      console.log('File data from service:', fileResponse['fileId']);
      //this.saveAlbum(this.albumTitle, fileId);
    })
  }
  saveAlbum(albumTitle: string, fileId: string){
    this.saveAlbum(this.albumTitle, fileId);
  }
  
}
