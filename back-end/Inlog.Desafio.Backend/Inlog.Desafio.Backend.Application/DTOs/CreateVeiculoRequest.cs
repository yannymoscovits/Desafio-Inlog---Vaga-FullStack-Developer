using Inlog.Desafio.Backend.Domain.Entities;

namespace Inlog.Desafio.Backend.Application.DTOs;

public class CreateVeiculoRequest
{
    public string Chassi { get; set; } = string.Empty;
    public TipoVeiculo TipoVeiculo { get; set; }  
    public string Cor { get; set; } = string.Empty;
}
