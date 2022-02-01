

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace back.entities
{
    public class Proizvod
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId Id { get; set; }

        public string Naziv { get; set; }

        public double Cena { get; set; }

       // public int Kolicina { get; set; }

        public string Opis { get; set; }

        public string SlikaSrc { get; set; }

        public double Ocena { get; set; }

        public int BrojGlasova { get; set; }

        public List<Velicina> Velicine { get; set; }

        public string Tip { get; set; }
    }
}
