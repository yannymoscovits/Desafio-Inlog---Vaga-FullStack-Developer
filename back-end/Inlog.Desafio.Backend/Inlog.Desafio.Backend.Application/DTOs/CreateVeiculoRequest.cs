using Inlog.Desafio.Backend.Domain.Entities;

namespace Inlog.Desafio.Backend.Application.DTOs;

public class CreateVeiculoRequest
{
    public string Chassi { get; set; } = string.Empty;
    public TipoVeiculo TipoVeiculo { get; set; }
    public string Cor { get; set; } = string.Empty;

    public string Identifier { get; set; } = string.Empty;
    public string LicensePlate { get; set; } = string.Empty;
    public string TrackerSerialNumber { get; set; } = string.Empty;

    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
