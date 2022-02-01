

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace back.entities
{
    public class Prodavnica
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId Id { get; set; }

        public string Naziv { get; set; }

        public Adresa Adresa { get; set; }

        public List<string> TipoviProizvoda { get; set; }

        public string ZiroRacun { get; set; }
    }
}