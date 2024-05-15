import { Component, OnInit } from '@angular/core';
import { AiService } from '../../shared/services/ai.service';
import { ChapterService } from 'src/app/shared/services/chapter.service';
import { StoryChapter } from 'src/app/shared/models/StoryChapter';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aianalysis',
  templateUrl: './aianalysis.component.html',
  styleUrl: './aianalysis.component.scss'
})
export class AianalysisComponent implements OnInit{

  chapters: Array<StoryChapter> = [];

  chapter: any = {};

  aicontent: string = '';

  constructor(private ai: AiService, private chapterService: ChapterService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getChapters();
  }

  getChapters(): void {
    this.chapterService.getAllChapters().subscribe(chapters => {
      this.chapters = chapters;
      console.log(this.chapters);
    });
  }

  choose(chapter: StoryChapter) {
    this.chapter = chapter;
    console.log(this.chapter);
  }

  toDate(seconds: number) {
    const date = new Date(seconds * 1000);
    return date.toLocaleString();
  }

  analysis() {
    this.ai.getChapterAnalysis(this.chapter).subscribe((content) => {
      this.aicontent = content;
    })
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Analízis');
  }

  showFailure(message: string) {
    this.toastr.error(message, 'Analízis', {
      closeButton: true
    });
  }

}
