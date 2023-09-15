import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextStageComponent } from './next-stage.component';

describe('NextStageComponent', () => {
  let component: NextStageComponent;
  let fixture: ComponentFixture<NextStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
