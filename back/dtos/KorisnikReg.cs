
using back.entities;

namespace back.dtos
{
    public class KorisnikReg
    {
        public string Ime { get; set; }

        public string Prezime { get; set; }

        public string Mail { get; set; }

        public string Lozinka { get; set; }

        public string BrojTelefona { get; set; }

        public string Status { get; set; }

        public Adresa Adresa { get; set; }
    }
}