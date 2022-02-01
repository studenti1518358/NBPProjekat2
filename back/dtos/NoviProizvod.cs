

using back.entities;
using System.Collections.Generic;

namespace back.dtos
{
    public class NoviProizvod
    {
       

        public string Naziv { get; set; }

        public double Cena { get; set; }

        // public int Kolicina { get; set; }

        public string Opis { get; set; }

        public string SlikaSrc { get; set; }

       

        public List<Velicina> Velicine { get; set; }

        public string Tip { get; set; }
    }
}
