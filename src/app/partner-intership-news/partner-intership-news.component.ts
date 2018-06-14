import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';
@Component({
  selector: 'app-partner-intership-news',
  templateUrl: './partner-intership-news.component.html',
  styleUrls: ['./partner-intership-news.component.css']
})
export class PartnerIntershipNewsComponent implements OnInit {
  subject: string;
  content: string;
  constructor(private _http: Http) { }

  ngOnInit() {
  }
  addNews() {
    const headers = new Headers();
    // console.log(window.localStorage.getItem('jwt-token'))
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    const messageForm = { content: this.content, title: this.subject }
    this._http.post('http://localhost:3000/api/partner/postIntern', messageForm, {headers});
  }
}
