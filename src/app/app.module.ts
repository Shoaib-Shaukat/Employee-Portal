import { NgModule, Pipe } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ApiService } from './Services/API/api.service'
import { Auth } from './Services/Guard/guard.service'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChartsModule } from 'ng2-charts';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { PortalModule } from '@angular/cdk/portal';
import { PopoutService } from './Pages/Shared/Service/popout.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';
import {NgxPrintModule} from 'ngx-print';

import { NumberOnlyDirective } from './number-only.directive';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { IgxGridModule, IgxMaskModule, IgxComboModule, IgxDropDownModule, IgxSelectModule, IgxExpansionPanelModule, IgxCheckboxModule, IgxIconModule, IgxInputGroupModule, IgxButtonModule, IgxRippleModule, IgxDatePickerModule, IgxTimePickerModule } from "igniteui-angular";

// Material UI Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import ResizeObserver from 'resize-observer-polyfill'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CKEditorModule } from 'ckeditor4-angular';






import { LoginComponent } from './Pages/Login/login.component';
import { DashBoardComponent } from './Pages/DashBoard/dash-board.component';
import { LeftmenuComponent } from './Pages/Shared/LeftMenu/leftmenu.component';
import { TopbarComponent } from './Pages/Shared/TopBar/topbar.component';
import { LayoutComponent } from './Pages/Shared/Layout/layout.component';
import { AdminAreaComponent } from './Pages/AdminArea/admin-area.component';
import { RasLocationsComponent } from './Pages/AdminArea/RasLocations/ras-locations.component';
import { DepartmentsComponent } from './Pages/AdminArea/Departments/departments.component';
import { ExportComponent } from './Pages/Export/export.component';
import { TwoDigitDecimaNumberDirective } from './Pages/Directive/two-digit-decima-number.directive';
import { DecimalMaskDirective } from './decimal-mask.directive';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GroupRolesComponent } from './Pages/AdminArea/Roles/GroupRoles/group-roles.component';
import { ChangePasswordComponent } from './Pages/UserProfile/ChangePassword/change-password.component';
import { AssignGroupRolesComponent } from './Pages/AdminArea/Assign-Group-Roles/assign-group-roles.component';
import { SurveyComponent } from './Pages/AdminArea/survey/survey.component';
import { StatementsComponent } from './Pages/AdminArea/statements/statements.component';
import { AssignRolesComponent } from './Pages/AdminArea/Assign-Roles/assign-roles.component';
import { HRPageComponent } from './Pages/AdminArea/HR-Page/hr-page.component';
import { HRAdminPageComponent } from './Pages/UserProfile/HR-Admin-Page/hr-admin-page.component';
import { SearchEmployeeComponent } from './Pages/UserProfile/search-employee/search-employee.component';
import { AdminPageComponent } from './Pages/AdminArea/Admin-Page/admin-page.component';
import { FeedBackComponent } from './Pages/AdminArea/Feed-Back/feed-back.component';
import { EmployeeFormListComponent } from './Pages/AdminArea/ViewEmployeeForm/employee-form-list.component';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    LeftmenuComponent,
    TopbarComponent,
    LayoutComponent,
    AdminAreaComponent,
    RasLocationsComponent,
    DepartmentsComponent,
    ExportComponent,
    NumberOnlyDirective,
    TwoDigitDecimaNumberDirective,
    DecimalMaskDirective,
    GroupRolesComponent,
    ChangePasswordComponent,
    AssignRolesComponent,
    AssignGroupRolesComponent,
    SurveyComponent,
    StatementsComponent,
    HRPageComponent,
    HRAdminPageComponent,
    SearchEmployeeComponent,
    AdminPageComponent,
    FeedBackComponent,
    EmployeeFormListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    ChartsModule,
    NgxExtendedPdfViewerModule ,
    MatAutocompleteModule,
    MatIconModule,
    NgxPrintModule,
    PortalModule,
    IgxDatePickerModule,
    MatSelectModule,
    HammerModule,
    CKEditorModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxTimePickerModule,
    TimepickerModule.forRoot(),
    IgxCheckboxModule, IgxGridModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    PdfViewerModule,
    AutocompleteLibModule,
    IgxExpansionPanelModule, IgxComboModule, IgxDropDownModule, IgxSelectModule, IgxMaskModule
  ],
  providers: [DatePipe,ApiService, Auth, BnNgIdleService, { provide: LocationStrategy, useClass: HashLocationStrategy }, Pipe, PopoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
