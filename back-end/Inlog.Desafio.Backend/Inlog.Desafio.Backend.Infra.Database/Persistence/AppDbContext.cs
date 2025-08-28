using Inlog.Desafio.Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Inlog.Desafio.Backend.Infra.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Veiculo> Veiculos => Set<Veiculo>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var veiculo = modelBuilder.Entity<Veiculo>();
        veiculo.ToTable("Veiculos");
        veiculo.HasKey(x => x.Chassi);
        veiculo.Property(x => x.Chassi)
               .IsRequired()
               .HasMaxLength(50);
        veiculo.Property(x => x.Cor)
               .IsRequired()
               .HasMaxLength(30);
        veiculo.Property(x => x.TipoVeiculo)
               .HasConversion<int>()
               .IsRequired();
    }
}
