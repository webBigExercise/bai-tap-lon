import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerIntershipNewsComponent } from './partner-intership-news.component';

describe('PartnerIntershipNewsComponent', () => {
  let component: PartnerIntershipNewsComponent;
  let fixture: ComponentFixture<PartnerIntershipNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerIntershipNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerIntershipNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
