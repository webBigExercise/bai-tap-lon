import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementLecturerComponent } from './management-lecturer.component';

describe('ManagementLecturerComponent', () => {
  let component: ManagementLecturerComponent;
  let fixture: ComponentFixture<ManagementLecturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementLecturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
