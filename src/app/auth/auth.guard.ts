import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BlockchainService} from '../core/services/blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private blockchain: BlockchainService,
              private router: Router) {
  }

  /** @inheritDoc */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.blockchain.hasContract()) {
      return this.router.navigate(['/auth']);
    }
    return this.blockchain.contractActive$;
  }
}
