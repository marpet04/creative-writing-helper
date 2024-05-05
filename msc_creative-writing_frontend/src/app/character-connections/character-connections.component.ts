import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, asNativeElements } from '@angular/core';
import { StoryCharacter } from '../models/StoryCharacter';
import { StoryCharacterService } from '../services/story-character-service.service';
import { MatDialog } from '@angular/material/dialog';
import * as LeaderLine from 'leader-line-new';
import { LineObject } from '../models/LineObject';
import { ConfigurationService } from '../services/configuration.service';
import { forkJoin, mergeMap } from 'rxjs';
import { CharacterObject } from '../models/CharacterObject';
import { Router } from '@angular/router';

export type Color = {
  color: string,
  connection: string
}

@Component({
  selector: 'app-character-connections',
  templateUrl: './character-connections.component.html',
  styleUrl: './character-connections.component.scss'
})
export class CharacterConnectionsComponent implements OnChanges, AfterViewInit, OnInit, OnDestroy{
  temp_start: string = "";
  temp_end: string = "";

  connect_btn: boolean = false;
  disconnect_btn: boolean = false;

  characters: Array<StoryCharacter> = [];
  colors: Color[] = [
    {
      color: '#AB2843',
      connection: 'család'
    },
    {
      color: '#487BEE',
      connection: 'barát'
    },
    {
      color: '#027802',
      connection: 'ellenség'
    }
  ];

  displayedColumns: string[] = ['color', 'connection', 'choice'];

  linesOnBoard: LineObject[] = [];
  addedLinesOnBoard: LineObject[] = [];
  indexOfLine: number = -1;
  characterObjectPositions: Map<string, CharacterObject> = new Map<string, CharacterObject>();
  tempCharacterObjectPositions: Map<string, CharacterObject> = new Map<string, CharacterObject>();
  linesToBeDeleted: LineObject[] = [];
  color: string = 'coral';

  constructor(private storyCharacterService: StoryCharacterService, private configService: ConfigurationService, public dialog: MatDialog, private router: Router) {}
  ngOnDestroy(): void {
    this.leaderlines.forEach((line) => {
      line.remove();
    });
    this.characterObjectPositions = new Map<string, CharacterObject>();
  }

  ngAfterViewInit(): void {
    this.iterateCharPos();
    this.iterateLines();
  }

  iterateLines() {
    this.configService.getAllLines().subscribe(lines => {
      this.linesOnBoard = lines;
      for (let line of this.linesOnBoard) {
        console.log(line);
        this.drawLine(line.start, line.end, true, line.color);
      }
    });
  }

  iterateCharPos() {
    this.configService.getAllCharPos().subscribe(pos => {
      for(let p of pos) {
        this.characterObjectPositions.set(p.objectId, p);
        console.log(p);
        this.setPosition(p.objectId);
      }
    });
  }

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

  getClick(param: string) {
    if (this.connect_btn) {
      this.drawLineOnClick(param);
    } else if (this.disconnect_btn) {
      this.removeLineOnClick(param);
    }
  }

  drawLineOnClick(param: string) {
    if (this.connect_btn) {
      console.log("drawLineOnClick");
      if (this.temp_start == "") {
        this.temp_start = param;
        console.log(this.temp_start);
      } else {
        this.temp_end = param;
        console.log(this.temp_end);
        this.drawLine(this.temp_start, this.temp_end, false, this.color);
        this.temp_start = "";
        this.temp_end = "";  
      }
    }
  }

  leaderlines: LeaderLine[] = [];

  removeLineOnClick(param: string) {
    if (this.disconnect_btn) {
      console.log("removeLineOnClick");
      if (this.temp_start == "") {
        this.temp_start = param;
        console.log(this.temp_start);
      } else {
        this.temp_end = param;
        console.log(this.temp_end);
        console.log("removeLine előtt");
        this.removeLine(this.temp_start, this.temp_end);
        console.log("removeLine után");
        this.temp_start = "";
        this.temp_end = "";  
      }
    }
  }

