import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  receiver: string;
  message: string;
  listReports: any[]
  constructor(private _http: Http) { }

  ngOnInit() {
    const headers = new Headers();

    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    this._http.get('http://localhost:3000/api/student/getInfo', { headers: headers })
      .map((response: Response) => response.json()).subscribe(data => {
        this.listReports = data.student.reports;
      });

  }
  sendBriefReport() {
    const headers = new Headers();
    // console.log(window.localStorage.getItem('jwt-token'))
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    if (this.message === '' || this.receiver === '') {
      document.getElementById('error').innerHTML = 'Fill all box';
    } else {
      const briefReportForm = { receivMail: this.receiver, content: this.message }
      this._http.post('http://localhost:3000/api/student/sendBriefReport', briefReportForm, { headers: headers });
      alert('success')
    }
  }
}
