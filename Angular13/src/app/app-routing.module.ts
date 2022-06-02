import { AdminIlanListeleComponent } from './components/admin/admin-IlanListele/admin-IlanListele.component';
import { AdminUyeListeleComponent } from './components/admin/admin-UyeListele/admin-UyeListele.component';
import { AdminKategoriListeleComponent } from './components/admin/admin-KategoriListele/admin-KategoriListele.component';
import { LoginComponent } from './components/login/login.component';
import { IlanListeleComponent } from './components/IlanListele/IlanListele.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/AuthGuard';
import { IlanComponent } from './components/ilan/ilan.component';
import { UyeIlanComponent } from './components/UyeIlan/UyeIlan.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'kategoriler', component:KategoriComponent },

  /// Admin
  { path: 'admin/kategoriler', component:AdminKategoriListeleComponent, canActivate: [AuthGuard], data: { yetkiler: ['Admin'], gerigit: '/login'} },
  { path: 'admin/uyeler', component:AdminUyeListeleComponent, canActivate: [AuthGuard], data: { yetkiler: ['Admin'], gerigit: '/login'}},
  { path: 'admin/ilanlar', component:AdminIlanListeleComponent, canActivate: [AuthGuard], data: { yetkiler: ['Admin'], gerigit: '/login'} },
  { path: 'admin/ilanlar/:KatId', component:AdminIlanListeleComponent, canActivate: [AuthGuard], data: { yetkiler: ['Admin'], gerigit: '/login'} },
  /// İlan
  { path: 'ilanlarim', component:UyeIlanComponent},
  { path: 'ilanlar', component:IlanListeleComponent},
  { path: 'ilanlar/detay/:IlanId', component:IlanComponent},
  { path: 'ilanlar/:KatId', component:IlanListeleComponent },

  /// Uye
  { path: 'login', component:LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
