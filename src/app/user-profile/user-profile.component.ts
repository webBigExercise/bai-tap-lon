import { Component, OnInit, OnChanges } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnChanges {
  privateEmail: string;
  facebook: string;
  EnglishSkill: string;
  expreneced: string;
  wantToBe: string;
  note: string;
  diploma: string;
  skypeID: string;
  avatar: string;
  imgPath: string;
  // Info to display
  name: string;
  studentNote;
  constructor(private _http: Http) { }

  ngOnChanges() {
    console.log('aaa')
    console.log(this.avatar);
  }

  ngOnInit() {
    const headers = new Headers();
    // console.log(window.localStorage.getItem('jwt-token'))
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    this._http.get('http://localhost:3000/api/student/getInfo', { headers: headers })
      .map((response: Response) => response.json()).subscribe(data => {
        this.name = data.name;
        this.studentNote = data.note;
        this.avatar = data.avatar;
        if (!this.avatar) {
          this.imgPath = '../../assets/img/faces/student.png';
        } else {
          this.imgPath = this.avatar;
        }
      });
  }

  updateStudentInfo() {
    // console.log('aaa')
    const headers = new Headers();
    // // console.log(window.localStorage.getItem('jwt-token'))
    const newInfo = {
      privateEmail: this.privateEmail, facebook: this.facebook, EnglishSkill: this.EnglishSkill,
      expreneced: this.expreneced, wantToBe: this.wantToBe,
      note: this.note, diploma: this.diploma, skypeID: this.skypeID
    };
    console.log(newInfo);
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    // console.log(headers.toJSON);
    this._http.put('http://localhost:3000/api/student/updateInfo', newInfo, { headers: headers });
    // console.log('aaa');
  }
}
