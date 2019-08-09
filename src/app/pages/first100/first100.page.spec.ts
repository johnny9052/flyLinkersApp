import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { First100Page } from './first100.page';

describe('First100Page', () => {
  let component: First100Page;
  let fixture: ComponentFixture<First100Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ First100Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(First100Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
