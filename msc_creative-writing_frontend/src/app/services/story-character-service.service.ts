import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoryCharacter } from '../models/StoryCharacter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryCharacterService {

  constructor(private http: HttpClient) { }

  createCharacter(ch:StoryCharacter): Observable<any> {
    return this.http.post('http://localhost:8080/api/character/createCharacter', ch);
  }

  updateCharacter(ch:StoryCharacter): Observable<any> {
    return this.http.post('http://localhost:8080/api/character/updateCharacter', ch);
  }

  getAllCharacters(): Observable<any> {
    return this.http.get('http://localhost:8080/api/character/getAllCharacters');
  }
}
