import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  buttonText = this.authService.isLoggedIn ? 'Sign in' : 'Sign out';

  onClick() {
    return this.router.parseUrl('/auth');
  }
}
