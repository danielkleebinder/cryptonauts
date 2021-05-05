import {Inject, Injectable} from '@angular/core';
import Web3 from 'web3';

import {cryptoverseAbi} from '../abis';
import {WEB3} from '../tokens/web3.token';
import {BehaviorSubject, Observable} from 'rxjs';
import {Logger} from '../utils';
import {filter, switchMap} from 'rxjs/operators';
import {Topic} from './topic';


@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private readonly log = Logger.getLogger(BlockchainService);

  private cryptoverseContractAddress: string;
  private playerAddress: string;

  private cryptoverseContract;

  contractActive$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(WEB3) private web3: Web3) {
    this.cryptoverseContractAddress = localStorage.getItem('contract-address');
    this.playerAddress = localStorage.getItem('player-address');
    this.updateContract();
  }

  /**
   * Creates an observable for a specific topic (i.e. event).
   * @param topicNames Topic name (e.g. "Transfer(address,uint256)").
   */
  createTopicObservable(...topicNames: Topic[]): Observable<any> {
    // Have to convert the topics name to it's signature array
    const topicSignatures = topicNames
      .filter(topic => topic != null)
      .map(topic => topic.raw ? topic.name : this.web3.utils.keccak256(topic.name));

    // Beware that we always use the active contracts' address
    return this.contractActive$.pipe(
      filter(active => active),

      // Wrap the log subscription into an RxJS observable to use with NgRx
      switchMap(() => new Observable(subscriber => {
        const eventSubscription = this.web3.eth.subscribe('logs', {
          topics: topicSignatures
        }).on('data', data => {
          this.log.info(`Event (${topicNames}) data arrived:`, data);
          subscriber.next(data);
        });

        // Be careful to unsubscribe when the subscriber is no longer interested in this event.
        subscriber.add(() => eventSubscription.unsubscribe());
      }))
    );
  }

  setCryptoverseContractAddress(cryptoverseContractAddress: string): void {
    if (cryptoverseContractAddress?.startsWith('0x')) {
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
    if (playerAddress?.startsWith('0x')) {
      playerAddress = playerAddress.substr(2);
    }
    this.playerAddress = playerAddress;
    localStorage.setItem('player-address', playerAddress);
  }

  getPlayerAddress(): string {
    return this.playerAddress;
  }

  get player(): string {
    return '0x' + this.playerAddress;
  }

  get playerAddress256(): string {
    return '0x' + this.playerAddress.padStart(64, '0');
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
