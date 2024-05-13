import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoryEvent } from '../models/StoryEvent';
import { Observable } from 'rxjs';
import { TimelineObj } from '../models/TimelineObj';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  createStoryEvent(ev:StoryEvent): Observable<any> {
    return this.http.post('http://localhost:8080/api/event/createStoryEvent', ev);
  }

  updateStoryEvent(ev:StoryEvent): Observable<any> {
    return this.http.post('http://localhost:8080/api/event/updateStoryEvent', ev);
  }

  updateTimeline(timeline: TimelineObj): Observable<any> {
    return this.http.post('http://localhost:8080/api/event/updateTimeline', timeline);
  }

  getAllStoryEvents(): Observable<any> {
    return this.http.get('http://localhost:8080/api/event/getAllStoryEvents/' + localStorage.getItem('selectedStoryDocID'));
  }

  deleteStoryEvent(id: string): Observable<any> {
    return this.http.delete('http://localhost:8080/api/event/deleteStoryEvent/' + id, {responseType: 'text'});
  }
}
