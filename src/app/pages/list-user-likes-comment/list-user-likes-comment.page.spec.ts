import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserLikesCommentPage } from './list-user-likes-comment.page';

describe('ListUserLikesCommentPage', () => {
  let component: ListUserLikesCommentPage;
  let fixture: ComponentFixture<ListUserLikesCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserLikesCommentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserLikesCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
