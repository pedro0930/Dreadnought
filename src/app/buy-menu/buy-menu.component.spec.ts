import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMenuComponent } from './buy-menu.component';

describe('BuyMenuComponent', () => {
  let component: BuyMenuComponent;
  let fixture: ComponentFixture<BuyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
