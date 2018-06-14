import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    actor: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', actor: 'student', icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'My Profile', actor: 'student', icon: 'person', class: '' },
    { path: '/table-list', title: 'News', actor: 'student', icon: 'content_paste', class: '' },
    { path: '/message', title: 'Messages', actor: 'student', icon: 'message', class: '' },
    { path: '/internship', title: 'Internship', actor: 'student', icon: 'how_to_reg', class: '' },
    { path: '/report', title: 'Report', icon: 'link', actor: 'student', class: '' },
    { path: '/lecturer_viewstudent', title: 'View Student', actor: 'lecturer', icon: 'dashboard', class: '' },
    { path: '/lecturer_studentdashboard', title: 'StudentDashBoard', actor: 'lecturer', icon: 'dashboard', class: '' },
    { path: '/lecturer_viewreport', title: 'View Report', icon: 'assignment_turned_in', actor: 'lecturer', class: '' },
    { path: '/partner_internship_news', title: 'Internship News', actor: 'partner', icon: 'content_paste', class: '' },
    { path: '/partner_viewstudent', title: 'View Student', actor: 'partner', icon: 'dashboard', class: '' },
    { path: '/partner_notifications', title: 'Notifications', actor: 'partner', icon: 'add_alert', class: '' },
    { path: '/partner_message', title: 'Message', actor: 'partner', icon: 'message', class: '' },
    { path: '/management-student', title: 'Student Management', actor: 'admin', icon: 'dashboard', class: '' },
    { path: '/management-lecturer', title: 'Lecturer Management', actor: 'admin', icon: 'dashboard', class: '' },
    { path: '/management-partner', title: 'Partner Management', actor: 'admin', icon: 'dashboard', class: '' },
    { path: '/management-admin', title: 'Admin Management', actor: 'admin', icon: 'dashboard', class: '' },
]
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    actor: any;
    private http: Http;
    constructor(_http: Http) { this.http = _http; }

    ngOnInit() {
        // console.log('aaaaa')
        // const headers = new Headers({ 'Content-Type': 'application/json' });
        // this.http.post('http://localhost:3000/api/login',
        //     { mail: 'firstStd@gmail.com', password: 'somepass' }).
        //     map((response: Response) => console.log(response.json));
        // if (window.localStorage.getItem('jwt-token')) {
        //     window.localStorage.removeItem('jwt-token');
        // }
        const token = window.localStorage.getItem('jwt-token');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const person = JSON.parse(window.atob(base64));

        this.actor = person._type;

        this.actor = 'student';

        if (this.actor === 'student') { this.menuItems = ROUTES.filter(menuItem => menuItem.actor === 'student'); } else
            if (this.actor === 'lecturer') {
                this.menuItems = ROUTES.filter(menuItem =>
                    (menuItem.actor === 'lecturer' && menuItem.title !== 'StudentDashBoard'))
            } else if (this.actor === 'partner') {
                this.menuItems = ROUTES.filter(menuItem =>
                    (menuItem.actor === 'partner'))
            } else {
                this.menuItems = ROUTES.filter(menuItem =>
                    (menuItem.actor === 'admin'))
            }
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
