import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../services/chapter.service';
import { EventService } from '../services/event.service';
import { StoryEvent } from '../models/StoryEvent';
import { StoryChapter } from '../models/StoryChapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { flatMap, forkJoin, mergeMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimelineObj } from '../models/TimelineObj';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatExpansionModule, MatButtonModule, MatIconModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit{

  events: StoryEvent[] = [];
  chapters : StoryChapter[] = [];
  filteredEvents : Map<string, Array<StoryEvent>> = new Map<string, Array<StoryEvent>>();
  updatedEvents : StoryEvent[] = [];

  constructor(private chapterService: ChapterService, private eventService: EventService) {}

  ngOnInit(): void {
    this.getEventsAndChapters();
  }

  getEventsAndChapters(): void {
    forkJoin([
      this.eventService.getAllStoryEvents(),
      this.chapterService.getAllChapters()
    ]).pipe(
      mergeMap(([events, chapters]) => {
        this.events = events;
        this.events.sort((ev1, ev2) => ev1.index! - ev2.index!);
        this.chapters = chapters;
        this.getFilteredEvents();
        return [];
      })
    ).subscribe();
  }

  getFilteredEvents() {
    let event: any;
    let chapter: any;
    for (chapter of this.chapters) {
      let name = 'events_' + chapter.docID;
      console.log(name);
      let array = [];
      for (event of this.events) {
        if (event.chapterID == chapter.docID) {
          array.push(event);
          console.log(event);
        }
      }
      this.filteredEvents.set(name, array);
    }
  }

  drop(event: CdkDragDrop<StoryEvent[]>, chapter: StoryChapter) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data, event.previousIndex, event.currentIndex);
      event.container.data.forEach((value, index) => {
        value.index = index;
      });
      console.log(event.container.data);
      this.filteredEvents.set('events_'+chapter.docID, event.container.data);
      console.log(this.filteredEvents.get('events_'+chapter.docID));
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      let previousChapterID = '';

      event.container.data.forEach((value, index) => {
        value.index = index;
        if (value.chapterID != chapter.docID!) {
          previousChapterID = value.chapterID;
          value.chapterID = chapter.docID!;
        }
      });

      if (event.previousContainer.data.length == 0) {
        this.filteredEvents.set('events_'+previousChapterID, []);
      } else {
        this.filteredEvents.set('events_'+previousChapterID, event.previousContainer.data);
      }

      console.log(previousChapterID + '---------------------------');
      console.log(this.filteredEvents.get('events_'+previousChapterID));

      this.filteredEvents.set('events_'+chapter.docID, event.container.data);

      console.log(chapter.docID + '---------------------------');
      console.log(this.filteredEvents.get('events_'+chapter.docID));
    }
  }

  save() {
    for (let chapter of this.chapters) {
      let array = this.filteredEvents.get('events_'+chapter.docID);
      if (array?.length != 0) {
        for (let ev of array!) {
          this.updatedEvents.push(ev);
        }
      }
    }

    console.log(this.updatedEvents);

    this.eventService.updateTimeline({
      events: this.updatedEvents
    }).subscribe(eventMessage => {
      console.log(eventMessage);
    });

    this.updatedEvents = [];
  }

  goBack() {
    this.ngOnInit();
  }

}
