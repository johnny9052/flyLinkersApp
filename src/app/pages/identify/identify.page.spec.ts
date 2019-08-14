import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyPage } from './identify.page';

describe('IdentifyPage', () => {
  let component: IdentifyPage;
  let fixture: ComponentFixture<IdentifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
