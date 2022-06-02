import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/Uye-dialog/Uye-dialog.component';

@Component({
  selector: 'app-admin-UyeListele',
  templateUrl: './admin-UyeListele.component.html',
  styleUrls: ['./admin-UyeListele.component.css']
})
export class AdminUyeListeleComponent implements OnInit {
  uyeler? : Uye[];
  displayedColumns = ['UyeId','UyeAd', 'UyeSoyad', 'UyeMail','UyeTelefon', "UyeKayTar", 'islemler'];
  dataSource : any;
  @ViewChild(MatSort) sort?:MatSort;
  @ViewChild(MatPaginator) paginator?:MatPaginator;

  dialogRef?:MatDialogRef<UyeDialogComponent>;
  confirmDialogRef?: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.UyeListele();
  }


  UyeListele() {
    this.apiServis.UyeListe().subscribe((d : Uye[] )=> {
      this.uyeler = d;
      console.log(d);
      
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
  }

  Filtrele(e : any){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
  
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
  
    }
  }
  Ekle(){
    var yeniKayit: Uye = new Uye();
    this.dialogRef=this.matDialog.open(UyeDialogComponent, {
      width : '400px',
      data: {
        kayit : yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=> {
  
      console.log(d);
      if (d) {
       this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem){
          this.UyeListele();
        }
      });
    }
    });
  }

  Duzenle(kayit : Uye){
    this.dialogRef=this.matDialog.open(UyeDialogComponent, {
      width : '400px',
      data: {
        kayit : kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=> {
  if(d){
      kayit.UyeId= d.UyeId;

      console.log(d);
      
      this.apiServis.UyeDuzenle(d).subscribe((s : Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem){
          this.UyeListele();
        }
      });
    }
    });
  }
  Sil(kayit: Uye){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
      width : '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj= kayit.UyeAd + ""+kayit.UyeSoyad + " Uye silinecek. Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d){
        this.apiServis.UyeSil(kayit.UyeId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem){
            this.UyeListele();
          }
        });
      }
    })
  }
}
