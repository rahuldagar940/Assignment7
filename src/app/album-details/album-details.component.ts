import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Photo } from './Photo';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  albumId : any;
  photos!: Photo[];

  constructor(private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.albumId = params.get('albumId');
      console.log('got albumid', this.albumId);
      this.albumService.getPhotos(this.albumId).subscribe(photo =>{
        this.photos = <Photo[]>photo;
        console.log('got photos for this album',photo);
        

      })
    })
  }

}
