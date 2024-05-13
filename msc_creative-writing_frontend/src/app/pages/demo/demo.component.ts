import { Component } from '@angular/core';
import { AiService } from '../../shared/services/ai.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {

  chosenGenreForCharacter: string = 'romantikus';
  chosenGenreForDescription: string = 'kaland';
  genres: string[] = ["romantikus", "sci-fi", "kaland", "horror", "gyerek mese", "fantasy"];
  replyCharacters: string = '';
  replyDescription: string = '';

  constructor(private ai: AiService) {}

  generateNames() {
    this.ai.getChatGPTCharName(this.chosenGenreForCharacter).subscribe((message: any) => {
      this.replyCharacters = message;
      console.log(this.replyCharacters);
    });
  }

  generateCharacter() {
    this.ai.getChatGPTCharacter(this.chosenGenreForDescription).subscribe((message: any) => {
      this.replyDescription = message;
      console.log(this.replyDescription);
    });
  }



}
