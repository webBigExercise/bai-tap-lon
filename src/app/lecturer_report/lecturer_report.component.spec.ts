import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerReportComponent } from './lecturer_report.component';

describe('LecturerReportComponent', () => {
  let component: LecturerReportComponent;
  let fixture: ComponentFixture<LecturerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
