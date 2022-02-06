namespace back.dtos
{
    public class ProizvodiPretraga
    {
        public string TipProizvoda { get; set; }

        public int BrojStranice { get; set; }

        public int BrProizvodaPoStranici { get; set; }

        public int MinCena { get; set; }

        public int MaxCena { get; set; }
    }
}