import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MessageComponent } from '../../message/message.component';
import { InternshipComponent } from '../../internship/internship.component'
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

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    MessageComponent,
    InternshipComponent,
    ReportComponent,
    LecturerReportComponent,
    LecturerViewStudentComponent,
    LecturerStudentDashboardComponent,
    LecturerViewReportComponent,
    PartnerIntershipNewsComponent,
    PartnerViewstudentComponent,
    PartnerNotificationsComponent,
    PartnerMessageComponent,
    ManagementStudentComponent,
    ManagementLecturerComponent,
    ManagementAdminComponent,
    ManagementPartnerComponent
  ]
})

export class AdminLayoutModule { }
