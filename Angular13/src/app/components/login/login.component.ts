import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../dialogs/Uye-dialog/Uye-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dialogRef?:MatDialogRef<UyeDialogComponent>;
  confirmDialogRef?: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  OturumAc(mail:string, parola:string){
    this.apiServis.tokenAl(mail,parola).subscribe((d : any)=> {
     console.log(d);
      
      localStorage.setItem("token", d.access_token);
      localStorage.setItem("uyeId", d.uyeId);
      localStorage.setItem("uyeAd", d.uyeAd);
      localStorage.setItem("uyeMail", d.uyeMail);
      localStorage.setItem("uyeYetkileri", d.uyeYetkileri);

      location.href = "/"

    }, err => {
      var s : Sonuc = new Sonuc();
      s.islem=false;
      s.mesaj = "Geçersiz E-posta veya Parola!";
      this.alert.AlertUygula(s);
    });
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
      yeniKayit.UyeYetki = 0;
      console.log(d);
      if (d) {
       this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);

      });
    }
    });
  }

}
