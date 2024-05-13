import { Component } from '@angular/core';
import { Color } from '../character-connections.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-color-form-dialog',
  templateUrl: './color-form-dialog.component.html',
  styleUrl: './color-form-dialog.component.scss'
})
export class ColorFormDialogComponent {
  newColor: Color = {
    colorName: '',
    colorCode: ''
  };

  constructor(public dialogRef: MatDialogRef<ColorFormDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addColor(): void {
    this.dialogRef.close(this.newColor);
  }
}
