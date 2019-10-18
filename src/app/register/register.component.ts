import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  invalidRegister: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    document.body.classList.add('bg');
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('bg');
  }

  get f() { return this.registerForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if(this.registerForm.invalid) return;
    this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
              data => {
                this.invalidRegister = false;
                this.registerForm.controls['username'].setErrors(null);

                
                this.router.navigate(['/login']);
              },
              (err) => {
                this.registerForm.controls['username'].setErrors({'incorrect': true});
                this.invalidRegister = true;
              }
            )}

}
