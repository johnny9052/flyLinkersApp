import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundingPartnersPage } from './founding-partners.page';

describe('FoundingPartnersPage', () => {
  let component: FoundingPartnersPage;
  let fixture: ComponentFixture<FoundingPartnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundingPartnersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundingPartnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
