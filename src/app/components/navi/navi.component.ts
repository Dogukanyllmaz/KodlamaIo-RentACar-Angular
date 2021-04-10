import { Component, OnInit } from '@angular/core';
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
  claims: OperationClaim[];
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {}
  Authenticated: boolean;
  ngOnInit(): void {
    this.isAuthenticated();
    this.getByUserId();
    this.getClaims();
  }
  getClaims() {
    this.userService
      .getUserClaims(Number(this.localStorageService.get('userId')))
      .subscribe((response) => {
        this.claims = response.data;
      });
  }
  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.Authenticated = true;
    } else {
      this.Authenticated = false;
    }
  }

  getByUserId() {
    this.userService
      .getUserByUserId(Number(this.localStorageService.get('userId')))
      .subscribe((response) => {
        this.user = response.data;
      });
  }

  logOut() {
    this.localStorageService.clean();
    this.toastrService.info('Çıkış Yapıldı', 'Bilgi');
    setTimeout(function () {
      location.reload();
    }, 400);
  }
}
