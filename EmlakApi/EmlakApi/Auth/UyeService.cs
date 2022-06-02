using EmlakApi.Models;
using EmlakApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmlakApi.Auth
{
    public class UyeService
    {
        emlakDBEntities db = new emlakDBEntities();

    public UyeModel UyeOturumAc(string mail, string parola)
    {
        UyeModel uye = db.Uye.Where(s => s.UyeMail == mail && s.UyeParola == parola).Select(x => new UyeModel()
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
        return uye;
    }
}
}