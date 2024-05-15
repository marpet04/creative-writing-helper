import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AianalysisComponent } from './aianalysis.component';

describe('AianalysisComponent', () => {
  let component: AianalysisComponent;
  let fixture: ComponentFixture<AianalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AianalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AianalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
