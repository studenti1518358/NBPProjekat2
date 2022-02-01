
using back.entities;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System.Threading;
using System.Threading.Tasks;

namespace back.services
{
    public class ConfigureMongoDbIndexesService : IHostedService
    {
        private readonly ILogger<ConfigureMongoDbIndexesService> _logger;

        public ConfigureMongoDbIndexesService(ILogger<ConfigureMongoDbIndexesService> logger)
        {
            _logger = logger;
        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var connectionString = "mongodb://localhost/?safe=true";
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("butik");
            _logger.LogInformation("Creating indexes for mongo database");
            var proizvodi = db.GetCollection<Proizvod>("proizvodi");
            var indexKeyDefintion = Builders<Proizvod>.IndexKeys.Ascending(x => x.Tip).Ascending(x => x.Cena);
            await proizvodi.Indexes.CreateOneAsync(new CreateIndexModel<Proizvod>(indexKeyDefintion), cancellationToken: cancellationToken);

            indexKeyDefintion = Builders<Proizvod>.IndexKeys.Ascending(x => x.Naziv);
            await proizvodi.Indexes.CreateOneAsync(new CreateIndexModel<Proizvod>(indexKeyDefintion), cancellationToken: cancellationToken);
        }

        Task IHostedService.StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
       
    }
}
