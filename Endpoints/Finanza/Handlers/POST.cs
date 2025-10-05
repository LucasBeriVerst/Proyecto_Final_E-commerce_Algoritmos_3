using System.Net;
using ATDapi.Models;
using ATDapi.Responses;
using ATDapi.Endpoints.FinanzaC.Requests;

namespace ATDapi.Endpoints.FinanzaC.Handlers;

public class POSTHandlers 
{
    public static BaseResponse CreateOneFinanzaHandler(CreateOneFinanza request, List<Finanza> list)
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

        Finanza tmp = new Finanza(request.Tipo, request.Concepto, request.Monto, request.Descripcion, request.Categoria);
        
        list.Add(tmp);
        
        BaseResponse result = new DataResponse<Finanza>(true, (int)HttpStatusCode.Created, "Finanza Creada", data: tmp);

        return result;
    }
}
