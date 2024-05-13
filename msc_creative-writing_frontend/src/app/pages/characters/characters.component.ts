import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoryCharacter } from '../../shared/models/StoryCharacter';
import { StoryCharacterService } from '../../shared/services/story-character-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CharacterEditorComponent } from '../character-editor/character-editor.component';
import { StoryChapter } from '../../shared/models/StoryChapter';
import { ChapterService } from '../../shared/services/chapter.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit, OnChanges{
  characters: Array<StoryCharacter> = [];
  chapters : StoryChapter[] = [];

  constructor(private storyCharacterService: StoryCharacterService, public dialog: MatDialog, private chapterService: ChapterService) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.getCharacters();
    this.getChapters();
  }

  getCharacters(): void {
    this.storyCharacterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
      console.log(this.characters);
    });
  }

  getChapters(): void {
    this.chapterService.getAllChapters().subscribe(chapters => {
      this.chapters = chapters;
    });
  }

  openEditor(characterData:any){
    this.dialog.open(CharacterEditorComponent, {
      data: {
        info: characterData,
      },
    });
    console.log(characterData);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getCharacters();
    });
  }

  deleteCharacter(docID:string) {
    console.log(docID);
    this.storyCharacterService.deleteCharacter(docID).subscribe(t => {
      console.log(t);
      this.getCharacters();
    });
  }
}
