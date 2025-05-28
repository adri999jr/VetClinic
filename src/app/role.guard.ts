// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';




interface JwtPayload {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
     const decoded = (jwt_decode as any)(token) as JwtPayload;

      const userRole = decoded.role;

      // Roles permitidos en esta ruta (pasados en data.roles)
      const allowedRoles = route.data['roles'] as Array<string>;

      if (allowedRoles.includes(userRole)) {
        return true;
      } else {
        // No autorizado para este rol
        this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      // Token inválido
      this.router.navigate(['/login']);
      return false;
    }
  }
}