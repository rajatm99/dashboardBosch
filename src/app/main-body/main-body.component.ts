import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit {

  constructor(db : AngularFireDatabase) {
    db.list('/customers').snapshotChanges().forEach(snapshot =>{
      console.log(snapshot);
    });
   }

  ngOnInit(): void {
  }

}
