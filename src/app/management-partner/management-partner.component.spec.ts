import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPartnerComponent } from './management-partner.component';

describe('ManagementPartnerComponent', () => {
  let component: ManagementPartnerComponent;
  let fixture: ComponentFixture<ManagementPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
