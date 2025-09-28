using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.CategoriaC.Handlers;

public class PATHHandlers 
{
    public static BaseResponse EditOneCategoriaHandler(List<Categoria> list, EditOneCategoria request)
    {
        Categoria? tmp = list.FirstOrDefault(x => x.Id == request.Id);

        if(tmp == null)
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Categoría no encontrada");
        }
        else
        {
            if (string.IsNullOrWhiteSpace(request.Nombre))
            {
                return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El nombre es requerido");
            }

            list.Remove(tmp);

            tmp.Nombre = request.Nombre;
            tmp.Descripcion = request.Descripcion;

            list.Add(tmp);

            return new DataResponse<Categoria>(true, (int)HttpStatusCode.OK, "Categoría actualizada", data: tmp);
        }
    }
}
