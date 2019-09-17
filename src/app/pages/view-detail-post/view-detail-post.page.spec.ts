import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailPostPage } from './view-detail-post.page';

describe('ViewDetailPostPage', () => {
  let component: ViewDetailPostPage;
  let fixture: ComponentFixture<ViewDetailPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
