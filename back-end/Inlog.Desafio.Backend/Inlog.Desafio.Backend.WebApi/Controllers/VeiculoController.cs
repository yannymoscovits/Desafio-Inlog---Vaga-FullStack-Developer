using Microsoft.AspNetCore.Mvc;

namespace Inlog.Desafio.Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class VeiculoController : ControllerBase
{
    private readonly ILogger<VeiculoController> _logger;

    public VeiculoController(ILogger<VeiculoController> logger)
    {
        _logger = logger;
    }

    [HttpPost("Cadastrar")]
    public async Task<IActionResult> Cadastrar([FromBody] object dadosDoVeiculo)
    {
        // TODO: Cadastrar um veiculo em memoria ou banco de dados

        return Ok();
    }

    [HttpGet("Listar")]
    public async Task<IActionResult> ListarVeiculosAsync()
    {
        // TODO: retornar todos veiculos 

        return Ok();
    }
}

