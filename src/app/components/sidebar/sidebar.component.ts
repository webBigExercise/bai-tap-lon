import { Component, OnInit } from '@angular/core';

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

]
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    actor: any;
    constructor() { this.actor = 'partner' }

    ngOnInit() {
        if (this.actor === 'student') { this.menuItems = ROUTES.filter(menuItem => menuItem.actor === 'student'); } else
            if (this.actor === 'lecturer') {
                this.menuItems = ROUTES.filter(menuItem =>
                    (menuItem.actor === 'lecturer' && menuItem.title !== 'StudentDashBoard'))
            } else if (this.actor === 'partner') {
                this.menuItems = ROUTES.filter(menuItem =>
                    (menuItem.actor === 'partner'))
            }
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
