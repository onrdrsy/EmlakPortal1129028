using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmlakApi.ViewModel
{
    public class IlanModel
    {
        public int IlanId { get; set; }
        public string IlanBaslik { get; set; }
        public string IlanAciklama { get; set; }
        public Nullable<decimal> IlanFiyat { get; set; }
        public string IlanOda { get; set; }
        public Nullable<int> IlanKatsayisi { get; set; }
        public Nullable<int> IlanBulunankat { get; set; }
        public string IlanAdres { get; set; }
        public string IlanDurum { get; set; }
        public string IlanFoto { get; set; }
        public Nullable<int> IlanUyeId { get; set; }
        public Nullable<int> IlanKatId { get; set; }
        public Nullable<System.DateTime> IlanTarih { get; set; }
        public Nullable<int> IlanM2 { get; set; }
        public string IlanKatAdi { get; set; }
        public string IlanUyeAdi { get; set; }
        public string IlanUyeSoyadi { get; set; }
        public string IlanUyeTelefon { get; set; }
        public int IlanSayisi { get; set; }
    }
}