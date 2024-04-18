import { Component, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Story } from '../models/Story';
import { StoryService } from '../services/story.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-story-editor',
  templateUrl: './story-editor.component.html',
  styleUrl: './story-editor.component.scss'
})
export class StoryEditorComponent implements OnInit, OnChanges{
  story: Story = {
    title: '',
    description: '',
    docID: '',
    author: ''
  }

  private dialogRef;
  private data;

  constructor(private storyService: StoryService, 
              private router: Router, private injector: Injector) {
      this.dialogRef = this.injector.get(MatDialogRef, null);
      this.data = this.injector.get(MAT_DIALOG_DATA, null);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.story.title = this.data?.info?.title ?? '';
    this.story.description = this.data?.info?.description ?? '';
    this.story.docID = this.data?.info?.docID ?? '';
  }

    onSubmit(){
      console.log(this.story);
      if (this.data.info != null) {
        this.storyService.updateStory(this.story).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl("/nav/dashboard");
          }
        });
      } else {
        this.storyService.createStory(this.story).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl("/nav/dashboard");
          }
        });
      }
      this.dialogRef?.close([]);
    }

    closeDialog() {
      this.dialogRef?.close([]);
      this.router.navigateByUrl("/nav/dashboard");
    }
}
