import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerStudentDashboardComponent } from './lecturer_studentdashboard.component';

describe('LecturerStudentDashboardComponent', () => {
  let component: LecturerStudentDashboardComponent;
  let fixture: ComponentFixture<LecturerStudentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerStudentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerStudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
