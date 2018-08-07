import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../connect.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  name: string = "";
  type: string = "";

  constructor(private connect: ConnectService, public snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  //A, B, C analysis
  types: Array<any> = [
    {
      value: "A",
      viewValue: "A"
    },
    {
      value: "B",
      viewValue: "B"
    },
    {
      value: "C",
      viewValue: "C"
    }
  ]

  add() {
    if (this.name && this.type) {
      if (this.name != "" && this.type != "") {
        this.connect.addData(
          {
            name: this.name,
            type: this.type
          }
        ).subscribe((d) => {
          console.log(d)
          if (d.res) {
            this.openSnackBar("Successfully Sent!", "")
            this.name = "";
            this.type = "";
            setTimeout(() => {
              this.router.navigate(['/customers']);
            }, 500);
          }
        });
      } else {
        this.openSnackBar("Empty fields NOT allowed!", "");
      }
    } else {
      this.openSnackBar("Empty fields NOT allowed!", "");
    }
  }
}
