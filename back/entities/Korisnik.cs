using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace back.entities
{
    public class Korisnik
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId Id { get; set; }

        public string Ime { get; set; }

        public string Prezime { get; set; }

        public string Mail { get; set; }

        public string Lozinka { get; set; }

        public string BrojTelefona { get; set; }

        public string Status { get; set; }

        public Adresa Adresa { get; set; }

    }
}