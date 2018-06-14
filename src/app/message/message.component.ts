import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: string;
  receiver: string;
  subject: string;
  listSendMail: any[];
  listReceiveMail: any[];
  constructor(private _http: Http) { }

  ngOnInit() {
    const headers = new Headers();

    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    this._http.get('http://localhost:3000/api/student/getInfo', { headers: headers })
      .map((response: Response) => response.json()).subscribe(data => {
        this.listSendMail = data.student.listDialogSend;
        this.listReceiveMail = data.student.listDialogReceive;
      });
  }
  sendMessage() {
    const headers = new Headers();
    // console.log(window.localStorage.getItem('jwt-token'))
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    if (this.message === '' || this.receiver === '' || this.subject === '') {
      document.getElementById('error').innerHTML = 'Fill all box';
    } else {
      const messageForm = { receivMail: this.receiver, title: this.subject, content: this.message }
      this._http.post('http://localhost:3000/api/student/inbox', messageForm, { headers: headers });
      alert('success')
    }
  }

  replyBtnClicked(event) {
    const indexRow = event.target.parentElement.parentElement.rowIndex;
    const rowClicked = document.getElementById('receiveTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[indexRow];
    const subject = rowClicked.getElementsByTagName('td')[0].innerHTML;
    const receiver = rowClicked.getElementsByTagName('td')[1].innerHTML;
    const headers = new Headers();
    // console.log(window.localStorage.getItem('jwt-token'))
    headers.append('Authorization', 'Bearer' + ' ' + window.localStorage.getItem('jwt-token'));
    // this.message = msg;
    this.subject = 'RE:' + subject;
    this.receiver = receiver;
  }
  sendBtnClicked() {
    this.subject = '';
    this.receiver = '';
  }
}

