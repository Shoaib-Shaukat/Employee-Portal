import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel, TokenRequestModel } from './Model/Users'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GvarService } from '../../Services/Globel/gvar.service';
import { ApiService } from '../../Services/API/api.service'
import { Locations } from './Model/locations'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../../Services/Auth/auth.service'
import { templateJitUrl } from '@angular/compiler';
import { retry } from 'rxjs/operators';
declare var jQuery: any;
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  TokenRequestModel: TokenRequestModel;
  validForm: boolean = false;
  isReadOnly = true;
  loginForm: FormGroup;
  loginViewModel: UserModel
  clicked = false;
  Locations: Locations[];
  InvalidLogin: boolean;
  errorMessage: string;
  Roles: any = [];
  returnUrl: string;
  constructor(private _el: ElementRef,
    public API: ApiService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private GV: GvarService,
    private authService: AuthService,

  ) {
    this.TokenRequestModel = new TokenRequestModel();
    this.loginViewModel = new UserModel();
    this.Locations = [];
  }
  ngOnInit() {

    setTimeout(() => {
      this.isReadOnly = false;
    }, 2000);
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
    //this.authService.Logout();
    this.InitializeForm();
    this.getLocations();
  }

  InitializeForm(): any {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]),
    });
  }

  onLoginClick() {
    this.validations();
    if (this.validForm == true) {
      if (this.loginForm.valid) {
        this.GV.locationID = 1;
        this.clicked = true;
        this.loginForm.disable({ emitEvent: true });
        this.TokenRequestModel.ClientId = "";
        this.TokenRequestModel.Grant_Type = "password";
        this.TokenRequestModel.Refresh_Token = "";
        this.TokenRequestModel.Username = this.loginForm.get('username').value
        this.TokenRequestModel.password = this.loginForm.get('password').value
        this.API.LoginUser('/api/Token/Auth', this.TokenRequestModel).subscribe(
          data => {
            if (data.Message == "NO") {
              Swal.fire('Employee-Portal', "Survey not activated, kindly contact HR Department", 'error')
              this.GV.G_IsRunning = false;
              this.InvalidLogin = true;
              this.clicked = false;
              this.loginForm.enable({ emitEvent: true });
              return;
            }
            if (data.Message == "Wrong Password") {
              Swal.fire('Employee-Portal', "Wrong User Name / Password", 'error')
              this.GV.G_IsRunning = false;
              this.InvalidLogin = true;
              this.clicked = false;
              this.loginForm.enable({ emitEvent: true });
              return;
            }
            localStorage.setItem('access_token', data.Access_Token);
            localStorage.setItem('userRoles', data.Roles);
            localStorage.setItem('hasRole', data.hasRole);
            localStorage.setItem('userName', data.empName);
            localStorage.setItem('empID', data.empID);
            localStorage.setItem('StationName', data.StationName);
            localStorage.setItem('isDefault', data.isDefault);
            this.route.navigate([this.returnUrl]);
          },
          error => {
            this.InvalidLogin = true;
            this.clicked = false;
            this.loginForm.enable({ emitEvent: true });
            if (error.error.Message != undefined) {
              Swal.fire('Employee-Portal', error.error.Message, 'error')
            }
            else {
              Swal.fire('Employee-Portal', 'Network Error.', 'error')
            }
          });
      }
    }
  }

  getLocations() {
    this.API.getdata('/Generic/getLocations').subscribe(data => {
      if (data != null) {
        this.Locations = data;
      }
    })
  }

  changeLocations(event) {

  }

  validations() {
    if (this.loginForm.controls.username.value == "" || this.loginForm.controls.username.value == null) {
      Swal.fire({
        text: "Enter Username",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    if (this.loginForm.controls.password.value == "" || this.loginForm.controls.password.value == null) {
      Swal.fire({
        text: "Enter Password",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    this.validForm = true;
  }
}


