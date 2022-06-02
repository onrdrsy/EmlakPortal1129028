import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-Uye-dialog',
  templateUrl: './Uye-dialog.component.html',
  styleUrls: ['./Uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik?: string;
  islem?: string;
  frm!: FormGroup;
  yeniKayit?: Uye;
  hide = true;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild:  FormBuilder,
    public dialogRef: MatDialogRef<UyeDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { 
    this.islem= data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem== 'ekle'){
      this.dialogBaslik = 'Üye Ekle'
    }
    if (this.islem == 'duzenle'){
      this.dialogBaslik = ' Duzenle'
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
    
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Geçerli bir mail adresi girin' : '';
  }

FormOlustur(){
  return this.frmBuild.group({
    UyeId:[this.yeniKayit?.UyeId],
    UyeAd:[this.yeniKayit?.UyeAd],
    UyeSoyad:[this.yeniKayit?.UyeSoyad],
    UyeTelefon:[this.yeniKayit?.UyeTelefon],
    UyeMail:[this.yeniKayit?.UyeMail],
    UyeParola:[this.yeniKayit?.UyeParola],
    UyeYetki:[this.yeniKayit?.UyeYetki],
    UyeKayTar:[this.yeniKayit?.UyeKayTar],

  })
}

}
