using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.LibroC.Handlers;

public class GETHandlers 
{
    public static BaseResponse GetAllLibrosHandler(List<Libro> list)
    {
        return new DataResponse<List<Libro>>(true, (int)HttpStatusCode.OK, "Lista de libros encontrada", data: list);
    }

    public static BaseResponse GetOneLibroHandler(List<Libro> list, int id)
    {
        Libro? tmp = list.FirstOrDefault(x => x.Id == id);

        if(tmp != null)
        {
            return new DataResponse<Libro>(true, (int)HttpStatusCode.OK, "Libro encontrado", data: tmp);
        }
        else
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Libro no encontrado");
        }
    }
}
