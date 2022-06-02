import { Ilan } from './../../models/Ilan';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent> | undefined;
  ilanlar?: Ilan[];
    
  displayedColumns = ['IlanFoto', 'IlanKatAdi', 'IlanDurum','IlanBaslik', 'IlanM2', 'IlanOda', 'IlanFiyat', 'IlanAdres', 'IlanTarih'];
  dataSource : any;
constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog
  ) { } 

  ngOnInit() {
    this.SonEklenenIlanlar();
  }

  SonEklenenIlanlar(){
    this.apiServis.IlanSonEklenenListe(5).subscribe((d: Ilan[]) => {
      this.ilanlar = d;
      this.dataSource = new MatTableDataSource(this.ilanlar);
      console.log(d);
    })
  }
}
