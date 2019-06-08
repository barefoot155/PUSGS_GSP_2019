import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinesComponent } from './edit-lines.component';

describe('EditLinesComponent', () => {
  let component: EditLinesComponent;
  let fixture: ComponentFixture<EditLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
