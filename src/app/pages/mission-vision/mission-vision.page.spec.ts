import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionVisionPage } from './mission-vision.page';

describe('MissionVisionPage', () => {
  let component: MissionVisionPage;
  let fixture: ComponentFixture<MissionVisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionVisionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionVisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
