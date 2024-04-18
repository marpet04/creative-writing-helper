import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryServiceService {

  constructor(private http: HttpClient) { }

  uploadImage(im: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/gallery/uploadImage', im);
  }
}
