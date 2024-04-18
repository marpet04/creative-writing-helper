import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoryChapter } from '../models/StoryChapter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }

  createChapter(chapter: StoryChapter): Observable<any> {
    return this.http.post('http://localhost:8080/api/chapter/createCharacter', chapter);
  }

  updateChapter(chapter:StoryChapter): Observable<any> {
    return this.http.post('http://localhost:8080/api/chapter/updateChapter', chapter);
  }

  getAllChapters(): Observable<any> {
    return this.http.get('http://localhost:8080/api/chapter/getAllChapters');
  }

  deleteChapter(id: string): Observable<any> {
    return this.http.delete('http://localhost:8080/api/chapter/deleteChapter/' + id, {responseType: 'text'});
  }
}
