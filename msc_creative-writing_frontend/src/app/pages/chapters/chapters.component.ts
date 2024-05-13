import { Component, SimpleChanges } from '@angular/core';
import { StoryChapter } from '../../shared/models/StoryChapter';
import { ChapterService } from '../../shared/services/chapter.service';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.scss'
})
export class ChaptersComponent {

  selected = 'none';

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

  setOrder() {
    if (this.selected == 'asc') {
      this.chapters = this.chapters.sort((ch1, ch2) => ch1.lastUpdated?.seconds! - ch2.lastUpdated?.seconds!);
    } else if (this.selected == 'desc') {
      this.chapters = this.chapters.sort((ch1, ch2) => ch2.lastUpdated?.seconds! - ch1.lastUpdated?.seconds!);
    } else {
      console.log('No sort');
    }
  }

  toDate(seconds: number) {
    const date = new Date(seconds * 1000);
    return date.toLocaleString();
  }

}
