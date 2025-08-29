using Inlog.Desafio.Backend.Application.Interfaces;
using Inlog.Desafio.Backend.Domain.Entities;
using Inlog.Desafio.Backend.Infra.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Inlog.Desafio.Backend.Infra.Repositories;
public class VeiculoRepository : IVeiculoRepository
{
    private readonly AppDbContext _ctx;

    public VeiculoRepository(AppDbContext ctx)
    {
        _ctx = ctx;
    }
    public async Task AddAsync(Veiculo entity, CancellationToken ct = default)
    {
        _ctx.Veiculos.Add(entity);
        await _ctx.SaveChangesAsync(ct);
    }
    public Task<Veiculo?> GetByChassiAsync(string chassi, CancellationToken ct = default)
    {
        return _ctx.Veiculos.AsNoTracking().FirstOrDefaultAsync(v => v.Chassi == chassi, ct);
    }
    public async Task<IReadOnlyList<Veiculo>> ListAsync(CancellationToken ct = default)
    {
        return await _ctx.Veiculos.AsNoTracking().ToListAsync(ct);
    }
}
