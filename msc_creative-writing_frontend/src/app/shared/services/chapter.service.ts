import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoryChapter } from '../models/StoryChapter';
import { Observable } from 'rxjs';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }

  createChapter(chapter: StoryChapter): Observable<any> {
    return this.http.post('http://localhost:8080/api/chapter/createChapter', chapter);
  }

  updateChapter(chapter:StoryChapter): Observable<any> {
    return this.http.post('http://localhost:8080/api/chapter/updateChapter', chapter);
  }

  getAllChapters(): Observable<any> {
    return this.http.get('http://localhost:8080/api/chapter/getAllChapters/' + localStorage.getItem('selectedStoryDocID'));
  }

  deleteChapter(id: string): Observable<any> {
    return this.http.delete('http://localhost:8080/api/chapter/deleteChapter/' + id, {responseType: 'text'});
  }

  getChapter(id: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/chapter/getChapter?id=' + id);
  }
}
