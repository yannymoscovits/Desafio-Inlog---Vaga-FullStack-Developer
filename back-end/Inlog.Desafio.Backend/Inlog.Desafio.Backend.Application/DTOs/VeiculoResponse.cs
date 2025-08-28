namespace Inlog.Desafio.Backend.Application.DTOs;

public class VeiculoResponse
{
    public string Chassi { get; set; } = string.Empty;
    public int TipoVeiculo { get; set; }
    public string TipoVeiculoDescricao { get; set; } = string.Empty;
    public string Cor { get; set; } = string.Empty;
}
