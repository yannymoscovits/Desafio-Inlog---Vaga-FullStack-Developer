using Inlog.Desafio.Backend.Application.DTOs;
using Inlog.Desafio.Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Inlog.Desafio.Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class VeiculoController : ControllerBase
{
    private readonly IVeiculoService _service;
    private readonly ILogger<VeiculoController> _logger;

    public VeiculoController(IVeiculoService service, ILogger<VeiculoController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpPost("Cadastrar")]
    public async Task<IActionResult> Cadastrar([FromBody] CreateVeiculoRequest dto, CancellationToken ct)
    {
        try
        {
            var created = await _service.CreateAsync(dto, ct);
            return Created(string.Empty, created);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Erro de validação ao cadastrar veículo");
            return BadRequest(new { error = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Veículo duplicado ao cadastrar");
            return Conflict(new { error = ex.Message });
        }
    }

    [HttpGet("Listar")]
    public async Task<IActionResult> ListarVeiculosAsync(CancellationToken ct)
    {
        var veiculos = await _service.GetAllAsync(ct);
        return Ok(veiculos);
    }
}
