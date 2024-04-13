import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, computed, signal } from '@angular/core';
import { StoryCharacterService } from '../services/story-character-service.service';
import { StoryCharacter } from '../models/StoryCharacter';
import { MenuItem } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  
}
