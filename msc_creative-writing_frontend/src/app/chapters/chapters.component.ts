import { Component, SimpleChanges } from '@angular/core';
import { StoryChapter } from '../models/StoryChapter';
import { ChapterService } from '../services/chapter.service';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.scss'
})
export class ChaptersComponent {

  chapters: Array<StoryChapter> = [];

  constructor(private chapterService: ChapterService, private sharedData : SharedDataService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.getChapters();
  }

  getChapters(): void {
    this.chapterService.getAllChapters().subscribe(chapters => {
      this.chapters = chapters;
      console.log(this.chapters);
    });
  }

  openEditor(chapterData:any){
    this.sharedData.setSelectedChapter(chapterData);
    this.router.navigateByUrl('/nav/doc-editor');
  }

  deleteChapter(docID:string) {
    console.log(docID);
    this.chapterService.deleteChapter(docID).subscribe(t => {
      console.log(t);
      this.getChapters();
    });
  }

}
