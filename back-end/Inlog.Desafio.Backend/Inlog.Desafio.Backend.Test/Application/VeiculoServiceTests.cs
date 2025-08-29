using System.Linq;
using System.Threading;
using Moq;
using Xunit;
using FluentAssertions;

using Inlog.Desafio.Backend.Application.DTOs;
using Inlog.Desafio.Backend.Application.Interfaces;
using Inlog.Desafio.Backend.Application.Services;
using Inlog.Desafio.Backend.Domain.Entities;

namespace Inlog.Desafio.Backend.Test.Application;
public class VeiculoServiceTests
{
    [Fact]
    public async Task CreateAsync_deve_criar_quando_chassi_unico()
    {
        var repo = new Mock<IVeiculoRepository>(MockBehavior.Strict);

        repo.Setup(r => r.GetByChassiAsync("XYZ123", It.IsAny<CancellationToken>()))
            .ReturnsAsync((Veiculo?)null);
        repo.Setup(r => r.AddAsync(It.Is<Veiculo>(v => v.Chassi == "XYZ123"), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var svc = new VeiculoService(repo.Object);

        var dto = new CreateVeiculoRequest
        {
            Chassi = "XYZ123",
            TipoVeiculo = TipoVeiculo.Caminhao,
            Cor = "Cinza",
            Identifier = "Truck SP",
            LicensePlate = "abc-1d23",
            TrackerSerialNumber = "sn-001",
            Latitude = -23.5,
            Longitude = -46.6
        };

        var result = await svc.CreateAsync(dto, CancellationToken.None);

        result.Should().NotBeNull();
        result.Chassi.Should().Be("XYZ123");
        result.Identifier.Should().Be("Truck SP");
        repo.VerifyAll();
    }

    [Fact]
    public async Task CreateAsync_deve_falhar_quando_chassi_duplicado()
    {
        var repo = new Mock<IVeiculoRepository>(MockBehavior.Strict);

        repo.Setup(r => r.GetByChassiAsync("XYZ123", It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Veiculo { Chassi = "XYZ123" });

        var svc = new VeiculoService(repo.Object);

        var dto = new CreateVeiculoRequest
        {
            Chassi = "XYZ123",
            TipoVeiculo = TipoVeiculo.Onibus,
            Cor = "Azul",
            Identifier = "Bus 1",
            LicensePlate = "AAA-0001",
            TrackerSerialNumber = "SN1",
            Latitude = 0,
            Longitude = 0
        };

        var act = async () => await svc.CreateAsync(dto, CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>()
            .WithMessage("*chassi*");
        repo.Verify(r => r.AddAsync(It.IsAny<Veiculo>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task GetAllAsync_deve_retornar_itens_mapeados()
    {
        var repo = new Mock<IVeiculoRepository>(MockBehavior.Strict);

        repo.Setup(r => r.ListAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Veiculo>
            {
                new() { Chassi="A", Identifier="V1", TipoVeiculo=TipoVeiculo.Onibus,   Cor="Azul",  LicensePlate="AAA-1111", TrackerSerialNumber="SN1", Latitude=1, Longitude=1 },
                new() { Chassi="B", Identifier="V2", TipoVeiculo=TipoVeiculo.Caminhao, Cor="Preto", LicensePlate="BBB-2222", TrackerSerialNumber="SN2", Latitude=2, Longitude=2 }
            });

        var svc = new VeiculoService(repo.Object);

        var list = await svc.GetAllAsync(CancellationToken.None);

        list.Should().HaveCount(2);
        list.Select(x => x.Chassi).Should().Contain(new[] { "A", "B" });
        repo.VerifyAll();
    }
}
