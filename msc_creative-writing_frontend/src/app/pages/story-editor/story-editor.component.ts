import { Component, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Story } from '../../shared/models/Story';
import { StoryService } from '../../shared/services/story.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { User } from '../../shared/models/User';

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
    author: '',
    gallery: {
      images: []
    }
  }

  user: User = {
    username: '',
    email: '',
    id: ''
  }

  private dialogRef;
  private data;

  constructor(private storyService: StoryService, 
              private router: Router, 
              private injector: Injector, 
              private toastr: ToastrService,
              private sharedData: SharedDataService) {
      this.dialogRef = this.injector.get(MatDialogRef, null);
      this.data = this.injector.get(MAT_DIALOG_DATA, null);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.story.title = this.data?.info?.title ?? '';
    this.story.description = this.data?.info?.description ?? '';
    this.story.docID = this.data?.info?.docID ?? '';
    this.story.author = this.sharedData.getUserId()!;
  }

    onSubmit(){
      console.log(this.story);
      if (this.data.info != null) {
        this.storyService.updateStory(this.story).subscribe({
          next: (data) => {
            console.log(data);
            this.showSuccess();
            this.router.navigateByUrl("/nav/dashboard");
          }
        });
      } else {
        this.storyService.createStory(this.story).subscribe({
          next: (data) => {
            console.log(data);
            this.showSuccess();
            this.router.navigateByUrl("/nav/dashboard");
          }
        });
      }
      this.dialogRef?.close();
    }

    closeDialog() {
      this.dialogRef?.close();
      this.router.navigateByUrl("/nav/dashboard");
    }

    showSuccess() {
      this.toastr.success('Sikeres mentés!', 'Történet mentés');
    }

    showFailure() {
      this.toastr.error('Sikertelen mentés, hiba lépett fel!', 'Történet mentés', {
        closeButton: true
      });
    }
}
