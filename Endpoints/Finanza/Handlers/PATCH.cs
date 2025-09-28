using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.FinanzaC.Handlers;

public class PATHHandlers 
{
    public static BaseResponse EditOneFinanzaHandler(List<Finanza> list, EditOneFinanza request)
    {
        Finanza? tmp = list.FirstOrDefault(x => x.Id == request.Id);

        if(tmp == null)
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Finanza no encontrada");
        }
        else
        {
            if (string.IsNullOrWhiteSpace(request.Tipo))
            {
                return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El tipo es requerido");
            }

            if (string.IsNullOrWhiteSpace(request.Concepto))
            {
                return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El concepto es requerido");
            }

            if (request.Monto <= 0)
            {
                return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El monto debe ser mayor a 0");
            }

            list.Remove(tmp);

            tmp.Tipo = request.Tipo;
            tmp.Concepto = request.Concepto;
            tmp.Monto = request.Monto;
            tmp.Descripcion = request.Descripcion;
            tmp.Categoria = request.Categoria;

            list.Add(tmp);

            return new DataResponse<Finanza>(true, (int)HttpStatusCode.OK, "Finanza actualizada", data: tmp);
        }
    }
}
