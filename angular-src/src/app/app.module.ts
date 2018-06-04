import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pagenotfound.component';
import { HttpClientModule } from '@angular/common/http';


// Import component
import { AppComponent } from './app.component';
import { StudentDashboardComponent } from './student/student.dashboard.component';
import { StudentInfoComponent } from './student/student.info.component';
// const appRoutes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  declarations: [
    AppComponent, PageNotFoundComponent, StudentDashboardComponent, StudentInfoComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [StudentDashboardComponent]
})
export class AppModule { }
