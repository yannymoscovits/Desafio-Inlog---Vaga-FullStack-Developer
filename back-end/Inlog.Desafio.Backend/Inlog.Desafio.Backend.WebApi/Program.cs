using Inlog.Desafio.Backend.Infra;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(o => o.AddDefaultPolicy(b =>
    b.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod()
));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddInfra();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<Inlog.Desafio.Backend.Infra.Persistence.AppDbContext>();
    if (!seeder.Veiculos.Any())
    {
        seeder.Veiculos.AddRange(
            new Inlog.Desafio.Backend.Domain.Entities.Veiculo
            {
                Chassi = "AAA111",
                TipoVeiculo = Inlog.Desafio.Backend.Domain.Entities.TipoVeiculo.Onibus,
                Cor = "Azul",
                Identifier = "Vehicle 1",
                LicensePlate = "AAA-9A99",
                TrackerSerialNumber = "A0000000",
                Latitude = -23.555,
                Longitude = -46.64
            },
            new Inlog.Desafio.Backend.Domain.Entities.Veiculo
            {
                Chassi = "BBB222",
                TipoVeiculo = Inlog.Desafio.Backend.Domain.Entities.TipoVeiculo.Caminhao,
                Cor = "Preto",
                Identifier = "Vehicle 2",
                LicensePlate = "BBB-1B23",
                TrackerSerialNumber = "B0000001",
                Latitude = -23.57,
                Longitude = -46.62
            },
            new Inlog.Desafio.Backend.Domain.Entities.Veiculo
            {
                Chassi = "CCC333",
                TipoVeiculo = Inlog.Desafio.Backend.Domain.Entities.TipoVeiculo.Onibus,
                Cor = "Vermelho",
                Identifier = "Vehicle 3",
                LicensePlate = "CCC-2C34",
                TrackerSerialNumber = "C0000002",
                Latitude = -23.54,
                Longitude = -46.60
            }
        );
        seeder.SaveChanges();
    }
}

app.Run();
