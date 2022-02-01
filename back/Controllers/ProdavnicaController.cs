
using back.dtos;
using back.entities;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdavnicaController:ControllerBase
    {
        public ProdavnicaController()
        {

        }

        [HttpPost]
        [Route("kreirajProdavnicu")]
        public async Task<IActionResult> KreirajProdavnicu([FromBody]NovaProdavnica novaProdavnica)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

            var prodavnica = db.GetCollection<Prodavnica>("prodavnica");
            Prodavnica nova = new Prodavnica { Naziv = novaProdavnica.Naziv, Adresa = novaProdavnica.Adresa, ZiroRacun = novaProdavnica.ZiroRacun, TipoviProizvoda = new List<string>() };
            await prodavnica.InsertOneAsync(nova);
            return Ok();
        }

        [HttpGet]
        [Route("getProdavnica")]
        public async Task<IActionResult> GetProdavnica()
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

            var prodavnica =await db.GetCollection<Prodavnica>("prodavnica").Find(x=>true).FirstOrDefaultAsync();
            if (prodavnica == null)
                return BadRequest("Prodavnica ne postoji");
            return Ok(prodavnica);
        }
    }
}