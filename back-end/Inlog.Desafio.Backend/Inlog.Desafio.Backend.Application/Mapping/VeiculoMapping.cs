using Inlog.Desafio.Backend.Application.DTOs;
using Inlog.Desafio.Backend.Domain.Entities;

namespace Inlog.Desafio.Backend.Application.Mapping;

public static class VeiculoMapping
{
    public static Veiculo ToEntity(this CreateVeiculoRequest dto) =>
        new()
        {
            Chassi = dto.Chassi.Trim(),
            TipoVeiculo = dto.TipoVeiculo,
            Cor = dto.Cor.Trim()
        };

    public static VeiculoResponse ToResponse(this Veiculo entity) =>
        new()
        {
            Chassi = entity.Chassi,
            TipoVeiculo = (int)entity.TipoVeiculo,
            TipoVeiculoDescricao = entity.TipoVeiculo.ToString(),
            Cor = entity.Cor
        };
}
