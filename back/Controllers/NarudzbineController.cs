using back.dtos;
using back.entities;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NarudzbineController:ControllerBase
    {
        public NarudzbineController()
        {

        }

        [HttpPost]
        [Route("naruciProizvod")]
        public async Task<IActionResult> NaruciProizvod([FromBody] NarudzbinaDto narudzbina)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");
            var proizvodi = db.GetCollection<Proizvod>("proizvodi");
            //ukoliko ne postoji proizvod sa navedenim nazivom u bazi, takav proizvod se ne moze naruciti
            var proizvod = await proizvodi.Find(x => x.Naziv == narudzbina.NazivProizvoda).FirstOrDefaultAsync();
            if (proizvod == null)
                return BadRequest("Proizvod koji zelite da narucite ne postoji!");
            //ukoliko navedena velicina proizvoda ne postoji ili je preostalo nula komada te velicine, narudzbina nije validna
            if (proizvod.Velicine.Find(x => x.Naziv == narudzbina.VelicinaProizvoda) == null || proizvod.Velicine.Find(x => x.Naziv == narudzbina.VelicinaProizvoda).Kolicina == 0)
                return BadRequest("Ne mose se naructi ova velicina!");

            var kupacId = await db.GetCollection<Korisnik>("korisnici").Find(x => x.Mail == narudzbina.MailKupca).Project(x => x.Id).FirstOrDefaultAsync();
            //ako kupac sa mejlom navedenim u porudzbini ne postoji, porudzbina je nevalidna
            if (kupacId == MongoDB.Bson.ObjectId.Empty)
                return BadRequest("Kupac sa navedenim mejlom ne postoji!");
            var narudzbine = db.GetCollection<Narudzbina>("narudzbine");
            //kreiranje nove narudzbine i dodavanje u bazu
            Narudzbina novaNarudzbina = new Narudzbina { CenaProizvoda =proizvod.Cena, NazivProizvoda = narudzbina.NazivProizvoda, Placena = false, DatumPlacanja = -1, VelicinaProizvoda = narudzbina.VelicinaProizvoda, DatumPorudzbine = DateTime.Now.Ticks, KupacRef = new MongoDBRef("korisnici", kupacId) };
            await narudzbine.InsertOneAsync(novaNarudzbina);
            //proizvodu koji je narucen se azuriraju velicine, tako sto se kolicina velicine koja je narucena umanji za 1
            var velicine = new List<Velicina>();
            velicine.AddRange(proizvod.Velicine);
            var velicina = velicine.Find(x => x.Naziv == narudzbina.VelicinaProizvoda);
            velicina.Kolicina--;
            var update = Builders<Proizvod>.Update.Set("Velicine", velicine);
            await proizvodi.UpdateOneAsync(x => x.Naziv == narudzbina.NazivProizvoda, update);
            return Ok("Proizvod uspesno porucen");
          
        }

        [HttpGet]
        [Route("vidiKorpu/{korisnikMail}")]
        public async Task<IActionResult> VratiNarudzbineKupca(string korisnikMail)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");
            var kupacId = await db.GetCollection<Korisnik>("korisnici").Find(x => x.Mail == korisnikMail).Project(x => x.Id).FirstOrDefaultAsync();
            if (kupacId == MongoDB.Bson.ObjectId.Empty)
                return BadRequest("Kupac sa navedenim mejlom ne postoji!");
            var narudzbine =  db.GetCollection<Narudzbina>("narudzbine");
            var narudzbineKupca = await narudzbine.Find(x => x.KupacRef == new MongoDBRef("korisnici", kupacId)).Project(x=>new { x.NazivProizvoda,x.Placena,x.VelicinaProizvoda,id=x.Id.ToString(),datumPlacanja=x.DatumPlacanja!=-1?new DateTime(x.DatumPlacanja).ToString():"",datumPorudzbine=new DateTime(x.DatumPorudzbine).ToString(),x.CenaProizvoda}).ToListAsync();
            narudzbineKupca.Reverse();
            return Ok(narudzbineKupca);
        }

        [HttpPost]
        [Route("oznaciPorudzbinuKaoPlacenu/{narudzbinaId}")]
        public async Task<IActionResult> OznaciPorudzbinuKaoPlacenu(string narudzbinaId)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");
            var narudzbine = db.GetCollection<Narudzbina>("narudzbine");
            var narId = ObjectId.Parse(narudzbinaId);
            var narudzbina = await narudzbine.Find(x => x.Id == narId).FirstOrDefaultAsync();
            if (narudzbina == null)
                return BadRequest("Ne postoji ovakva narudzbina!");
            if (narudzbina.Placena == true)
                return BadRequest("Ova porudzbina je vec placena");
            narudzbina.Placena = true;
            narudzbina.DatumPlacanja = DateTime.Now.Ticks;
            await narudzbine.ReplaceOneAsync(x => x.Id == narId, narudzbina);
            var prodaja = new Prodaja { CenaProizvoda = narudzbina.CenaProizvoda, DatumProdaje = narudzbina.DatumPlacanja, NazivProizvoda = narudzbina.NazivProizvoda };
            var prodaje = db.GetCollection<Prodaja>("prodaje");
            await prodaje.InsertOneAsync(prodaja);
          
            return Ok("Sve ok");

        }
		[HttpDelete]
		[Route("otkaziPorudzbinu/{narudzbinaId}")]
		public async Task<IActionResult> OtkaziPorudzbinu(string narudzbinaId)
		{
			var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");
            var narudzbine = db.GetCollection<Narudzbina>("narudzbine");
			 var narId = ObjectId.Parse(narudzbinaId);
			  var narudzbina = await narudzbine.Find(x => x.Id == narId).FirstOrDefaultAsync();
            if (narudzbina == null)
                return BadRequest("Ne postoji ovakva narudzbina!");
            if (narudzbina.Placena == true)
                return BadRequest("Ne mozete otkazati vec placenu porudzbinu");
			var nazivProizvoda=narudzbina.NazivProizvoda;
			var velicina=narudzbina.VelicinaProizvoda;
			   var proizvodi = db.GetCollection<Proizvod>("proizvodi");
            
            var proizvod = await proizvodi.Find(x => x.Naziv == nazivProizvoda).FirstOrDefaultAsync();
			 var velicine = new List<Velicina>();
            velicine.AddRange(proizvod.Velicine);
            var Velicina = velicine.Find(x => x.Naziv ==velicina);
            Velicina.Kolicina++;
            var update = Builders<Proizvod>.Update.Set("Velicine", velicine);
            await proizvodi.UpdateOneAsync(x => x.Naziv == narudzbina.NazivProizvoda, update);
			await narudzbine.DeleteOneAsync(x=>x.Id==narId);
            return Ok("Porudzbina uspesno otkazana");
		}
        [HttpGet]
        [Route("getProdajeMeseca/{mesec}/{godina}")]
        public async Task<IActionResult> GetProdajeMeseca(int mesec,int godina)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");
            var prodaje = db.GetCollection<Prodaja>("prodaje");
            long prviUMesecu = new DateTime(godina, mesec, 1).Ticks;
            long prviUSledecem = new DateTime(mesec==12?godina+1:godina, mesec==12?1:mesec + 1, 1).Ticks;
            var prodajeMeseca = await prodaje.Find(x =>x.DatumProdaje>=prviUMesecu && x.DatumProdaje<prviUSledecem ).Project(x=>new{x.NazivProizvoda,x.CenaProizvoda,datumProdaje=new DateTime(x.DatumProdaje).ToString()}).ToListAsync();
            prodajeMeseca.Reverse();
            return Ok(prodajeMeseca);

        }
        //za dati mesec vraca koliko je svaki proizvod doneo zaradu
        [HttpGet]
        [Route("getZaradePoProizvodima/{mesec}/{godina}")]
        public async Task<IActionResult> GetZaradePoProizvodima(int mesec,int godina)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");
            var prodaje = db.GetCollection<Prodaja>("prodaje");
            long prviUMesecu = new DateTime(godina, mesec, 1).Ticks;
            long prviUSledecem = new DateTime(mesec == 12 ? godina + 1 : godina, mesec == 12 ? 1 : mesec + 1, 1).Ticks;
            var ukupnaZarada = await prodaje.Aggregate().Match(x => x.DatumProdaje >= prviUMesecu && x.DatumProdaje < prviUSledecem)
                .Group<ZaradaDto>(new BsonDocument
            {
                {"_id","" },
                {"ukupnaZarada",new BsonDocument("$sum","$CenaProizvoda") }
            }).SingleAsync();
            var aggregate =await prodaje.Aggregate().Match(x => x.DatumProdaje >= prviUMesecu && x.DatumProdaje < prviUSledecem).
                Group<ProizvodProdaja>(new BsonDocument
            {
                {"_id","$NazivProizvoda" },
                {"cena",new BsonDocument("$first","$CenaProizvoda") },
                {"total",new BsonDocument("$sum","$CenaProizvoda") },
             
            })
               .Sort(new BsonDocument("total", -1)).ToListAsync();
           
           aggregate.ForEach(x =>
            {
                x.procenat = (x.total / ukupnaZarada.ukupnaZarada) * 100;
            });
            return Ok(aggregate);
        }
		
		[HttpGet]
		[Route("getSveNarudzbine")]
		public async Task<IActionResult> GetSveNarudzbine()
		{
			var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");
            var narudzbine = db.GetCollection<Narudzbina>("narudzbine");
			var sveNarudzbine=await narudzbine.Find(Builders<Narudzbina>.Filter.Empty).ToListAsync();
			//return Ok(sveNarudzbine);
			List<NarudzbinaDetails> rezultat=new List<NarudzbinaDetails>();
			foreach(var x in sveNarudzbine){
                //var filter = Builders<Korisnik>.Filter.Eq(k => k.Id, x.KupacRef.Id.AsString);


                var kupac =await db.GetCollection<Korisnik>(x.KupacRef.CollectionName).Find(k=>k.Id==x.KupacRef.Id).FirstOrDefaultAsync();
                
				NarudzbinaDetails nr=new NarudzbinaDetails{Id=x.Id.ToString(),NazivProizvoda=x.NazivProizvoda,CenaProizvoda=x.CenaProizvoda,VelicinaProizvoda=x.VelicinaProizvoda,Placena=x.Placena,DatumPorudzbine=new DateTime(x.DatumPorudzbine).ToString(),DatumPlacanja=x.DatumPlacanja!=-1?new DateTime(x.DatumPlacanja).ToString():"",EmailKupca=kupac.Mail,KontaktKupca=kupac.BrojTelefona};
                rezultat.Add(nr);
			}
			rezultat.Reverse();
			return Ok(rezultat);
			
		}

     

    }
}