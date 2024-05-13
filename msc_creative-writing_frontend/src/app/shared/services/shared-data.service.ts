import { Injectable } from '@angular/core';
import { Story } from '../models/Story';
import { BehaviorSubject } from 'rxjs';
import { StoryChapter } from '../models/StoryChapter';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private selectedStory: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private selectedChapterID: string | undefined;
  private userId: string | undefined;
  private username: string | undefined;
  private backupStory: Story = {
    docID: localStorage.getItem('selectedStoryDocID')!,
    title: localStorage.getItem('selectedStoryTitle')!,
    description: '',
    author: localStorage.getItem('userId')!,
    gallery: {
      images: []
    }
  }


  constructor() {
    
  }

  getSelectedStory() {
    if (this.selectedStory === new BehaviorSubject<any>(null)) {
      this.setSelectedStory(this.backupStory);
    }
    return this.selectedStory.asObservable();
  }

  setSelectedStory(s:Story) {
    localStorage.setItem('selectedStoryTitle', s.title);
    localStorage.setItem('selectedStoryDocID', s.docID ?? '');
    this.selectedStory.next(s);
  }

  getSelectedChapter() {
    return this.selectedChapterID;
  }

  setSelectedChapter(ch:StoryChapter | undefined) {
    this.selectedChapterID = ch?.docID ?? undefined;
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  setUser(user: User) {
    this.userId = user.id!;
    this.username = user.username;
    localStorage.setItem('userId',this.userId);
    localStorage.setItem('username', this.username);
  }

  removeSharedData() {
    localStorage.removeItem('selectedStoryTitle');
    localStorage.removeItem('selectedStoryDocID');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }
}
