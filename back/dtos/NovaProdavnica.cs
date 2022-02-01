using back.entities;

namespace back.dtos
{
    public class NovaProdavnica
    {
        public string Naziv { get; set; }

        public Adresa Adresa { get; set; }

        public string ZiroRacun { get; set; }
    }
}