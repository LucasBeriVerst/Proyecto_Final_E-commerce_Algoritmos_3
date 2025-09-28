using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.CategoriaC.Handlers;

public class GETHandlers 
{
    public static BaseResponse GetAllCategoriasHandler(List<Categoria> list)
    {
        return new DataResponse<List<Categoria>>(true, (int)HttpStatusCode.OK, "Lista de categorías encontrada", data: list);
    }

    public static BaseResponse GetOneCategoriaHandler(List<Categoria> list, int id)
    {
        Categoria? tmp = list.FirstOrDefault(x => x.Id == id);

        if(tmp != null)
        {
            return new DataResponse<Categoria>(true, (int)HttpStatusCode.OK, "Categoría encontrada", data: tmp);
        }
        else
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Categoría no encontrada");
        }
    }
}
