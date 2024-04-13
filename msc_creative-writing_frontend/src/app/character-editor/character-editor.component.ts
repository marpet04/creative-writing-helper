import { Component, Inject, Injector, OnInit } from '@angular/core';
import { StoryCharacterService } from '../services/story-character-service.service';
import { StoryCharacter } from '../models/StoryCharacter';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-character-editor',
  templateUrl: './character-editor.component.html',
  styleUrls: ['./character-editor.component.scss']
})
export class CharacterEditorComponent implements OnInit{
  character: StoryCharacter = {
    name: '',
    profession: '',
    birthDate: '',
    description: '',
    docID: ''
  }

  private dialogRef;
  private data;

  constructor(private storyCharacterService: StoryCharacterService, private router: Router, private injector: Injector) {
      this.dialogRef = this.injector.get(MatDialogRef, null);
      this.data = this.injector.get(MAT_DIALOG_DATA, null);
  }

  //constructor(private storyCharacterService: StoryCharacterService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.character.name = this.data?.info?.name ?? '';
    this.character.profession = this.data?.info?.profession ?? '';
    this.character.birthDate = this.data?.info?.birthDate ?? '';
    this.character.description = this.data?.info?.description ?? '';
    this.character.docID = this.data?.info?.docID ?? '';
  }

    onSubmit(){
      console.log(this.character);
      if (this.data) {
        this.storyCharacterService.updateCharacter(this.character).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl("/nav/dashboard");
          }
        });
      } else {
        this.storyCharacterService.createCharacter(this.character).subscribe({
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
