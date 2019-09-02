import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})

// CanActivate -> indicará se a rota poderá ser acessada/ativada
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService
            , private router: Router
            , private alertify: AlertifyService) {}

  // Observable<boolean> | Promise<boolean> | boolean -> indicam os possíveis tipos de retorno, "|" indica um "ou"
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
