using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.CategoriaC.Handlers;

public class POSTHandlers 
{
    public static BaseResponse CreateOneCategoriaHandler(CreateOneCategoria request, List<Categoria> list)
    {
        if (string.IsNullOrWhiteSpace(request.Nombre))
        {
            return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El nombre es requerido");
        }

        Categoria tmp = new Categoria(request.Nombre, request.Descripcion);
        
        list.Add(tmp);
        
        BaseResponse result = new DataResponse<Categoria>(true, (int)HttpStatusCode.Created, "Categoría Creada", data: tmp);

        return result;
    }
}
