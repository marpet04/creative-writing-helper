import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GalleryServiceService } from '../services/gallery-service.service';
import { SharedDataService } from '../services/shared-data.service';
import { Gallery, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { StoryService } from '../services/story.service';
import { ImgSliderComponent } from '../img-slider/img-slider.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ImageObj } from '../models/ImageObj';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [GalleryModule, ImgSliderComponent, MatButtonModule, MatInputModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  selectedFile: File | null = null;
  selectedStory: string = '';
  imageURLs: ImageObj[] = [];

  slides : any[] = [];

  constructor(private http: HttpClient, private galleryService: GalleryServiceService, private gallery: Gallery, private storyService : StoryService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getImages();
    
  }

  getImages() {
    this.slides = [];
    this.selectedStory = localStorage.getItem('selectedStoryDocID') ?? '';
    this.storyService.getStory(this.selectedStory).subscribe(s => {
      this.imageURLs = s.gallery.images;
      console.log(s.gallery.images);
      for (let im of this.imageURLs) {
        this.slides.push({
          url: im.url,
          title: im.fileName,
          description: ''
        });
      }
    });
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadImage() {
    if (!this.selectedFile) {
      console.error('Nincs kiválasztva fájl!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.galleryService.uploadImage(this.selectedStory, formData).subscribe(
      (response) => {
        this.showSuccess('Sikeresen feltöltve!');
        this.getImages();
      },
      (error) => {
        this.showFailure('Hiba a feltöltés közben:' + error);
      }
    );
  }

  deleteImage(im: any) {
    this.galleryService.deleteImage(this.selectedStory, im.title).subscribe(
      (response) => {
        this.showSuccess(response);
        this.getImages();
      },
      (error) => {
        this.showFailure(error);
      }
      
    )
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Galéria');
  }

  showFailure(message: string) {
    this.toastr.error(message, 'Galéria', {
      closeButton: true
    });
  }

}
