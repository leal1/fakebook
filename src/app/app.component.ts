import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    MomentModule
  ],
  declarations: [
    MomentModule
  ]
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fakebook';
}
