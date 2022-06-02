/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UyeIlanComponent } from './UyeIlan.component';

describe('UyeIlanComponent', () => {
  let component: UyeIlanComponent;
  let fixture: ComponentFixture<UyeIlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UyeIlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UyeIlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
