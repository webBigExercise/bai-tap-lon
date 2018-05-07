import { Component } from '@angular/core';
import {StudentAuthenticationService} from './student/student.authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Login';
  loginType: string;
  handleAuthentication() {
    switch (this.loginType) {
      case 'Student':
        break;
      case 'Lecturer':

        break;
      case 'Admin':

        break;
    }
  }
}
