// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('Login Component', () => {
  const html = '<my-login></my-login>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [LoginComponent, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Sign in');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
