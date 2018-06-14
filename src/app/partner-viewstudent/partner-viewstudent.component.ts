import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';
@Component({
  selector: 'app-partner-viewstudent',
  templateUrl: './partner-viewstudent.component.html',
  styleUrls: ['./partner-viewstudent.component.css']
})
export class PartnerViewstudentComponent implements OnInit {
  listStudents: any[];
  constructor(private _http: Http) { }

  ngOnInit() {
    const headers = new Headers();
    // console.log(window.localStorage.getItem('jwt-token'))
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    this._http.get('http://localhost:3000/api/partner/allStudentInIntern', { headers: headers })
      .map((response: Response) => response.json()).subscribe(data => { this.listStudents = data.listStudent; });
    // setTimeout(console.log(this.data), 2000);
  }

}
