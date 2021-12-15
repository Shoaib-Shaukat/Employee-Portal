import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Login/login.component';
import { LayoutComponent } from './Pages/Shared/Layout/layout.component'
import { Auth } from './Services/Guard/guard.service'
import { DashBoardComponent } from './Pages/DashBoard/dash-board.component';
import { AdminAreaComponent } from './Pages/AdminArea/admin-area.component';
import { GroupRolesComponent } from './Pages/AdminArea/Roles/GroupRoles/group-roles.component'
import { ChangePasswordComponent } from './Pages/UserProfile/ChangePassword/change-password.component'
import { AssignGroupRolesComponent } from './Pages/AdminArea/Assign-Group-Roles/assign-group-roles.component';
import { SurveyComponent } from './Pages/AdminArea/Survey/survey.component';
import { StatementsComponent } from './Pages/AdminArea/Statements/statements.component';
import { AssignRolesComponent } from './Pages/AdminArea/Assign-Roles/assign-roles.component';
import { HRPageComponent } from './Pages/AdminArea/HR-Page/hr-page.component';
import { HRAdminPageComponent } from './Pages/UserProfile/HR-Admin-Page/hr-admin-page.component';
import { SearchEmployeeComponent } from './Pages/UserProfile/Search-Employee/search-employee.component';
import { FeedBackComponent } from './Pages/AdminArea/Feed-Back/feed-back.component';
import { EmployeeFormListComponent } from './Pages/AdminArea/ViewEmployeeForm/employee-form-list.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent, canActivate: [Auth], children: [
      { path: 'Dashboard', component: DashBoardComponent },
      {
        path: 'Admin', component: AdminAreaComponent, children: [
          { path: 'AssignRoles', component: AssignRolesComponent },
          { path: 'AssignGroupRoles', component: AssignGroupRolesComponent },
          { path: 'Surveys', component: SurveyComponent },
          { path: 'Statements', component: StatementsComponent },
          { path: 'HRPage', component: HRPageComponent },
          { path: 'GroupRoles', component: GroupRolesComponent },
          { path: 'FeedBack', component: FeedBackComponent },
          { path: 'EmployeeFormList', component: EmployeeFormListComponent },
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'changePassword', component: ChangePasswordComponent, pathMatch: 'full' },
  { path: 'HRAdminPage', component: HRAdminPageComponent, pathMatch: 'full' },
  { path: 'SearchEmployee', component: SearchEmployeeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
