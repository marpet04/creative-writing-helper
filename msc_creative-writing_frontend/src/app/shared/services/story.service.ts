import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Story } from '../models/Story';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }

  createStory(story: Story): Observable<any> {
    return this.http.post('http://localhost:8080/api/story/createStory', story);
  }

  updateStory(story:Story): Observable<any> {
    return this.http.post('http://localhost:8080/api/story/updateStory', story);
  }

  getAllStories(author: string): Observable<any> {
    let headers = new HttpHeaders({
      'author': author
    });
    let options = { headers: headers };
    return this.http.get('http://localhost:8080/api/story/getAllStories', options);
  }

  deleteStory(id: string): Observable<any> {
    return this.http.delete('http://localhost:8080/api/story/deleteStory/' + id, {responseType: 'text'});
  }

  getStory(id: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/story/getStory?id=' + id);
  }
}
