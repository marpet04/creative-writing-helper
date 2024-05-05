import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineObject } from '../models/LineObject';
import { Observable } from 'rxjs';
import { CharacterObject } from '../models/CharacterObject';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }

  createLine(line: LineObject): Observable<any> {
    return this.http.post('http://localhost:8080/api/config/createLine', line);
  }

  getAllLines(): Observable<any> {
    return this.http.get('http://localhost:8080/api/config/getAllLines/' + localStorage.getItem('selectedStoryDocID'));
  }

  createCharPos(pos: CharacterObject): Observable<any> {
    return this.http.post('http://localhost:8080/api/config/createCharPos', pos);
  }

  updateCharPos(pos: CharacterObject): Observable<any> {
    return this.http.post('http://localhost:8080/api/config/updateCharPos', pos);
  }

  getAllCharPos(): Observable<any> {
    return this.http.get('http://localhost:8080/api/config/getAllCharPos/' + localStorage.getItem('selectedStoryDocID'));
  }

  removeLine(id: string): Observable<any> {
    return this.http.delete('http://localhost:8080/api/config/removeLine/' + id, {responseType: 'text'});
  }
}
