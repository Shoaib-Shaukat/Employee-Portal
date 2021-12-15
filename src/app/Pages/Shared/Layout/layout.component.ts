import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { GvarService } from '../../../Services/Globel/gvar.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public router: Router, public Gvars: GvarService, private cdref: ChangeDetectorRef) {

    var check = localStorage.getItem('hasRole');
    if (check == 'true') {
      router.navigate(['/Dashboard']);
    }
    else {
      router.navigate(['/Admin/HRPage']);
    }
  }

  ngOnInit(): void {
    var isDefault = localStorage.getItem('isDefault');
    if (isDefault == "true") {
      this.router.navigate(['/changePassword']);
    }

  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
