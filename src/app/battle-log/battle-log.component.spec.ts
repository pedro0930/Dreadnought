import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleLogComponent } from './battle-log.component';

describe('BattleLogComponent', () => {
  let component: BattleLogComponent;
  let fixture: ComponentFixture<BattleLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
