import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  // content: string;
  // title: string;
  // startTime: string;
  // endTime: string;
  // ownerId: string;
  news: any[]
  notifyFollow: any[]
  constructor(private _http: Http) { }

  ngOnInit() {
    const headers = new Headers();
    // console.log(window.localStorage.getItem('jwt-token'))
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    // console.log(headers.toJSON);
    this._http.get('http://localhost:3000/api/student/allNotif', { headers: headers })
      .map((response: Response) => response.json()).subscribe(data => {
        this.news = data.notifs;
        // this.content = data.content; this.title = data.title;
        // this.startTime = data.startTime; this.endTime = data.endTime; this.ownerId = data.ownerId;
      });
    this._http.get('http://localhost:3000/api/student/getInfo', { headers: headers })
      .map((response: Response) => response.json()).subscribe(data => {
        this.notifyFollow = data.student.notifFollow;
        // console.log(this.news);
        // console.log(this.notifyFollow);
        for (let i = 0; i < this.news.length; i++) {
          for (let j = 0; j < this.notifyFollow.length; j++) {
            if (this.notifyFollow[j]._id === this.news[i]._id) {
              this.news[i].following = 'FOLLOWING';
              break;
            } else {
              this.news[i].following = 'FOLLOW';
            }
          }
        }
        // this.news.forEach(newIntern => {
        //   if (this.notifyFollow.includes(newIntern)) {
        //     newIntern.following = 'FOLLOW';
        //   }
        // });
      });
  }
  handleFollowButtonClick(event) {
  }

  assignForIntern(event) {
    const newId = event.target.id;
    if (event.target.innerHTML !== 'FOLLOWING') {
      const headers = new Headers();
      event.target.innerHTML = 'FOLLOWING';
      // console.log(window.localStorage.getItem('jwt-token'))
      headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
      this._http.put('http://localhost:3000/api/student/asignForIntern?id=' + newId, { headers: headers })
    }
  }
}
