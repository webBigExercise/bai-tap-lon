import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-info',
  templateUrl: './student.info.component.html',
  styleUrls: ['./student.dashboard.component.css', './assets/css/material-dashboard.css', './assets/css/demo.css']
})
export class StudentInfoComponent implements OnInit {

  constructor() { }
  imgPath = require('./assets/img/faces/marc.png');
  ngOnInit() {
    require('./assets/js/material-dashboard.js');
    require('./assets/js/material.min.js');
    require('./assets/js/chartist.min.js');
    require('./assets/js/jquery-3.2.1.min.js');
    require('./assets/js/bootstrap.min.js');
    require('./assets/js/perfect-scrollbar.jquery.min.js');
    require('./assets/js/bootstrap-notify.js');
  }

}
