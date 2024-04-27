import { Component, Inject, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoryCharacterService } from '../services/story-character-service.service';
import { StoryCharacter } from '../models/StoryCharacter';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChapterService } from '../services/chapter.service';
import { StoryChapter } from '../models/StoryChapter';

@Component({
  selector: 'app-character-editor',
  templateUrl: './character-editor.component.html',
  styleUrl: './character-editor.component.scss'
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

    this.character.name = this.data?.info?.name ?? '';
    this.character.profession = this.data?.info?.profession ?? '';
    this.character.birthDate = this.data?.info?.birthDate ?? '';
    this.character.description = this.data?.info?.description ?? '';
    this.character.docID = this.data?.info?.docID ?? '';
    this.character.chapterID = this.data?.info?.chapterID ?? '';
    this.character.storyID = localStorage.getItem('selectedStoryDocID') ?? undefined;
  }

    onSubmit(){
      console.log(this.character);
      if (this.data) {
        this.storyCharacterService.updateCharacter(this.character).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl("/nav/characters");
          }
        });
      } else {
        this.storyCharacterService.createCharacter(this.character).subscribe({
          next: (data) => {
            console.log(data);
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




}
