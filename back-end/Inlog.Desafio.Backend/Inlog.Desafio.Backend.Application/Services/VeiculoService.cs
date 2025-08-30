using Inlog.Desafio.Backend.Application.DTOs;
using Inlog.Desafio.Backend.Application.Interfaces;
using Inlog.Desafio.Backend.Application.Mapping;
using Inlog.Desafio.Backend.Domain.Entities;

namespace Inlog.Desafio.Backend.Application.Services;
public class VeiculoService : IVeiculoService
{
    private readonly IVeiculoRepository _repo;
    public VeiculoService(IVeiculoRepository repo)
    {
        _repo = repo;
    }

    public async Task<VeiculoResponse> CreateAsync(CreateVeiculoRequest dto, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(dto.Chassi))
            throw new ArgumentException("Chassi é obrigatório.", nameof(dto.Chassi));

        var already = await _repo.GetByChassiAsync(dto.Chassi.Trim(), ct);
        if (already is not null)
            throw new InvalidOperationException("Já existe um veículo com este chassi.");

        var entity = dto.ToEntity();
        await _repo.AddAsync(entity, ct);

        return entity.ToResponse();
    }

    public async Task<IReadOnlyList<VeiculoResponse>> GetAllAsync(CancellationToken ct = default)
    {
        var list = await _repo.ListAsync(ct);
        return list.Select(v => v.ToResponse()).ToList();
    }
}
