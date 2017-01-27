import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Register Page');
  }
  registerForm(form: any): void {

    if (form.valid) {
        console.log('Form Data: ');
        console.log(form);
    }
  }
}
