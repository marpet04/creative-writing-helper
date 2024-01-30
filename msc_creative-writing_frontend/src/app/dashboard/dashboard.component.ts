import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoryCharacterService } from '../services/story-character-service.service';
import { StoryCharacter } from '../models/StoryCharacter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges{

  characters: Array<StoryCharacter> = [];

  constructor(private storyCharacterService: StoryCharacterService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.storyCharacterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  ngOnInit(): void {
    this.storyCharacterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }
}
