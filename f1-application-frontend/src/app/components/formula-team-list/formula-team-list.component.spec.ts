import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaTeamListComponent } from './formula-team-list.component';

describe('FormulaTeamListComponent', () => {
  let component: FormulaTeamListComponent;
  let fixture: ComponentFixture<FormulaTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaTeamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
