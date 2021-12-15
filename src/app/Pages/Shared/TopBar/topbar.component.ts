import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service'
import { Router } from '@angular/router';
import { ShareService } from '../../../Services/ShareService/share.service';
import { GvarService } from 'src/app/Services/Globel/gvar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  StationName: string = "";
  private setMini: boolean = false;
  UserName: any;
  EmpID: any;

  constructor(private authService: AuthService, private router: Router, private shared: ShareService, public GV: GvarService) { }

  ngOnInit(): void {
    this.StationName = localStorage.getItem('StationName');
    this.UserName = localStorage.getItem('userName');
    this.EmpID = localStorage.getItem('empID');
  }
  onClickLogout() {
    this.authService.Logout();
    this.router.navigateByUrl('/login');
  }

  toggleSidebar() {
    this.setMini = !this.setMini;
    if (this.setMini) {
      this.shared.setSidemenu(true);
    }
    else {
      this.shared.setSidemenu(false);
    }
  }

}
