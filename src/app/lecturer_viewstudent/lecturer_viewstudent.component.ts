import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';
@Component({
  selector: 'app-lecturer-viewstudent',
  templateUrl: './lecturer_viewstudent.component.html',
  styleUrls: ['./lecturer_viewstudent.component.css']
})
export class LecturerViewStudentComponent implements OnInit {
  listStudent: any[]
  mark: number;
  selectedId: string;
  constructor(private _http: Http) { }

  ngOnInit() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    this._http.get('http://localhost:3000/api/lecturer/getListStudentFollow', { headers: headers })
      .map((response: Response) => response.json()).subscribe(data => {
        this.listStudent = data.students;
      });
  }
  giveMark() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    const markForm = { studentId: this.selectedId, grade: this.mark }
    this._http.post('http://localhost:3000/api/lecturer/giveGrade', markForm, { headers: headers });
    alert('success')
  }
  giveMarkBtnClicked(event) {
    this.selectedId = event.target.id;
  }
}
