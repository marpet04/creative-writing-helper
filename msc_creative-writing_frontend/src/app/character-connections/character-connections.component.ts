import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { StoryCharacter } from '../models/StoryCharacter';
import { StoryCharacterService } from '../services/story-character-service.service';
import { MatDialog } from '@angular/material/dialog';
import 'leader-line';
declare let LeaderLine: any;

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
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;

  @ViewChild('canvasEl') canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  isDragging: boolean = false;
  startX!: number;
  startY!: number;
  offsetX!: number;
  offsetY!: number;

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

  drawLine(context: CanvasRenderingContext2D, ) {

  }

  addRow() {


  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d') ?? new CanvasRenderingContext2D();
    this.drawShape(100, 100, 50, 'red'); // Rajzolj egy alakzatot a canvas-ra
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
}