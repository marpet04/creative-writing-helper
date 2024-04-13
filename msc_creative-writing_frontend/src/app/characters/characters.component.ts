import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoryCharacter } from '../models/StoryCharacter';
import { StoryCharacterService } from '../services/story-character-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CharacterEditorComponent } from '../character-editor/character-editor.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit, OnChanges{
  characters: Array<StoryCharacter> = [];

  constructor(private storyCharacterService: StoryCharacterService, public dialog: MatDialog) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.storyCharacterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  ngOnInit(): void {
    this.storyCharacterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
      console.log(this.characters);
    });
  }

  openEditor(characterData:any){
    this.dialog.open(CharacterEditorComponent, {
      data: {
        info: characterData,
      },
    });
    console.log(characterData)
  }
}
