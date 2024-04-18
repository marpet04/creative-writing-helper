import { Component, SimpleChanges } from '@angular/core';
import { StoryChapter } from '../models/StoryChapter';
import { ChapterService } from '../services/chapter.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.scss'
})
export class ChaptersComponent {

  chapters: Array<StoryChapter> = [];

  constructor(private chapterService: ChapterService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.chapterService.getAllChapters().subscribe(chapters => {
      this.chapters = chapters;
      console.log(this.chapters);
    });
  }

  openEditor(chapterData:any){
    
  }

  deleteChapter(docID:string) {
    console.log(docID);
    this.chapterService.deleteChapter(docID).subscribe(t => {
      console.log(t);
    });
  }

}
