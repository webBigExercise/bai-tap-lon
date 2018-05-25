import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
declare const require: any;
@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student.dashboard.component.html',
    styleUrls: ['./student.dashboard.component.css', './assets/css/material-dashboard.css', './assets/css/demo.css']
})

export class StudentDashboardComponent implements OnInit {
    private sidebarImgPath =  require('./assets/img/sidebar-1.jpg');
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

