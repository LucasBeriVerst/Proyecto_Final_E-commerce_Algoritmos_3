using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.FinanzaC.Handlers;

public class GETHandlers 
{
    public static BaseResponse GetAllFinanzasHandler(List<Finanza> list)
    {
        return new DataResponse<List<Finanza>>(true, (int)HttpStatusCode.OK, "Lista de finanzas encontrada", data: list);
    }

    public static BaseResponse GetOneFinanzaHandler(List<Finanza> list, int id)
    {
        Finanza? tmp = list.FirstOrDefault(x => x.Id == id);

        if(tmp != null)
        {
            return new DataResponse<Finanza>(true, (int)HttpStatusCode.OK, "Finanza encontrada", data: tmp);
        }
        else
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Finanza no encontrada");
        }
    }

    public static BaseResponse GetResumenFinancieroHandler(List<Finanza> list)
    {
        var ingresos = list.Where(f => f.Tipo == "Ingreso").Sum(f => f.Monto);
        var gastos = list.Where(f => f.Tipo == "Gasto").Sum(f => f.Monto);
        var balance = ingresos - gastos;

        var resumen = new
        {
            Ingresos = ingresos,
            Gastos = gastos,
            Balance = balance,
            TotalTransacciones = list.Count
        };

        return new DataResponse<object>(true, (int)HttpStatusCode.OK, "Resumen financiero obtenido", data: resumen);
    }
}
