import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, computed, signal } from '@angular/core';
import { StoryCharacterService } from '../services/story-character-service.service';
import { StoryCharacter } from '../models/StoryCharacter';
import { MenuItem } from '../sidenav/sidenav.component';
import { Story } from '../models/Story';
import { StoryService } from '../services/story.service';
import { MatDialog } from '@angular/material/dialog';
import { StoryEditorComponent } from '../story-editor/story-editor.component';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges{
  stories: Array<Story> = [];

  constructor(private storyService: StoryService, public dialog: MatDialog, private sharedData: SharedDataService) {}
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.getStories();
  }

  getStories(): void {
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
    this.dialog.afterAllClosed.subscribe(() => {
      this.getStories();
    })
  }

  deleteStory(docID:string) {
    console.log(docID);
    this.storyService.deleteStory(docID).subscribe(t => {
      console.log(t);
      this.getStories();
    });
  }

  selectStory(s: Story) {
    this.sharedData.setSelectedStory(s);
  }
  
}
