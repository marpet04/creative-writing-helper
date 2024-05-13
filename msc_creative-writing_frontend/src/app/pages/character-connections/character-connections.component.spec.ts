import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterConnectionsComponent } from './character-connections.component';

describe('CharacterConnectionsComponent', () => {
  let component: CharacterConnectionsComponent;
  let fixture: ComponentFixture<CharacterConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterConnectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
