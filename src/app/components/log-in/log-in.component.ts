import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: 'app-log-in',
  template: `<div class="main-container">
<section>
  <form (submit)="login()" [formGroup]="loginForm" autocomplete="off" >
    <div>
      <label for="email" class="p-inter-medium">Email</label>
      <input id="email" type="email" placeholder="email" formControlName="email">
    </div>
    <div>
      <label for="password" class="p-advent-bold">Password</label>
      <input id="password" type="password" placeholder="password" formControlName="password"/>
    </div>
    <button type="submit" class="btn-solid">Submit</button>
  </form>
</section>
  </div>`,
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

 constructor(private authService: AuthService){}

loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required]),
});

 login(){

  const email = this.loginForm.get('email')?.value ?? '';
  const password = this.loginForm.get('password')?.value ?? '';

    if (this.loginForm.invalid) return;
    else this.authService.login(email, password);
  }
 }

