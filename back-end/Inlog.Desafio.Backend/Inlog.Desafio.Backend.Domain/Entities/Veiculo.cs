using Inlog.Desafio.Backend.Domain.Entities;

namespace Inlog.Desafio.Backend.Domain.Entities;

public class Veiculo
{
    public string Chassi { get; set; }
    public TipoVeiculo TipoVeiculo { get; set; }
    public string Cor { get; set; }
}