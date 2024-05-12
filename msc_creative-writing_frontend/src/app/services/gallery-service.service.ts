import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryServiceService {

  constructor(private http: HttpClient) { }

  uploadImage(id: string, im: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/gallery/uploadImage/' + id, im);
  }

  deleteImage(id: string, fileName: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/gallery/deleteImage/' + id, null, {params: {fileName}, responseType: 'text'});
  }
}
