import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, asNativeElements } from '@angular/core';
import { StoryCharacter } from '../models/StoryCharacter';
import { StoryCharacterService } from '../services/story-character-service.service';
import { MatDialog } from '@angular/material/dialog';
import * as LeaderLine from 'leader-line-new';

export type Color = {
  color: string,
  connection: string
}

@Component({
  selector: 'app-character-connections',
  templateUrl: './character-connections.component.html',
  styleUrl: './character-connections.component.scss'
})
export class CharacterConnectionsComponent implements OnChanges, AfterViewInit, OnInit{
  @ViewChild('startingElement', { read: ElementRef }) startingElement!: ElementRef;
  @ViewChild('endingElement', { read: ElementRef }) endingElement!: ElementRef;

  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;

  @ViewChild('canvasEl') canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  isDragging: boolean = false;
  startX!: number;
  startY!: number;
  offsetX!: number;
  offsetY!: number;

  temp_start: string = "";
  temp_end: string = "";

  connect_btn: boolean = false;

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

  displayedColumns: string[] = ['color', 'connection'];

  constructor(private storyCharacterService: StoryCharacterService, public dialog: MatDialog) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.storyCharacterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    this.storyCharacterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
      console.log(this.characters);
    });
  }

  drawLineOnClick(param: string) {
    if (this.connect_btn) {
      if (this.temp_start == "") {
        this.temp_start = param;
        console.log(this.temp_start);
      } else if (this.temp_end == "") {
        this.temp_end = param;
        console.log(this.temp_end);
      } else {
        this.drawLine(this.temp_start, this.temp_end);
        this.temp_start = "";
        this.temp_end = "";
      }
    }
  }

  drawLine(start: string, end: string) {
    let line = new LeaderLine(document.getElementById(start) as Element, document.getElementById(end) as Element);
    line.show();
    line.position();
    console.log(line);
    //console.log(document.getElementById(start)!.getBoundingClientRect());
    document.getElementById(start)!.addEventListener('mousemove', () => {
      line.position();
    }, false);
    document.getElementById(end)!.addEventListener('mousedown', () => {
      line.show();
      line.position();
    }, false);
    document.getElementById(start)!.addEventListener('click', () => {
      line.position();
    }, false);
    

    document.querySelectorAll("svg").forEach(function(elem) {
      console.log(elem);
      if(elem.getAttribute("data-line_id") === '2') {
             console.log("I'm here, sucker");
      }
    });



    //document.getElementById('2')!.addEventListener('click', () => {
    //  line.remove();
    //}, false);
  }

  addRow() {


  }


  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d') ?? new CanvasRenderingContext2D();
    this.drawShape(100, 100, 50, 'red'); // Rajzolj egy alakzatot a canvas-ra
    let rectX = 200
    let rectY = 200
    let gap= 200
    let rectHeight = 150
    this.storyCharacterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
      console.log(this.characters);
      this.characters.forEach(character =>{

            this.drawSquareWithText(character.name, 200, rectY, 150, 'blue');
            rectY += gap
  
      })
    });
  }

  drawShape(x: number, y: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillText("Attack!",this.startX+(this.offsetX/2),this.startY+(this.offsetY/2));
    this.ctx.textAlign = "center";
    this.ctx.closePath();
    this.ctx.fill();
  }

  onMouseDown(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
    this.isDragging = true;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.offsetX = x - this.startX;
      this.offsetY = y - this.startY;
      this.clearCanvas();
      this.drawShape(this.startX + this.offsetX, this.startY + this.offsetY, 50, 'red'); // Mozgassuk az alakzatot a különbségnek megfelelően
    }
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  drawSquareWithText(text: string, x: number, y: number, size: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - size / 2, y - size / 2, size, size); // A négyzet közepének koordinátái és mérete
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(text, x, y); // A szöveg középpontjának koordinátái
  }
}