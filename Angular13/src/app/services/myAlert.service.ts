import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
private alertDialogRef : MatDialogRef<AlertDialogComponent> | undefined;

constructor(
  private matDialog: MatDialog
) { }

AlertUygula(s: Sonuc) {
  var baslik = "";
  if (s.islem) {
    baslik = "Tamam";
  } else {
    baslik = "Hata";
  }
  this.alertDialogRef = this.matDialog.open(AlertDialogComponent, {
    width: "300px"
  });

  this.alertDialogRef.componentInstance.dialogBaslik = baslik;
  this.alertDialogRef.componentInstance.dialogMesaj = s.mesaj;
  this.alertDialogRef.componentInstance.dialogIslem = s.islem;
  this.alertDialogRef.afterClosed().subscribe(d => {
    this.alertDialogRef = null as any;
  });

}
}
