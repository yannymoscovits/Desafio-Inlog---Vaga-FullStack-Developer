using Inlog.Desafio.Backend.Application.DTOs;

namespace Inlog.Desafio.Backend.Application.Interfaces;

public interface IVeiculoService
{
    Task<VeiculoResponse> CreateAsync(CreateVeiculoRequest dto, CancellationToken ct = default);
    Task<IReadOnlyList<VeiculoResponse>> GetAllAsync(CancellationToken ct = default);
}
