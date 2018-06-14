import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStudentComponent } from './management-student.component';

describe('ManagementStudentComponent', () => {
  let component: ManagementStudentComponent;
  let fixture: ComponentFixture<ManagementStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
