
import { UyeIlanComponent } from './components/UyeIlan/UyeIlan.component';
import { AuthGuard } from './services/AuthGuard';
import { UyeDialogComponent } from './components/dialogs/Uye-dialog/Uye-dialog.component';
import { AuthInterceptor } from './services/AuthInterceptor.service';
import { ApiService } from 'src/app/services/api.service';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { IlanDialogComponent } from './components/dialogs/Ilan-dialog/Ilan-dialog.component';
import { AdminIlanListeleComponent } from './components/admin/admin-IlanListele/admin-IlanListele.component';
import { AdminUyeListeleComponent } from './components/admin/admin-UyeListele/admin-UyeListele.component';
import { AdminKategoriListeleComponent } from './components/admin/admin-KategoriListele/admin-KategoriListele.component';
import { LoginComponent } from './components/login/login.component';
import { IlanListeleComponent } from './components/IlanListele/IlanListele.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { IlanComponent } from './components/ilan/ilan.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MyAlertService } from './services/myAlert.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    KategoriComponent,
    IlanComponent,
    IlanListeleComponent,
    LoginComponent,
    UyeIlanComponent,
    // Admin
    AdminKategoriListeleComponent,
    AdminUyeListeleComponent,
    AdminIlanListeleComponent,
    AdminUyeListeleComponent,

    // Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    IlanDialogComponent,
    UyeDialogComponent,
    SafeHTMLPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule
    

  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    IlanDialogComponent,
    UyeDialogComponent
  ],
  providers: [MyAlertService, ApiService, SafeHTMLPipe, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
