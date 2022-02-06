using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System.Text.Json.Serialization;

namespace back.entities
{
    public class Narudzbina
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId Id { get; set; }

        public string NazivProizvoda { get; set; }

        public double CenaProizvoda { get; set; }

       // public int Kolicina { get; set; }

        public string VelicinaProizvoda { get; set; }

        public bool Placena { get; set; }

        public long DatumPorudzbine { get; set; }
        public long DatumPlacanja { get; set; }

        [JsonIgnore]
       public MongoDBRef KupacRef { get; set; }
    }
}