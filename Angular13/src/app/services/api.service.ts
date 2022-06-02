import { Ilan } from './../models/Ilan';
import { Kategori } from './../models/Kategori';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uye } from '../models/Uye';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl = "https://localhost:44332/api/"
constructor(
  public http: HttpClient
) { }
//// Oturum Açma Api

tokenAl(mail: string, parola:string){
  var data= 'username='+mail+'&password='+parola+'&grant_Type=password';
  var reqHeader = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});
  return this.http.post(this.apiUrl+"token",data,{headers:reqHeader})
}

OturumKontrol(){
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

YetkiKontrol(yetkiler: any[]){
  var sonuc: boolean = false;


  var uyeYetkiler: string[]=JSON.parse(localStorage.getItem('uyeYetkileri') || '{}');
  if (uyeYetkiler){
    yetkiler.forEach(element => {
      if (uyeYetkiler.indexOf(element) > -1) {
        sonuc=true;
        return false;
      }
      return sonuc;
    });
  }
  return sonuc;
}


//// İlan Api
IlanListele(){
  return this.http.get<Ilan[]>(this.apiUrl + "ilanliste")
}
IlanById(IlanId?:number){
  return this.http.get(this.apiUrl + "ilanbyid/"+IlanId)
}
IlanSonEklenenListe(s :number){
  return this.http.get<Ilan[]>(this.apiUrl + "ilansoneklenenliste/"+s)
}
IlanByUyeId(UyeId?:number){
  return this.http.get<Ilan[]>(this.apiUrl + "ilanbyuyeid/"+UyeId)
}
IlanByKategoriId(KatId?:number){
  return this.http.get<Ilan[]>(this.apiUrl + "ilanbykategoriid/"+KatId)
}
IlanEkle(ilan:Ilan){
  return this.http.post(this.apiUrl+"ilanekle",ilan)
}
IlanDuzenle(ilan:Ilan){
  return this.http.put(this.apiUrl+"ilanduzenle", ilan)
}
IlanSil(IlanId?:number){
  return this.http.delete(this.apiUrl+"ilansil/"+IlanId)
}

//// Kategori APi
KategoriListe(){
  return this.http.get<Kategori[]>(this.apiUrl+ "kategoriliste")
}
KategoriById(KatId?:number){
  return this.http.get(this.apiUrl+"kategoribyid/"+KatId)
}
KategoriEkle(kat:Kategori){
  return this.http.post(this.apiUrl+"kategoriekle", kat)
}
KategoriDuzenle(kat:Kategori){
  return this.http.put(this.apiUrl+"kategoriduzenle", kat)
}
KategoriSil(KatId?:number){
  return this.http.delete(this.apiUrl+"kategorisil/"+KatId)
}
//// Uye Api
UyeListe(){
  return this.http.get<Uye[]>(this.apiUrl+ "uyeliste")
}
UyeById(UyeId?:number){
  return this.http.get(this.apiUrl+"uyebyid/"+UyeId)
}
UyeEkle(uye:Uye){
  return this.http.post(this.apiUrl+"uyeekle", uye)
}
UyeDuzenle(uye:Uye){
  return this.http.put(this.apiUrl+"uyeduzenle", uye)
}
UyeSil(UyeId?:number){
  return this.http.delete(this.apiUrl+"uyesil/"+UyeId)
}

}
