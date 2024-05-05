import { Component, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoryEvent } from '../models/StoryEvent';
import { StoryChapter } from '../models/StoryChapter';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { ChapterService } from '../services/chapter.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.scss'
})
export class EventEditorComponent implements OnInit, OnChanges{
  event: StoryEvent = {
    title: '',
    note: '',
    docID: '',
    chapterID: '',
    storyID: undefined,
    index: undefined
  }

  chapters : StoryChapter[] = [];

  private dialogRef;
  private data;

  constructor(private storyEventService: EventService, 
    private router: Router, private injector: Injector, 
    private chapterService: ChapterService) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    this.data = this.injector.get(MAT_DIALOG_DATA, null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chapterService.getAllChapters().subscribe(chapters => {
      this.chapters = chapters;
    });
  }

  ngOnInit(): void {
    this.chapterService.getAllChapters().subscribe(chapters => {
      this.chapters = chapters;
    });

    this.event.title = this.data?.info?.title ?? '';
    this.event.note = this.data?.info?.note ?? '';
    this.event.docID = this.data?.info?.docID ?? '';
    this.event.chapterID = this.data?.info?.chapterID ?? '';
    this.event.storyID = localStorage.getItem('selectedStoryDocID') ?? undefined;
  }

  onSubmit(){
    console.log(this.event);
    if (this.data) {
      this.storyEventService.updateStoryEvent(this.event).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl("/nav/events");
        }
      });
    } else {
      this.storyEventService.createStoryEvent(this.event).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl("/nav/events");
        }
      });
    }
    this.dialogRef?.close();
  }

  closeDialog() {
    this.dialogRef?.close();
    this.router.navigateByUrl("/nav/events");
  }

}