  drawLine(start: string, end: string, loaded: boolean, colorOption: string) {
    let line = new LeaderLine(document.getElementById(start) as Element, document.getElementById(end) as Element, {
      color: colorOption
    });
    this.leaderlines.push(line);
    line.show();
    if (loaded == false) {
      this.addedLinesOnBoard.push({
        storyID: localStorage.getItem('selectedStoryDocID')!,
        start: start,
        end: end,
        color: line.color
      });
    }

    console.log(document.getElementById(start)!.getBoundingClientRect());

    document.getElementById(start)!.addEventListener('mousemove', () => {
      line.position();
    }, false);
    document.getElementById(end)!.addEventListener('mousemove', () => {
      line.show();
      line.position();
    }, false);
    document.getElementById(start)!.addEventListener('click', () => {
      line.position();
    }, false);
    
    let svg_class = Array.from(document.querySelectorAll("svg"));
    let indexLine = 0
    for(let svg of svg_class) {
      if (svg.getAttribute("class") == "leader-line") {
        indexLine += 1;
        svg.setAttribute("elementId", indexLine as unknown as string);
        console.log("----------------------------");
        console.log(svg);
      }
      
    }
  }

  removeLine(start: string, end: string) {
    if (this.leaderlines.length == 0) {
      console.log("Üres tömbből nem lehet törölni!");
    } else {
      for (let l of this.leaderlines) {
        console.log(l);
        let startElement = l.start as HTMLElement;
        let endElement = l.end as HTMLElement;
        if(startElement.id == start && endElement.id == end) {
          l.remove();
          console.log("Törölve!");
          let i = 0;
          for(let o of this.addedLinesOnBoard) {
            if (o.start == start && o.end == end) {
              console.log(o);
              this.addedLinesOnBoard.splice(i, 1);
              console.log(this.addedLinesOnBoard);
            }
            i += 1;
          }
          let j = 0;
          for(let o of this.linesOnBoard) {
            if (o.start == start && o.end == end) {
              this.linesOnBoard.splice(i, 1);
              console.log(o);
              console.log(this.linesOnBoard);
              this.linesToBeDeleted.push({
                storyID: localStorage.getItem('selectedStoryDocID')!,
                start: start,
                end: end,
                color: o.color,
                docID: o.docID
              });
              console.log(this.linesToBeDeleted);
            }
            j += 1;
          }
        }
      }
    }
  }

  getPosition(objectId: string) {
    let objectPosition = document.getElementById(objectId)?.getBoundingClientRect();
    this.tempCharacterObjectPositions.set(objectId, {
      positionX: objectPosition?.left!,
      positionY: objectPosition?.top!,
      objectId: objectId,
      storyID: localStorage.getItem('selectedStoryDocID')!
    });
    console.log(objectId + ' positionX: ' + objectPosition?.left! + ' positionY: ' + objectPosition?.top!);
    console.log(this.tempCharacterObjectPositions);
  }

  setPosition(objectId: string) {
    let object = this.characterObjectPositions.get(objectId);
    let objectPosition = document.getElementById(objectId) as HTMLElement;
    console.log(document.getElementById(objectId));
    console.log(object);
    objectPosition.style.position = 'absolute';
    objectPosition.style.left = object?.positionX + 'px';
    objectPosition.style.top = object?.positionY + 'px';
  }

  getColor(color: string) {
    this.color = color;
  }

  addRow() {}

  save() {
    console.log(this.addedLinesOnBoard);
    for (let line of this.addedLinesOnBoard) {
      this.configService.createLine(line).subscribe(lineObj => {
        console.log(lineObj);
      });
    }
    this.linesOnBoard = this.linesOnBoard.concat(this.addedLinesOnBoard);
    this.addedLinesOnBoard = [];

    console.log(this.linesToBeDeleted);
    for (let line of this.linesToBeDeleted) {
      console.log(line);
      this.configService.removeLine(line.docID!).subscribe(message => {
        console.log(message);
      })
    }

    this.linesToBeDeleted = [];

    for (let co of this.tempCharacterObjectPositions) {
      let sim = this.characterObjectPositions.get(co[0]);
      console.log(sim);
      if (sim == undefined) {
        console.log('Creation');
        this.configService.createCharPos(co[1]).subscribe(charObj => {
          console.log(charObj);
        });
      } else {
        console.log('Update');
        co[1].docID = sim.docID;
        this.configService.updateCharPos(co[1]).subscribe(charObj => {
          console.log(charObj);
        });
      }
    }

    this.tempCharacterObjectPositions = new Map<string, CharacterObject>();
    this.leaderlines.forEach((line) => {
      line.remove();
    });
    this.characterObjectPositions = new Map<string, CharacterObject>();
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl("/nav/characters");
  }


}