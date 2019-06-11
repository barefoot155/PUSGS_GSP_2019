import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesMapComponent } from './lines-map.component';

describe('LinesMapComponent', () => {
  let component: LinesMapComponent;
  let fixture: ComponentFixture<LinesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
