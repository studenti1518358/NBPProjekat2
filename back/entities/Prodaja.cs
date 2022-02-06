using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace back.entities
{
    public class Prodaja
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId Id { get; set; }

        public string NazivProizvoda { get; set; }

        public double CenaProizvoda { get; set; }

        public long DatumProdaje { get; set; }


    }
}
