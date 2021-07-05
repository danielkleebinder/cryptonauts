import {InjectionToken} from '@angular/core';
import {environment} from '../../../environments/environment';
import Web3 from 'web3';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => new Web3(new Web3.providers.WebsocketProvider(environment.blockchainAddress))
});
