import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaTeamComponent } from './formula-team.component';

describe('FormulaTeamComponent', () => {
  let component: FormulaTeamComponent;
  let fixture: ComponentFixture<FormulaTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
