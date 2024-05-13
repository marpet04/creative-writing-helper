import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, computed, signal } from '@angular/core';
import { StoryCharacterService } from '../../shared/services/story-character-service.service';
import { StoryCharacter } from '../../shared/models/StoryCharacter';
import { MenuItem } from '../sidenav/sidenav.component';
import { Story } from '../../shared/models/Story';
import { StoryService } from '../../shared/services/story.service';
import { MatDialog } from '@angular/material/dialog';
import { StoryEditorComponent } from '../story-editor/story-editor.component';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges, AfterViewInit {
  stories: Array<Story> = [];
  username: string = '';
  id: string = '';

  constructor(private storyService: StoryService, public dialog: MatDialog, private sharedData: SharedDataService, private router: Router) {}
  ngAfterViewInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getStories();
  }

  ngOnInit(): void {
    this.id = this.sharedData.getUserId()!;
    console.log(this.id);
    this.username = this.sharedData.getUsername()!;
    console.log(this.username);
    this.getStories();
  }

  getStories(): void {
    if (this.id) {
      this.storyService.getAllStories(this.id).subscribe(stories => {
        this.stories = stories;
      });
    }
    
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
