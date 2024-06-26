import { Component, Inject, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoryCharacterService } from '../../shared/services/story-character-service.service';
import { StoryCharacter } from '../../shared/models/StoryCharacter';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChapterService } from '../../shared/services/chapter.service';
import { StoryChapter } from '../../shared/models/StoryChapter';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-character-editor',
  templateUrl: './character-editor.component.html',
  styleUrl: './character-editor.component.scss',
  providers: [DatePipe]
})
export class CharacterEditorComponent implements OnInit, OnChanges{
  character: StoryCharacter = {
    name: '',
    profession: '',
    birthDate: '',
    description: '',
    docID: '',
    chapterID: '',
    storyID: undefined
  }

  chapters : StoryChapter[] = [];

  private dialogRef;
  private data;

  constructor(private storyCharacterService: StoryCharacterService, 
              private router: Router, private injector: Injector, 
              private chapterService: ChapterService, private toastr: ToastrService,
              private datePipe: DatePipe) {
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

    this.character.name = this.data?.info?.name ?? '';
    this.character.profession = this.data?.info?.profession ?? '';
    this.character.birthDate = this.data?.info?.birthDate as string ?? '';
    this.character.description = this.data?.info?.description ?? '';
    this.character.docID = this.data?.info?.docID ?? '';
    this.character.chapterID = this.data?.info?.chapterID ?? '';
    this.character.storyID = localStorage.getItem('selectedStoryDocID') ?? undefined;
  }

  changeDatePicker() {
    this.character.birthDate = this.datePipe.transform(this.character.birthDate, 'yyyy-MM-dd') || '';
  }

    onSubmit(){
      console.log(this.character);
      if (this.data) {
        this.storyCharacterService.updateCharacter(this.character).subscribe({
          next: (data) => {
            console.log(data);
            this.showSuccess();
            this.router.navigateByUrl("/nav/characters");
          }
        });
      } else {
        this.storyCharacterService.createCharacter(this.character).subscribe({
          next: (data) => {
            console.log(data);
            this.showSuccess();
            this.router.navigateByUrl("/nav/characters");
          }
        });
      }
      this.dialogRef?.close();
    }

    closeDialog() {
      this.dialogRef?.close();
      this.router.navigateByUrl("/nav/characters");
    }

    showSuccess() {
      this.toastr.success('Karakter sikeres mentése megtörtént!', 'Karakter tervező');
    }
  
    showFailure() {
      this.toastr.error('Sikertelen mentés, hiba lépett fel!', 'Karakter tervező', {
        closeButton: true
      });
    }




}