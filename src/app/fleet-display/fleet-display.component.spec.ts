import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetDisplayComponent } from './fleet-display.component';

describe('FleetDisplayComponent', () => {
  let component: FleetDisplayComponent;
  let fixture: ComponentFixture<FleetDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
