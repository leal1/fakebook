import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    document.body.classList.add('bg');
    this.authenticationService.getCSRFToken()
      .subscribe();
    console.log("DONE");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    document.body.classList.remove('bg');
  }

  get f() { return this.loginForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if(this.loginForm.invalid) return;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      
      .subscribe(data => {
        this.invalidLogin = false;
        this.router.navigate([this.returnUrl]);
      },
      (err) => {
        this.invalidLogin = true;
      })

  }

}
