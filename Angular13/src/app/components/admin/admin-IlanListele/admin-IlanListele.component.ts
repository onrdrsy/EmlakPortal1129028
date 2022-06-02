import { ActivatedRoute } from '@angular/router';
import { Ilan } from './../../../models/Ilan';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { IlanDialogComponent } from '../../dialogs/Ilan-dialog/Ilan-dialog.component';

@Component({
  selector: 'app-admin-IlanListele',
  templateUrl: './admin-IlanListele.component.html',
  styleUrls: ['./admin-IlanListele.component.css']
})
export class AdminIlanListeleComponent implements OnInit {
  secKat?: Kategori;
  ilanlar?: Ilan[];
  kategoriler?: Kategori[]; 
  katId?:number;
  IlanUyeId?:number;
  
  displayedColumns = ['IlanFoto', 'IlanKatAdi', 'IlanDurum','IlanBaslik', 'IlanAdres', 'IlanFiyat', 'IlanUyeAdi', 'Islemler'];
  dataSource : any;
  @ViewChild(MatSort) sort?:MatSort;
  @ViewChild(MatPaginator) paginator?:MatPaginator;
  
  dialogRef?:MatDialogRef<IlanDialogComponent>;
  confirmDialogRef?: MatDialogRef<ConfirmDialogComponent>

  KatId?: number;
  
  
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog,
    public route:ActivatedRoute
    ) { }
    
  ngOnInit() {
    
    this.KategoriListele();
    this.IlanListele();
    this.IlanUyeId = parseInt(localStorage.getItem("uyeId") || "");
    this.route.params.subscribe(p => {
      if (p['KatId']){
        this.KategoriById();
        this.KatId = p['KatId']   
    }
    });
  }

KategoriSec(kat : Kategori){
  this.KatId=kat.KatId;
  this.IlanByKategoriListele();
  console.log("Seçilen Kategori"+ kat.KatId);
  console.log("Seçilen Kategori"+ this.KatId);
  
 // return this.KatId = kat.KatId;
}

IlanListele() {
  this.apiServis.IlanListele().subscribe((d : Ilan[] ) => {
    this.ilanlar = d;
    console.log(d);
   this.dataSource = new MatTableDataSource(this.ilanlar);
   this.dataSource.sort=this.sort;
   this.dataSource.paginator = this.paginator;
    
  });
}

IlanByKategoriListele() {

  console.log("Kategori id "+this.KatId);
  
  
  this.apiServis.IlanByKategoriId(this.KatId).subscribe((d : Ilan[] )=> {
    this.ilanlar = d;
    console.log(d);
   this.dataSource = new MatTableDataSource(d);
   this.dataSource.sort=this.sort;
   this.dataSource.paginator = this.paginator;


  });
}

KategoriListele() {
  this.apiServis.KategoriListe().subscribe((d : Kategori[] )=> {
    this.kategoriler = d;
    
  });
}

KategoriById(){
  this.apiServis.KategoriById(this.KatId).subscribe((d: Kategori) => {
  this.secKat = d;
  this.IlanByKategoriListele();
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
  var yeniKayit: Ilan = new Ilan();
  this.dialogRef=this.matDialog.open(IlanDialogComponent, {
    width : '800px',
    data: {
      kayit : yeniKayit,
      islem: 'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=> {

    //console.log(d);
    if (d) {
      yeniKayit = d;
      yeniKayit.IlanUyeId = this.IlanUyeId
    this.apiServis.IlanEkle(yeniKayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem){
        this.IlanListele();
      }
    });
  }
  });
}

Duzenle(kayit : Ilan){
  this.dialogRef=this.matDialog.open(IlanDialogComponent, {
    width : '800px',
    data: {
      kayit : kayit,
      islem: 'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=> {
if(d){
    kayit.IlanId= d.IlanId;
    kayit.IlanBaslik= d.IlanBaslik;

    
    console.log(d);
    
    this.apiServis.IlanDuzenle(d).subscribe((s : Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem){
        this.IlanListele();
      }
    });
  }
  });
}
Sil(kayit: Ilan){
  this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
    width : '400px'
  });
  this.confirmDialogRef.componentInstance.dialogMesaj= kayit.IlanBaslik + " Başlıklı ilan silinecek. Onaylıyor musunuz?";
  this.confirmDialogRef.afterClosed().subscribe(d => {
    if (d){
      this.apiServis.IlanSil(kayit.IlanId).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem){
          this.IlanListele();
        }
      });
    }
  })
}
}
