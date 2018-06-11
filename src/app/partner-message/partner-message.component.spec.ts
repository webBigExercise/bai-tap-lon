import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerMessageComponent } from './partner-message.component';

describe('PartnerMessageComponent', () => {
  let component: PartnerMessageComponent;
  let fixture: ComponentFixture<PartnerMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
