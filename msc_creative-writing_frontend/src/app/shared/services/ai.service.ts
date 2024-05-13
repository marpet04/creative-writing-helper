import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor(private http:HttpClient) { }


  getChatGPTCharName(content:any){
    return this.http.post('http://localhost:8080/api/chatgpt/public/char-name',content,{responseType:"text"});
  }

  getChatGPTCharacter(content:any){
    return this.http.post('http://localhost:8080/api/chatgpt/public/description',content,{responseType:"text"});
  }

  getChapterAnalysis(content:any){
    return this.http.post('http://localhost:8080/api/chatgpt/analysis',content,{responseType:"text"});
  }
}
