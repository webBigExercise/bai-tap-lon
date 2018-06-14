import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MessageComponent } from '../../message/message.component';
import { InternshipComponent } from '../../internship/internship.component';
import { ReportComponent } from '../../report/report.component'

import { LecturerReportComponent } from '../../lecturer_report/lecturer_report.component'
import { LecturerViewStudentComponent } from '../../lecturer_viewstudent/lecturer_viewstudent.component'
import { LecturerStudentDashboardComponent } from '../../lecturer_studentdashboard/lecturer_studentdashboard.component'
import { LecturerViewReportComponent } from '../../lecturer_viewreport/lecturer_viewreport.component'

import { PartnerIntershipNewsComponent } from '../../partner-intership-news/partner-intership-news.component';
import { PartnerViewstudentComponent } from '../../partner-viewstudent/partner-viewstudent.component';
import { PartnerNotificationsComponent } from '../../partner-notifications/partner-notifications.component';
import { PartnerMessageComponent } from '../../partner-message/partner-message.component';


import { ManagementStudentComponent } from '../../management-student/management-student.component';
import { ManagementLecturerComponent } from '../../management-lecturer/management-lecturer.component';
import { ManagementAdminComponent } from '../../management-admin/management-admin.component';
import { ManagementPartnerComponent } from '../../management-partner/management-partner.component';

// import { StudentActived } from '../../checkGuard'
// import { LecturerActived } from '../../checkGuard'
// import { PartnerActived } from '../../checkGuard'
// import { AdminActived } from '../../checkGuard'
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'message', component: MessageComponent },
    { path: 'internship', component: InternshipComponent },
    { path: 'report', component: ReportComponent },
    { path: 'lecturer_viewreport', component: LecturerViewReportComponent },
    { path: 'lecturer_viewstudent', component: LecturerViewStudentComponent },
    { path: 'lecturer_studentdashboard', component: LecturerStudentDashboardComponent },
    { path: 'partner_internship_news', component: PartnerIntershipNewsComponent },
    { path: 'partner_viewstudent', component: PartnerViewstudentComponent },
    { path: 'partner_notifications', component: PartnerNotificationsComponent },
    { path: 'partner_message', component: PartnerMessageComponent },
    { path: 'management-student', component: ManagementStudentComponent },
    { path: 'management-lecturer', component: ManagementLecturerComponent },
    { path: 'management-partner', component: ManagementPartnerComponent },
    { path: 'management-admin', component: ManagementAdminComponent },
];
