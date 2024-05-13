import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorFormDialogComponent } from './color-form-dialog.component';

describe('ColorFormDialogComponent', () => {
  let component: ColorFormDialogComponent;
  let fixture: ComponentFixture<ColorFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
