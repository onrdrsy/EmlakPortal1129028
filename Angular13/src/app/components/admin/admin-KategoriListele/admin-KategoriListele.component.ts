import { Kategori } from './../../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-admin-KategoriListele',
  templateUrl: './admin-KategoriListele.component.html',
  styleUrls: ['./admin-KategoriListele.component.css']
})
export class AdminKategoriListeleComponent implements OnInit {
  kategoriler? : Kategori[];
  displayedColumns = ['KatId','KatAdi', 'KatIlanSayisi', 'islemler'];
  dataSource : any;
  @ViewChild(MatSort) sort?:MatSort;
  @ViewChild(MatPaginator) paginator?:MatPaginator;
  
  dialogRef?:MatDialogRef<KategoriDialogComponent>;
  confirmDialogRef?: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog
    ) { }
    
  ngOnInit() {
    this.KategoriListele()
  }

KategoriListele() {
  this.apiServis.KategoriListe().subscribe((d : Kategori[] )=> {
    this.kategoriler = d;
    console.log(d);
   this.dataSource = new MatTableDataSource(this.kategoriler);
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
  var yeniKayit: Kategori = new Kategori();
  this.dialogRef=this.matDialog.open(KategoriDialogComponent, {
    width : '400px',
    data: {
      kayit : yeniKayit,
      islem: 'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=> {
    console.log(d);
    if (d) {
    this.apiServis.KategoriEkle(d).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem){
        this.KategoriListele();
      }
    });
  }
  });
}

Duzenle(kayit : Kategori){
  this.dialogRef=this.matDialog.open(KategoriDialogComponent, {
    width : '400px',
    data: {
      kayit : kayit,
      islem: 'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=> {
if(d){
    kayit.KatId= d.KatId;
    kayit.KatAdi= d.KatAdi;

    
    console.log(d);
    
    this.apiServis.KategoriDuzenle(d).subscribe((s : Sonuc) => {
      this.alert.AlertUygula(s);
    });
  }
  });
}
Sil(kayit: Kategori){
  this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
    width : '400px'
  });
  this.confirmDialogRef.componentInstance.dialogMesaj= kayit.KatAdi + " kategorisi silinecek. Onaylıyor musunuz?";
  this.confirmDialogRef.afterClosed().subscribe(d => {
    if (d){
      this.apiServis.KategoriSil(kayit.KatId).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem){
          this.KategoriListele();
        }
      });
    }
  })
}
}
