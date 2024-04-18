import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GalleryServiceService } from '../services/gallery-service.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private galleryService: GalleryServiceService) {}

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

    this.galleryService.uploadImage(formData).subscribe(
      (response) => {
        console.log('Sikeresen feltöltve!');
        // Kezeljük a sikeres feltöltést
      },
      (error) => {
        console.error('Hiba a feltöltés közben:', error);
        // Kezeljük a hibát
      }
    );
  }

}
