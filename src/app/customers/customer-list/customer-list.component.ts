import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';
import { ConnectService } from '../../connect.service';
import * as d3 from "d3";
import { createLViewData } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  searchName: string = "";
  LIST: Array<Element> = [];
  nodes_data: Array<any> = [];
  links_data: Array<any> = [];


  //sizes
  width: number = 500;
  height: number = 300;
  group: any = null;
  link: any = null;


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



  d3_graph() {
    //svg: simulate graph
    let svg = d3.select('.chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    //add forces
    this.graph(20);
    //show result
    setTimeout(() => {
      d3.selectAll('g').remove()
      this.graph()
    }, 1500);
  }

  graph(strength:number=-10) {
    let simulation = d3.forceSimulation(this.nodes_data)
    simulation
      .force("charge_force", d3.forceManyBody().strength(strength))
      .force("center_force", d3.forceCenter(this.width / 2, this.height / 2.4))
      .force("links", d3.forceLink(this.links_data)
        .id((d) => {
          return d._id;
        }
        ))
      //update circle positions to reflect node updates on each tick of the simulation 
      .on("tick", _ => this.tick());

    //create nodes
    this.createCircle();
    //create Links
    this.createLinks();
    return simulation;
  }

  getIds(myArr) {
    let r = [];
    for (let a of myArr) {
      r.push(JSON.parse(JSON.stringify({ _id: a._id, type: a.type })))
    }
    return r;
  }

  create_d3_data() {
    let nl = JSON.parse(JSON.stringify(this.LIST))
    //nodes
    // this.nodes_data = [{type: "A"}, {type: "B"}, {type: "C"}];
    this.nodes_data = this.getIds(nl);
    //links
    this.links_data = nl.filter((d) => {
      for (let nlObj of nl) {
        //A -> B, C
        if (d.type == "A" && nlObj.type != "B" && nlObj.type != "C") {
          d.source = nlObj._id;
          d.target = d._id;
          return true;
        }
        //B -> A, C
        if (d.type == "B" && nlObj.type != "A" && nlObj.type != "C") {
          d.source = nlObj._id;
          d.target = d._id;
          return true;
        }
        //C -> A, B
        if (d.type == "C" && nlObj.type != "B" && nlObj.type != "A") {
          d.source = nlObj._id;
          d.target = d._id;
          return true;
        }
      }
    });
    //create graph
    this.d3_graph();
  }


  tick() {
    //nodes
    this.group
      .attr("cx", (d) => { return d.x; })
      .attr("cy", (d) => { return d.y; });
    //links
    this.link
      .attr("x1", (d) => { return d.source.x; })
      .attr("y1", (d) => { return d.source.y; })
      .attr("x2", (d) => { return d.target.x; })
      .attr("y2", (d) => { return d.target.y; });
  }




  createLinks() {
    this.link = d3.select('svg').append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.links_data)
      .enter().append("line")
      .attr("stroke-width", (d) => {
        return 2;
      })
      .style("stroke", this.linkColour);
  }

  createCircle() {
    //draw circles for the nodes 
    this.group = d3.select('svg').append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(this.nodes_data)
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("fill", this.circleColour)
  }


  linkColour(d) {
    if (d.type == "A") {
      return "lightgreen";
    } else if (d.type == "B") {
      return "lightblue";
    } else if (d.type == "C") {
      return "lightred";
    }
  }
  circleColour(d) {
    if (d.type == "A") {
      return "rgb(6, 184, 21)";
    } else if (d.type == "B") {
      return "rgb(12, 166, 226)";
    } else if (d.type == "C") {
      return "red";
    }
  }


  createTable() {
    this.connect.getData().subscribe((d) => {
      if (d) {
        let tableArr: Element[] = d;
        this.dataSource = new MatTableDataSource(tableArr);
        this.dataSource.sort = this.sort;
        //standard for search list
        this.LIST = tableArr;
        //create data
        this.create_d3_data();
      }
    });
  }
}

export interface Element {
  _id: string,
  name: string,
  type: string,
  timestamp: string
}