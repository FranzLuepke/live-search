import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersTableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator ;
  @Input() users: User[] = [];
  @Input() noRegistersFound = false;
  @Output() queryUserDetails = new EventEmitter<string>();
  dataSource = new MatTableDataSource<User>([]);
  columnsToDisplay = [
    'consumerId',
    'firstName',
    'lastName',
    'email',
    // 'phone',
    'loyaltyID',
    'loyaltyTier',
    // 'addressLine',
  ];
  columnNames = [
    { key: 'consumerId', value: 'Consumer Id'},
    { key: 'firstName', value: 'First Name'},
    { key: 'lastName', value: 'Last Name'},
    { key: 'email', value: 'Email'},
    // { key: 'phone', value: 'Phone'},
    { key: 'loyaltyID', value: 'Loyalty ID'},
    { key: 'loyaltyTier', value: 'Loyalty Tier'},
    // { key: 'addressLine', value: 'Address Line'},
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: User | null = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.users;
  }

  ngAfterViewInit() {
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
  }

  getColumnName(key: string) {
    return this.columnNames.find((name) => name.key === key)?.value;
  }

  expandElement($event: MouseEvent, element: User) {
    console.log(element);
    this.expandedElement = this.expandedElement === element ? null : element;
    $event.stopPropagation()
    this.queryUserDetails.emit(element.id);
  }
}
