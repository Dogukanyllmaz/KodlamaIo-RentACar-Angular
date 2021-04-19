import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  user: UserModel;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  isLogOK() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    return localStorage.getItem('fullName');
  }

  logOut() {
    this.localStorageService.clean();
    this.toastr.info('Çıkış Yapıldı', 'Bilgi');
    setTimeout(function () {
      location.reload();
    }, 400);
  }
}
