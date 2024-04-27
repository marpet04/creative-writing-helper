import { Injectable } from '@angular/core';
import { Story } from '../models/Story';
import { BehaviorSubject } from 'rxjs';
import { StoryChapter } from '../models/StoryChapter';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private selectedStory: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private selectedChapterID: string | undefined;

  constructor() { }

  getSelectedStory() {
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
}
