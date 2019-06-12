import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStationsComponent } from './edit-stations.component';

describe('EditStationsComponent', () => {
  let component: EditStationsComponent;
  let fixture: ComponentFixture<EditStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
