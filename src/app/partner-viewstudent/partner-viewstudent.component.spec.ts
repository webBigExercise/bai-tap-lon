import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerViewstudentComponent } from './partner-viewstudent.component';

describe('PartnerViewstudentComponent', () => {
  let component: PartnerViewstudentComponent;
  let fixture: ComponentFixture<PartnerViewstudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerViewstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerViewstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
