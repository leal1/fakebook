import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { FormsModule }        from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { TimelineComponent } from './timeline/timeline.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

import { MomentModule } from 'ngx-moment';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { XsrfInterceptor } from './xsrf-interceptor.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationService } from './authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    PostComponent,
    TimelineComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    library.add(faUserCircle);
    library.add(faThumbsUp);
    library.add(faCommentAlt);

  }
}
