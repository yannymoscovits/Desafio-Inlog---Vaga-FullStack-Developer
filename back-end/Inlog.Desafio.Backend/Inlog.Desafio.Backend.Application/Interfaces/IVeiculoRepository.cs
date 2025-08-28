using Inlog.Desafio.Backend.Domain.Entities;

namespace Inlog.Desafio.Backend.Application.Interfaces;

public interface IVeiculoRepository
{
    Task AddAsync(Veiculo entity, CancellationToken ct = default);
    Task<Veiculo?> GetByChassiAsync(string chassi, CancellationToken ct = default);
    Task<IReadOnlyList<Veiculo>> ListAsync(CancellationToken ct = default);
}
