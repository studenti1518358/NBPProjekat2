
using back.dtos;
using back.entities;
using back.Helpers;

using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace back.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class KorisnikController:ControllerBase
    {
        private JwtService _jwtService;
        public KorisnikController(JwtService jwtService)
        {
            this._jwtService = jwtService;
        }

        [HttpPost]
        [Route("registracija")]
        public async Task<IActionResult> RegistrujKorisnika([FromBody] KorisnikReg korisnik)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

            var korisnici = db.GetCollection<Korisnik>("korisnici");
            //prvo se proveri da li korisnik vec postoji, svaki korisnik mora imati jedinstven mejl
            var stariKorisnik = await korisnici.Find(x => x.Mail == korisnik.Mail).FirstOrDefaultAsync();
            if (stariKorisnik != null)
                return BadRequest("Vec postoji korisnik registrovan sa ovom email adresom!");
            string lozinka= BCrypt.Net.BCrypt.HashPassword(korisnik.Lozinka);
            Korisnik noviKorisnik = new Korisnik { Adresa = korisnik.Adresa, Ime = korisnik.Ime, Prezime = korisnik.Prezime, Mail = korisnik.Mail, BrojTelefona = korisnik.BrojTelefona, Status = korisnik.Status, Lozinka = lozinka };
            await korisnici.InsertOneAsync(noviKorisnik);
            return Ok("Novi korisnik uspesno kreiran");
        }

        [HttpPost]
        [Route("logujKorisnika")]
        public async Task<IActionResult> LogujKorisnika([FromBody] LoginAtributi user)
        {
            if (user == null)
                return BadRequest("Invalid credentials");

            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");

            var korisnici = db.GetCollection<Korisnik>("korisnici");
            var auth =await  korisnici.Find(x => x.Mail == user.Mail).Project(x => new { x.Lozinka, x.Id }).FirstOrDefaultAsync();
            if (auth == null)
                return BadRequest("Ne postoji korisnik sa ovim mail-om");
            if (!BCrypt.Net.BCrypt.Verify(user.Lozinka, auth.Lozinka))
                return BadRequest("Pogresna lozinka");
            var jwt = _jwtService.GenerateJwtToken(auth.Id.ToString());
            Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = true
            });
            return Ok("Uspesno logovanje");

        }

        [HttpGet]
        [Route("getKorisnik")]
        public async Task<IActionResult> GetKorisnik()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                ObjectId userId = ObjectId.Parse(token.Issuer);

                var connectionString = "mongodb://localhost/?safe=true";
                var client = new MongoClient(connectionString);
                var db = client.GetDatabase("butik");

                var korisnici = db.GetCollection<Korisnik>("korisnici");
                var korisnik = await korisnici.Find(x => x.Id == userId).FirstOrDefaultAsync();
                return Ok(korisnik);

            }

            catch (Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Route("odjaviKorisnika")]
        public IActionResult OdjaviKorisnika()
        {
            Response.Cookies.Delete("jwt");
            return Ok("logout success");
        }


    }
}