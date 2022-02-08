

namespace back.dtos
{
    public class NarudzbinaDetails
    {
         public string Id { get; set; }

        public string NazivProizvoda { get; set; }

        public double CenaProizvoda { get; set; }

       // public int Kolicina { get; set; }

        public string VelicinaProizvoda { get; set; }

        public bool Placena { get; set; }

        public string DatumPorudzbine { get; set; }
        public string DatumPlacanja { get; set; }

        public string EmailKupca{get;set;}
        public string KontaktKupca{get;set;}

    }
}