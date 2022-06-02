import { Ilan } from './../../../models/Ilan';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/Kategori';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-Ilan-dialog',
  templateUrl: './Ilan-dialog.component.html',
  styleUrls: ['./Ilan-dialog.component.css'],
  })
export class IlanDialogComponent implements OnInit {
 dialogBaslik?: string;
  islem?: string;
  frm!: FormGroup;
  yeniKayit?: Ilan;
  kategoriler?: Kategori[]; 

  htmlContent = '';  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Açıklama Giriniz...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

};
  iller = [
    'Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 
'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
  ];
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild:  FormBuilder,
    public dialogRef: MatDialogRef<IlanDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { 
    this.islem= data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem== 'ekle'){
      this.dialogBaslik = 'Ilan Ekle'
    }
    if (this.islem == 'duzenle'){
      this.dialogBaslik = ' Duzenle'
    }
    if (this.islem == 'detay'){
      this.dialogBaslik = ' İlan Detay'
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d : Kategori[] )=> {
      this.kategoriler = d;
      
    });
  }
FormOlustur(){
  return this.frmBuild.group({
    IlanId:[this.yeniKayit?.IlanId],
    IlanBaslik:[this.yeniKayit?.IlanBaslik],
    IlanAciklama:[this.yeniKayit?.IlanAciklama],
    IlanFoto:[this.yeniKayit?.IlanFoto],
    IlanFiyat:[this.yeniKayit?.IlanFiyat],
    IlanKatId:[this.yeniKayit?.IlanKatId],
    IlanOda:[this.yeniKayit?.IlanOda],
    IlanKatsayisi:[this.yeniKayit?.IlanKatsayisi],
    IlanBulunankat:[this.yeniKayit?.IlanBulunankat],
    IlanAdres:[this.yeniKayit?.IlanAdres],
    IlanM2:[this.yeniKayit?.IlanM2],
    IlanDurum:[this.yeniKayit?.IlanDurum],
    IlanTarih:[this.yeniKayit?.IlanTarih],
    //IlanFoto:[this.yeniKayit?.IlanFoto],
    //IlanUyeId:[this.yeniKayit?.IlanUyeId],
  })
}

}
