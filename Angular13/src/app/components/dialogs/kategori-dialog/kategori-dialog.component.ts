
import { Kategori } from './../../../models/Kategori';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik?: string;
  islem?: string;
  frm!: FormGroup;
  yeniKayit?: Kategori;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild:  FormBuilder,
    public dialogRef: MatDialogRef<KategoriDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { 
    this.islem= data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem== 'ekle'){
      this.dialogBaslik = 'Kategori Ekle'
    }
    if (this.islem == 'duzenle'){
      this.dialogBaslik = 'Kategori Duzenle'
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }

FormOlustur(){
  return this.frmBuild.group({
    KatId:[this.yeniKayit?.KatId],
    KatAdi:[this.yeniKayit?.KatAdi]
  })
}

}
