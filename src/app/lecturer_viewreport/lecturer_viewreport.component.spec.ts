import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerViewReportComponent } from './lecturer_viewreport.component';

describe('LecturerViewReportComponent', () => {
  let component: LecturerViewReportComponent;
  let fixture: ComponentFixture<LecturerViewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerViewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
