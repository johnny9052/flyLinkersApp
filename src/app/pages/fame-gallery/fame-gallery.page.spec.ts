import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FameGalleryPage } from './fame-gallery.page';

describe('FameGalleryPage', () => {
  let component: FameGalleryPage;
  let fixture: ComponentFixture<FameGalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FameGalleryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FameGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
