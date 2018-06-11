import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerViewStudentComponent } from './lecturer_viewstudent.component';

describe('LecturerViewStudentComponent', () => {
  let component: LecturerViewStudentComponent;
  let fixture: ComponentFixture<LecturerViewStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerViewStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerViewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
