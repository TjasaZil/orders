import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: 'app-log-in',
  template: `<section>
  <form (submit)="login()" [formGroup]="loginForm" >
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" placeholder="email" formControlName="email">
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" placeholder="password" formControlName="password"/>
    </div>
    <button type="submit" >Submit</button>
    <a href="/orders-list">Forgot your password?</a>
  </form>
</section>`,
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

