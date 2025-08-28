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
            Cor = dto.Cor.Trim(),
            Identifier = dto.Identifier.Trim(),
            LicensePlate = dto.LicensePlate.Trim(),
            TrackerSerialNumber = dto.TrackerSerialNumber.Trim(),
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };

    public static VeiculoResponse ToResponse(this Veiculo e) =>
        new()
        {
            Chassi = e.Chassi,
            TipoVeiculo = (int)e.TipoVeiculo,
            TipoVeiculoDescricao = e.TipoVeiculo.ToString(),
            Cor = e.Cor,
            Identifier = e.Identifier,
            LicensePlate = e.LicensePlate,
            TrackerSerialNumber = e.TrackerSerialNumber,
            Latitude = e.Latitude,
            Longitude = e.Longitude
        };
}
