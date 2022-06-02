using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmlakApi.ViewModel
{
    public class UyeModel
    {
        public int UyeId { get; set; }
        public string UyeAd { get; set; }
        public string UyeSoyad { get; set; }
        public string UyeTelefon { get; set; }
        public string UyeMail { get; set; }
        public string UyeParola { get; set; }
        public Nullable<int> UyeYetki { get; set; }
        public Nullable<System.DateTime> UyeKayTar { get; set; }
    }
}