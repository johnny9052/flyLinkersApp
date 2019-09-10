import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPostPage } from './detail-post.page';

describe('DetailPostPage', () => {
  let component: DetailPostPage;
  let fixture: ComponentFixture<DetailPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
