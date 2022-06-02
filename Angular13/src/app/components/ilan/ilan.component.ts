import { Router } from '@angular/router';
import { Ilan } from './../../models/Ilan';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { IlanDialogComponent } from '../dialogs/Ilan-dialog/Ilan-dialog.component';



@Component({
  selector: 'app-ilan',
  templateUrl: './ilan.component.html',
  styleUrls: ['./ilan.component.css']
})
export class IlanComponent implements OnInit {
IlanId?:number;
ilan?:Ilan;
uyeId?: string | null;
displayedColumns = [];
dataSource : any;

dialogRef?:MatDialogRef<IlanDialogComponent>;
confirmDialogRef?: MatDialogRef<ConfirmDialogComponent>


constructor(
  public apiServis:ApiService,
  public alert:MyAlertService,
  public matDialog:MatDialog,
  public route:ActivatedRoute,
  public router:Router

  ) { }

  ngOnInit() {
    if (this.apiServis.OturumKontrol()) {
      this.uyeId = localStorage.getItem("uyeId")
 
    }
    this.route.params.subscribe(p=> {
      if (p['IlanId']){
        this.IlanId=p['IlanId'];
        this.IlanById();
      }
    })
  }
IlanById(){
  this.apiServis.IlanById(this.IlanId).subscribe((d : Ilan)=>{
    this.ilan = d;
   
  });
}


}
