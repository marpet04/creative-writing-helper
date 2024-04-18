import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, computed, signal } from '@angular/core';
import { StoryCharacterService } from '../services/story-character-service.service';
import { StoryCharacter } from '../models/StoryCharacter';
import { MenuItem } from '../sidenav/sidenav.component';
import { Story } from '../models/Story';
import { StoryService } from '../services/story.service';
import { MatDialog } from '@angular/material/dialog';
import { StoryEditorComponent } from '../story-editor/story-editor.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges{
  stories: Array<Story> = [];

  constructor(private storyService: StoryService, public dialog: MatDialog) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.storyService.getAllStories().subscribe(stories => {
      this.stories = stories;
    });
  }

  openEditor(storyData:any){
    this.dialog.open(StoryEditorComponent, {
      data: {
        info: storyData,
      },
    });
    console.log(storyData);
    this.refresh();
  }

  deleteStory(docID:string) {
    console.log(docID);
    this.storyService.deleteStory(docID).subscribe(t => {
      console.log(t);
    });
  }
  
}
