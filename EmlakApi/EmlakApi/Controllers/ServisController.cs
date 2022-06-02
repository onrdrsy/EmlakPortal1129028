using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EmlakApi.Models;
using EmlakApi.ViewModel;

namespace EmlakApi.Controllers
{
    
    public class ServisController : ApiController
    {
        emlakDBEntities db = new emlakDBEntities();
        SonucModel sonuc = new SonucModel();
        DateTime now = DateTime.Now;


        #region ilan
        [HttpGet]
        [Route("api/ilanliste")]

        public List<IlanModel> IlanListe()

        {
            List<IlanModel> liste = db.Ilan.Select(x => new IlanModel()
            {
                IlanId = x.IlanId,
                IlanBaslik = x.IlanBaslik,
                IlanAdres = x.IlanAdres,
                IlanAciklama = x.IlanAciklama,
                IlanBulunankat = x.IlanBulunankat,
                IlanKatsayisi = x.IlanKatsayisi,
                IlanDurum = x.IlanDurum,
                IlanFiyat = x.IlanFiyat,
                IlanKatId = x.IlanKatId, // Kategori ID
                IlanKatAdi = x.Kategori.KatAdi, // Kategori Adı
                IlanOda = x.IlanOda,
                IlanM2 = x.IlanM2,
                IlanFoto = x.IlanFoto,
                IlanTarih = x.IlanTarih,
                IlanUyeId = x.IlanUyeId,
                IlanUyeAdi = x.Uye.UyeAd,
                IlanUyeTelefon = x.Uye.UyeTelefon

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/ilansoneklenenliste/{o}")]

        public List<IlanModel> IlanSonEklenenListe(int o)
        {
            List<IlanModel> liste = db.Ilan.OrderByDescending(s => s.IlanId).Take(o).Select(x => new IlanModel()
            {
                IlanId = x.IlanId,
                IlanBaslik = x.IlanBaslik,
                IlanAdres = x.IlanAdres,
                IlanAciklama = x.IlanAciklama,
                IlanBulunankat = x.IlanBulunankat,
                IlanKatsayisi = x.IlanKatsayisi,
                IlanDurum = x.IlanDurum,
                IlanFiyat = x.IlanFiyat,
                IlanKatId = x.IlanKatId, // Kategori ID
                IlanKatAdi = x.Kategori.KatAdi, // Kategori Adı
                IlanOda = x.IlanOda,
                IlanM2 = x.IlanM2,
                IlanFoto = x.IlanFoto,
                IlanTarih = x.IlanTarih,
                IlanUyeId = x.IlanUyeId,
                IlanUyeAdi = x.Uye.UyeAd,
                IlanUyeTelefon = x.Uye.UyeTelefon

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/ilanbyid/{IlanId}")]
        public IlanModel IlanByID(int IlanId)
        {
            IlanModel kayıt = db.Ilan.Where(s => s.IlanId == IlanId).Select(x => new IlanModel()
            {
                IlanId = x.IlanId,
                IlanBaslik = x.IlanBaslik,
                IlanAdres = x.IlanAdres,
                IlanAciklama = x.IlanAciklama,
                IlanBulunankat = x.IlanBulunankat,
                IlanKatsayisi = x.IlanKatsayisi,
                IlanDurum = x.IlanDurum,
                IlanFiyat = x.IlanFiyat,
                IlanKatId = x.IlanKatId, // Kategori ID
                IlanKatAdi = x.Kategori.KatAdi, // Kategori Adı
                IlanOda = x.IlanOda,
                IlanM2 = x.IlanM2,
                IlanFoto = x.IlanFoto,
                IlanTarih = x.IlanTarih,
                IlanUyeId = x.IlanUyeId,
                IlanUyeAdi = x.Uye.UyeAd,
                IlanUyeSoyadi = x.Uye.UyeSoyad,
                IlanUyeTelefon = x.Uye.UyeTelefon
            }).SingleOrDefault();
            return kayıt;
        }

        [HttpGet]
        [Route("api/ilanbyuyeid/{UyeId}")]
        public List<IlanModel> IlanByUyeId(int UyeId)
        {
            List<IlanModel> liste = db.Ilan.Where(s => s.IlanUyeId == UyeId).Select(x => new IlanModel()
            {
                IlanId = x.IlanId,
                IlanBaslik = x.IlanBaslik,
                IlanAdres = x.IlanAdres,
                IlanAciklama = x.IlanAciklama,
                IlanBulunankat = x.IlanBulunankat,
                IlanKatsayisi = x.IlanKatsayisi,
                IlanDurum = x.IlanDurum,
                IlanFiyat = x.IlanFiyat,
                IlanKatId = x.IlanKatId, // Kategori ID
                IlanKatAdi = x.Kategori.KatAdi, // Kategori Adı
                IlanOda = x.IlanOda,
                IlanM2 = x.IlanM2,
                IlanFoto = x.IlanFoto,
                IlanTarih = x.IlanTarih,
                IlanUyeId = x.IlanUyeId,
                IlanUyeAdi = x.Uye.UyeAd,
                IlanUyeTelefon = x.Uye.UyeTelefon
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/ilanbykategoriid/{KatId}")]
        public List<IlanModel> IlanByKategoriId(int KatId)
        {
            List<IlanModel> liste = db.Ilan.Where(s => s.IlanKatId == KatId).Select(x => new IlanModel()
            {
                IlanId = x.IlanId,
                IlanBaslik = x.IlanBaslik,
                IlanAdres = x.IlanAdres,
                IlanAciklama = x.IlanAciklama,
                IlanBulunankat = x.IlanBulunankat,
                IlanKatsayisi = x.IlanKatsayisi,
                IlanDurum = x.IlanDurum,
                IlanFiyat = x.IlanFiyat,
                IlanKatId = x.IlanKatId, // Kategori ID
                IlanKatAdi = x.Kategori.KatAdi, // Kategori Adı
                IlanOda = x.IlanOda,
                IlanM2 = x.IlanM2,
                IlanFoto = x.IlanFoto,
                IlanTarih = x.IlanTarih,
                IlanUyeId = x.IlanUyeId,
                IlanUyeAdi = x.Uye.UyeAd,
                IlanUyeTelefon = x.Uye.UyeTelefon
            }).ToList();
            return liste;
        }

        [HttpPost]
        [Route("api/ilanekle")]
        [Authorize]
        public SonucModel IlanEkle(IlanModel model)
        {
            Ilan yeni = new Ilan();
            yeni.IlanId = model.IlanId;
            yeni.IlanBaslik = model.IlanBaslik;
            yeni.IlanAdres = model.IlanAdres;
            yeni.IlanAciklama = model.IlanAciklama;
            yeni.IlanBulunankat = model.IlanBulunankat;
            yeni.IlanKatsayisi = model.IlanKatsayisi;
            yeni.IlanDurum = model.IlanDurum;
            yeni.IlanFiyat = model.IlanFiyat;
            yeni.IlanKatId = model.IlanKatId;
            yeni.IlanOda = model.IlanOda;
            yeni.IlanM2 = model.IlanM2;
            yeni.IlanFoto = model.IlanFoto;
            yeni.IlanTarih = now; // DateTime Tarih
            yeni.IlanUyeId = model.IlanUyeId;
            db.Ilan.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ilan eklendi";


            return sonuc;
        }
        [HttpPut]
        [Route("api/ilanduzenle")]
        
        public SonucModel IlanDuzenle(IlanModel model)
        {
            Ilan kayit = db.Ilan.Where(s => s.IlanId == model.IlanId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = " Ilan Bulunamadı";
                return sonuc;
            }

            kayit.IlanBaslik = model.IlanBaslik;
            kayit.IlanAdres = model.IlanAdres;
            kayit.IlanAciklama = model.IlanAciklama;
            kayit.IlanBulunankat = model.IlanBulunankat;
            kayit.IlanKatsayisi = model.IlanKatsayisi;
            kayit.IlanDurum = model.IlanDurum;
            kayit.IlanFiyat = model.IlanFiyat;
            kayit.IlanKatId = model.IlanKatId;
            kayit.IlanOda = model.IlanOda;
            kayit.IlanM2 = model.IlanM2;
            kayit.IlanFoto = model.IlanFoto;
            kayit.IlanTarih = now; // DateTime Tarih
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ilan Düzenlendi";


            return sonuc;
        }

        [HttpDelete]
        [Route("api/ilansil/{IlanId}")]
        public SonucModel IlanSil(int IlanId)
        {
            Ilan kayit = db.Ilan.Where(s => s.IlanId == IlanId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = " Ilan Bulunamadı";
                return sonuc;
            }

            db.Ilan.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ilan Silindi";

            return sonuc;
        }

        #endregion

        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]

        public List<KategoriModel> KategroiListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                KatId = x.KatId,
                KatAdi = x.KatAdi,
                KatIlanSayisi = x.Ilan.Count()

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{KatId}")]
        public KategoriModel KategoriById(int KatId)
        {
            KategoriModel kayıt = db.Kategori.Where(s => s.KatId == KatId).Select(x => new KategoriModel()
            {
                KatId = x.KatId,
                KatAdi = x.KatAdi,
                KatIlanSayisi = x.Ilan.Count()
            }).SingleOrDefault();
            return kayıt;
        }

        [HttpPost]
        [Route("api/kategoriekle")]

        public SonucModel Kategori(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.KatAdi == model.KatAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Zaten bu isimde bir kategori var";
                return sonuc;
            }

            Kategori yeni = new Kategori();

            yeni.KatAdi = model.KatAdi;

            db.Kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori eklendi";


            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.KatId == model.KatId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = " Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.KatAdi = model.KatAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{KatId}")]
        public SonucModel KategoriSil(int KatId)
        {
            Kategori kayit = db.Kategori.Where(s => s.KatId == KatId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = " Kayıt Bulunamadı";
                return sonuc;
            }

            if (db.Ilan.Count(s => s.IlanKatId == KatId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu kategoriye kayıtlı ilan olduğu için silinemez.";
                return sonuc;
            }

            db.Kategori.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";

            return sonuc;
        }
        #endregion

        #region Uye

        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                UyeAd = x.UyeAd,
                UyeSoyad = x.UyeSoyad,
                UyeTelefon = x.UyeTelefon,
                UyeMail = x.UyeMail,
                UyeParola = x.UyeParola,
                UyeYetki = x.UyeYetki,
                UyeKayTar = x.UyeKayTar
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{UyeId}")]
        public UyeModel UyeById(int UyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.UyeId == UyeId).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                UyeAd = x.UyeAd,
                UyeSoyad = x.UyeSoyad,
                UyeTelefon = x.UyeTelefon,
                UyeMail = x.UyeMail,
                UyeParola = x.UyeParola,
                UyeYetki = x.UyeYetki,
                UyeKayTar = x.UyeKayTar
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.UyeMail == model.UyeMail || s.UyeTelefon == model.UyeTelefon) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Zaten girdiğiniz bilgilere ait bir var";
                return sonuc;
            }
            Uye yeni = new Uye();
            yeni.UyeAd = model.UyeAd;
            yeni.UyeSoyad = model.UyeSoyad;
            yeni.UyeTelefon = model.UyeTelefon;
            yeni.UyeMail = model.UyeMail;
            yeni.UyeParola = model.UyeParola;
            yeni.UyeYetki = model.UyeYetki;
            yeni.UyeKayTar = now;
            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == model.UyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Bulunamadı";
                return sonuc;
            }
            kayit.UyeAd = model.UyeAd;
            kayit.UyeSoyad = model.UyeSoyad;
            kayit.UyeTelefon = model.UyeTelefon;
            kayit.UyeMail = model.UyeMail;
            kayit.UyeParola = model.UyeParola;
            kayit.UyeYetki = model.UyeYetki;
            kayit.UyeKayTar = now;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{UyeId}")]
        public SonucModel UyeSil(int UyeId)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == UyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Bulunamadı";
                return sonuc;
            }

            if (db.Ilan.Count(s => s.IlanUyeId == UyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu Üye'ye ait kayıtlı ilan olduğu için silinemez.";
                return sonuc;
            }

            db.Uye.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";

            return sonuc;
        }
        #endregion
    }
}