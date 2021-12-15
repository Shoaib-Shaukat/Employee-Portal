import { Injectable } from '@angular/core';
import { CurrentUserViewModel } from '../../Pages/Login/Model/Users'
import { environment } from '../../../environments/environment';
import { RolesRequestModel } from '../../Pages/Shared/SharedModel/Roles'
@Injectable({
  providedIn: 'root'
})
export class GvarService {
  GoodsCallFrom: string;
  private Roles: RolesRequestModel[]
  G_IsRunning: boolean = false;
  locationID: number;
  userName: string;
  UserId: string;
  currentUser: CurrentUserViewModel;
  serverURL: string = environment.serverURL;
  serverURLLogin: string = environment.serverURLLogin;
  constructor() {
    this.userName = (localStorage.getItem('userName'));
    this.UserId = (localStorage.getItem('UserId'));
  }
  roleMatch(allowedRoles): boolean {
    var temp = (localStorage.getItem('userRoles'));
    if (temp == "undefined") {
      return false
    }
    this.Roles = JSON.parse(localStorage.getItem('userRoles'));

    for (var i = 0; i < this.Roles.length; i++) {
      var checkRole = this.Roles[i].RoleId
      if (allowedRoles == this.Roles[i].RoleId) {
        return true
      }
    }
    return false
  }
  get canAssignRoles() {
    return this.roleMatch(3);
  }
  get canCreateSurvey() {
    return this.roleMatch(4);
  }
  get canCreateStatements() {
    return this.roleMatch(5);
  }
  get canCreateQuestion() {
    return this.roleMatch(6);
  }
  get canCreateFeedBack() {
    return this.roleMatch(7);
  }
  get canActivateSurvey() {
    return this.roleMatch(8);
  }
  get canResetPassword() {
    return this.roleMatch(9);
  }
  get canViewDashBoard() {
    return this.roleMatch(10);
  }
  get viewReports() {
    return this.roleMatch(11);
  }
}
