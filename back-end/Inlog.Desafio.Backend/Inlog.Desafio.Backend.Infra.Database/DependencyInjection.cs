using Inlog.Desafio.Backend.Application.Interfaces;
using Inlog.Desafio.Backend.Application.Services;
using Inlog.Desafio.Backend.Infra.Persistence;
using Inlog.Desafio.Backend.Infra.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Inlog.Desafio.Backend.Infra;

public static class DependencyInjection
{
    public static IServiceCollection AddInfra(this IServiceCollection services, string? dbName = null)
    {
        // InMemory por padrão (rápido p/ o desafio)
        services.AddDbContext<AppDbContext>(opt =>
        {
            opt.UseInMemoryDatabase(dbName ?? "InlogDesafioDb");
        });

        // Repositórios
        services.AddScoped<IVeiculoRepository, VeiculoRepository>();

        // Services da Application
        services.AddScoped<IVeiculoService, VeiculoService>();

        return services;
    }

    // Caso queira trocar para SQL Server depois:
    public static IServiceCollection AddInfraSqlServer(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDbContext>(opt =>
        {
            opt.UseSqlServer(connectionString);
        });

        services.AddScoped<IVeiculoRepository, VeiculoRepository>();
        services.AddScoped<IVeiculoService, VeiculoService>();
        return services;
    }
}
