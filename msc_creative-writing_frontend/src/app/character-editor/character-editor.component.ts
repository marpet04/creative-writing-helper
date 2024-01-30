import { Component } from '@angular/core';
import { StoryCharacterService } from '../services/story-character-service.service';
import { StoryCharacter } from '../models/StoryCharacter';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-editor',
  templateUrl: './character-editor.component.html',
  styleUrls: ['./character-editor.component.scss']
})
export class CharacterEditorComponent {
  character: StoryCharacter = {
    name: '',
    profession: '',
    birthDate: '',
    description: ''
  }

    constructor(private storyCharacterService: StoryCharacterService, private router: Router) {}

    onSubmit(){
      console.log(this.character)
      this.storyCharacterService.createCharacter(this.character).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl("/dashboard");
        }
      });

    }
}
