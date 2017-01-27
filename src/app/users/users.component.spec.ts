// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { UsersComponent } from './Users.component';

describe('Users Component', () => {
  const html = '<my-Users></my-Users>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [UsersComponent, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Users Works!');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
