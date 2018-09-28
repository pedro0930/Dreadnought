import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipBuilderComponent } from './ship-builder.component';

describe('ShipBuilderComponent', () => {
  let component: ShipBuilderComponent;
  let fixture: ComponentFixture<ShipBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
