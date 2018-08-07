import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ConnectService } from '../../connect.service';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  searchName: string = "";
  LIST: Array<Element> = [];


  constructor(private connect: ConnectService) {

  }


  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.createTable();
  }

  dataSource;
  displayedColumns = [];
  @ViewChild(MatSort) sort: MatSort;


  columnNames = [
    //position id and value on the table
    {
      id: "_id", //has to match width the interface value
      value: "ID",
    },
    //Name id and value on the table
    {
      id: "name", //has to match width the interface value
      value: "Name",
    },
    //Type id and value on the table
    {
      id: "type", //has to match width the interface value
      value: "Type",
    },
    {
      id: "timestamp",
      value: "Time"
    },
  ];


  searchClear() {
    //create a new array
    let l = JSON.parse(JSON.stringify(this.LIST));
    this.dataSource = new MatTableDataSource(l);
    this.dataSource.sort = this.sort;
    return;
  } 

  search(searchName) {
    if (searchName) {
      //create a new array
      let l = JSON.parse(JSON.stringify(this.LIST));
      //if search name empty
      searchName = searchName.trim();
      if (searchName == "") {
        this.dataSource = new MatTableDataSource(l);
        this.dataSource.sort = this.sort;
        return;
      }
      //search
      searchName = searchName.toLowerCase();
      this.dataSource = l.filter((d) => {
        let name = d.name.toLowerCase();
        return name.includes(searchName)
      })
    }
  }

  createTable() {
    this.connect.getData().subscribe((d) => {
      console.log(d)
      let tableArr: Element[] = d;
      this.dataSource = new MatTableDataSource(tableArr);
      this.dataSource.sort = this.sort;
      //standard for search list
      this.LIST = tableArr;
    });
  }

}

export interface Element {
  _id: string,
  name: string,
  type: string,
  timestamp: string
}