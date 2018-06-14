import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { InternshipComponent } from './internship/internship.component';
import { ReportComponent } from './report/report.component'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LecturerReportComponent } from './lecturer_report/lecturer_report.component'
import { LecturerViewReportComponent } from './lecturer_viewreport/lecturer_viewreport.component'
import { LecturerStudentDashboardComponent } from './lecturer_studentdashboard/lecturer_studentdashboard.component'
import { LecturerViewStudentComponent } from './lecturer_viewstudent/lecturer_viewstudent.component'

import { PartnerIntershipNewsComponent } from './partner-intership-news/partner-intership-news.component';
import { PartnerViewstudentComponent } from './partner-viewstudent/partner-viewstudent.component';
import { PartnerNotificationsComponent } from './partner-notifications/partner-notifications.component';
import { PartnerMessageComponent } from './partner-message/partner-message.component';

import { ManagementStudentComponent } from './management-student/management-student.component';
import { ManagementLecturerComponent } from './management-lecturer/management-lecturer.component';
import { ManagementAdminComponent } from './management-admin/management-admin.component';
import { ManagementPartnerComponent } from './management-partner/management-partner.component';

import {
  AgmCoreModule
} from '@agm/core';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
