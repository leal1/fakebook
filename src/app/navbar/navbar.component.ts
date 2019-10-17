import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  leftText: string = '';
  rightText: string = '';
  currentUser: User;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { 
    this.authService.currentUserBehavior()
      .subscribe((val) => {this.currentUser = val})
  }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
