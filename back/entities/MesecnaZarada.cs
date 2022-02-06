using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace back.entities
{
    public class MesecnaZarada
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId Id { get; set; }

        public string Mesec { get; set; }

        public int Godina { get; set; }

        public List<Prodaja> Prodaje { get; set; }

    }
}