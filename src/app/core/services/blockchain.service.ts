import {Inject, Injectable} from '@angular/core';
import Web3 from 'web3';

import {cryptoverseAbi} from '../abis';
import {WEB3} from '../tokens/web3.token';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private cryptoverseContractAddress: string;
  private playerAddress: string;

  private cryptoverseContract;

  contractActive$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(WEB3) private web3: Web3) {
    this.cryptoverseContractAddress = localStorage.getItem('contract-address');
    this.playerAddress = localStorage.getItem('player-address');
    this.updateContract();
  }

  setCryptoverseContractAddress(cryptoverseContractAddress: string): void {
    if (cryptoverseContractAddress.startsWith('0x')) {
      cryptoverseContractAddress = cryptoverseContractAddress.substr(2);
    }
    this.cryptoverseContractAddress = cryptoverseContractAddress;
    localStorage.setItem('contract-address', cryptoverseContractAddress);
    this.updateContract();
  }

  getCryptoverseContractAddress(): string {
    return this.cryptoverseContractAddress;
  }

  setPlayerAddress(playerAddress: string): void {
    if (playerAddress.startsWith('0x')) {
      playerAddress = playerAddress.substr(2);
    }
    this.playerAddress = playerAddress;
    localStorage.setItem('player-address', playerAddress);
  }

  getPlayerAddress(): string {
    return this.playerAddress;
  }

  get player(): string {
    return this.playerAddress;
  }

  hasContract(): boolean {
    return this.getCryptoverseContract() != null;
  }

  getCryptoverseContract(): any {
    return this.cryptoverseContract;
  }

  get contract(): any {
    return this.cryptoverseContract;
  }

  isConnected(): Promise<boolean> {
    return this.web3.eth.net.isListening();
  }

  logout(): void {
    this.setCryptoverseContractAddress(null);
    this.setPlayerAddress(null);
    this.cryptoverseContract = null;
    this.contractActive$.next(false);
  }

  private updateContract(): void {
    if (this.cryptoverseContractAddress == null || this.cryptoverseContractAddress.length <= 0) {
      return;
    }
    this.cryptoverseContract = new this.web3.eth.Contract(
      cryptoverseAbi,
      this.cryptoverseContractAddress
    );
    this.contractActive$.next(true);
  }
}
