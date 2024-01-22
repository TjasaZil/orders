import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private hardcodedCredentials = {
    email: 'admin@mail.com',
    password: 'password123',
  };

  login(email: string, password: string) {
    if (
      email === this.hardcodedCredentials.email &&
      password === this.hardcodedCredentials.password
    ) {
      this.router.navigate(['/orders-list'], { replaceUrl: true });
    } else console.log('You do not have the right credentials');
  }
}
