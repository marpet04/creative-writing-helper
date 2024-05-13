import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxLeaderLineModule } from 'ngx-leader-line';
import { AppRoutingModule } from '../../app-routing.module';
import { ImgSliderComponent } from '../img-slider/img-slider.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { CommonModule } from '@angular/common';
import { StoryEvent } from '../../shared/models/StoryEvent';
import { StoryChapter } from '../../shared/models/StoryChapter';
import { ChapterService } from '../../shared/services/chapter.service';
import { EventService } from '../../shared/services/event.service';
import { EventEditorComponent } from '../event-editor/event-editor.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events: Array<StoryEvent> = [];
  chapters : StoryChapter[] = [];

  constructor(public dialog: MatDialog, private chapterService: ChapterService, private eventService: EventService) {}
  
  ngOnInit(): void {
    this.getEvents();
    this.getChapters();
  }

  getEvents(): void {
    this.eventService.getAllStoryEvents().subscribe(events => {
      this.events = events;
      console.log(this.events);
    });
  }

  getChapters(): void {
    this.chapterService.getAllChapters().subscribe(chapters => {
      this.chapters = chapters;
    });
  }

  openEditor(eventData:any){
    this.dialog.open(EventEditorComponent, {
      data: {
        info: eventData,
      },
    });
    console.log(eventData);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getEvents();
    });
  }

  deleteEvent(docID:string) {
    console.log(docID);
    this.eventService.deleteStoryEvent(docID).subscribe(t => {
      console.log(t);
      this.getEvents();
    });
  }

}
