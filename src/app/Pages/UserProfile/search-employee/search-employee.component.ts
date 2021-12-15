import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/API/api.service';
import { GvarService } from 'src/app/Services/Globel/gvar.service';
import Swal from 'sweetalert2';
import { empResponse } from './SearchEmployee.Model';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
  EmployeeCode: any;
  empResponse: empResponse;

  constructor(private API: ApiService, public GV: GvarService, private router: Router) {
    this.empResponse = new empResponse();
  }

  ngOnInit(): void {

  }

 
}
