import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPagePage } from './master-page.page';

describe('MasterPagePage', () => {
  let component: MasterPagePage;
  let fixture: ComponentFixture<MasterPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
