using back.dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using back.entities;
using System.Linq;
using MongoDB.Bson;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;



using System;
using System.IO;



namespace back.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ProizvodController:ControllerBase
    {
        private readonly IWebHostEnvironment _hostEnvironment;

        public ProizvodController(IWebHostEnvironment env)
        {
            this._hostEnvironment = env;
        }

        [HttpPost]
        [Route("DodajNoviProizvod")]
        public async Task<IActionResult> DodajNoviProizvod([FromBody] NoviProizvod noviProizvod)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db=client.GetDatabase("butik");

          

            var proizvodi = db.GetCollection<Proizvod>("proizvodi");
            Proizvod proizvod = new Proizvod { BrojGlasova = 0, Ocena = 0, Naziv = noviProizvod.Naziv, Cena = noviProizvod.Cena, Opis = noviProizvod.Opis, SlikaSrc = noviProizvod.SlikaSrc, Tip = noviProizvod.Tip, Velicine = noviProizvod.Velicine };

            await proizvodi.InsertOneAsync(proizvod);
            var prodavnica = await db.GetCollection<Prodavnica>("prodavnica").Find(x => true).FirstOrDefaultAsync();
            //ako se prvi put pojavljuje proizvod tog tipa, dodati ga u tipove kojw cuva prodavnica
            if (prodavnica!=null && !prodavnica.TipoviProizvoda.Contains(noviProizvod.Tip))
            {
                prodavnica.TipoviProizvoda.Add(noviProizvod.Tip);
                var prodavcnicaCol = db.GetCollection<Prodavnica>("prodavnica");

                await prodavcnicaCol.ReplaceOneAsync(p => true, prodavnica);
            }
            return Ok("Novi proizvod uspesno dodat");

        }
        [HttpPost]
        [Route("DodajNovuSliku")]
        public async Task<IActionResult> DodajNovuSliku([FromForm]IFormFile slikaFile)
        {
            
            var slikaPom = await SacuvajSliku(slikaFile);
            string profilna = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, slikaPom);

          
            return Ok(profilna);

        }
        [NonAction]
        public async Task<string> SacuvajSliku(IFormFile slika)
        {
            string imeSlike = new String(Path.GetFileNameWithoutExtension(slika.FileName).Take(10).ToArray()).Replace(' ', '-');

            imeSlike = imeSlike + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(slika.FileName);
            var slikaPath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imeSlike);
            using (var fileStream = new FileStream(slikaPath, FileMode.Create))
            {
                await slika.CopyToAsync(fileStream);
            }
            return imeSlike;

        }
        [HttpGet]
        [Route("getProizvod/{imeProizvoda}")]
        public async Task<IActionResult> GetProizvod(string imeProizvoda)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

            var proizvodi = db.GetCollection<Proizvod>("proizvodi");
            var proizvod =await proizvodi.Find(x => x.Naziv == imeProizvoda).FirstOrDefaultAsync();
            if (proizvod == null)
                return BadRequest("Ne postoji proizvod sa ovakvim imenom");
            return Ok(proizvod);
        }

        [HttpDelete]
        [Route("obrisiProizvod/{imeProizvoda}")]

        public async Task<IActionResult> ObrisiProizvod(string imeProizvoda)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

            var proizvodi = db.GetCollection<Proizvod>("proizvodi");
            await proizvodi.DeleteOneAsync(x => x.Naziv == imeProizvoda);

            return Ok("Proizvod uspesno obrisan");

        }

        [HttpPut]
        [Route("azurirajProizvod")]
        public async Task<IActionResult> AzurirajProizvod([FromBody]Proizvod proizvod)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

          

            var proizvodi = db.GetCollection<Proizvod>("proizvodi");
            var result = await proizvodi.ReplaceOneAsync(p => p.Naziv == proizvod.Naziv, proizvod);
            return Ok();
        }

        [HttpPost]
        [Route("oceniProizvod/{ocena}/{nazivProizvoda}")]
        public async Task<IActionResult> OceniProizvod(int ocena,string nazivProizvoda)
        {
            if (ocena < 0 || ocena > 5)
                return BadRequest("Ne postoje ocene u ovom opsegu!");
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

            var proizvodi = db.GetCollection<Proizvod>("proizvodi");

          
            var trenutnoGlasanje = await proizvodi.Find(x => x.Naziv == nazivProizvoda).Project(x=>new { x.BrojGlasova, x.Ocena }).FirstOrDefaultAsync();
            if (trenutnoGlasanje == null)
                return BadRequest("Ne postoji proizvod sa ovim imenom");
            double novaOcena = trenutnoGlasanje.Ocena + (ocena - trenutnoGlasanje.Ocena) / (trenutnoGlasanje.BrojGlasova + 1);

            var update = Builders<Proizvod>.Update.Set("Ocena", novaOcena).Set("BrojGlasova", trenutnoGlasanje.BrojGlasova + 1);
            await proizvodi.UpdateOneAsync(x => x.Naziv == nazivProizvoda, update);

            return Ok(novaOcena);
            
        }

        [HttpPost]
        [Route("pretraziProizvode")]
        public async Task<IActionResult> PretraziProizvode([FromBody] ProizvodiPretraga parametri)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

            var proizvodi = db.GetCollection<Proizvod>("proizvodi");
            var pretragaRez = await proizvodi.Find(x => (x.Tip == parametri.TipProizvoda || parametri.TipProizvoda=="Svi") && x.Cena > parametri.MinCena && x.Cena < parametri.MaxCena).Skip(parametri.BrojStranice!=0?parametri.BrProizvodaPoStranici * (parametri.BrojStranice - 1):0).Limit(parametri.BrProizvodaPoStranici).ToListAsync();

            return Ok(pretragaRez);
        }


    }
}