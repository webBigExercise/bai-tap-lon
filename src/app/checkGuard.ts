import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { checkStudentLogined } from './checkLogin'
import { checkLecturerLogined } from './checkLogin'
import { checkPartnerLogined } from './checkLogin'
import { checkAdminLogined } from './checkLogin'

@Injectable()
export class StudentActived implements CanActivate {
    constructor() { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return checkStudentLogined();
    }
}

@Injectable()
export class LecturerActived implements CanActivate {
    constructor() { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return checkLecturerLogined();
    }
}

@Injectable()
export class PartnerActived implements CanActivate {
    constructor() { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return checkPartnerLogined();
    }
}


@Injectable()
export class AdminActived implements CanActivate {
    constructor() { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return checkAdminLogined();
    }
}
