import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private apiService: ApiService, private router: Router) {}

  canLoad(): Observable<boolean>{
    if (this.apiService.isAuthenticated) {
      return true;
    }

    )
  }
}
