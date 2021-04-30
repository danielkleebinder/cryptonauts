import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Auction} from './models';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionsComponent implements AfterViewInit {

  displayedColumns: string[] = ['itemId', 'itemName', 'price', 'actions'];
  auctions: Auction[] = [
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3},
    {itemId: '1', itemName: 'Shiny space rock', price: 3}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Auction>(this.auctions);

  /** @inheritDoc */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
