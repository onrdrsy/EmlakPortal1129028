import { Kategori } from './../../models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  mail?: string | null;
  uyeAd?: string | null;
  kategoriler?:Kategori[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis:ApiService
    ) {}

    ngOnInit(): void {
      this.KategoriListele();
      if (this.apiServis.OturumKontrol()) {
          this.uyeAd = localStorage.getItem("uyeAd")
     
        }
    
    }

    OturumKapat(){
      localStorage.clear();
      location.href = "/login";
    }

    KategoriListele(){
this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
  this.kategoriler = d;
})
    }
}
