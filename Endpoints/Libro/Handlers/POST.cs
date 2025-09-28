using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.LibroC.Handlers;

public class POSTHandlers 
{
    public static BaseResponse CreateOneLibroHandler(CreateOneLibro request, List<Libro> list)
    {
        if (string.IsNullOrWhiteSpace(request.Titulo))
        {
            return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El título es requerido");
        }

        if (string.IsNullOrWhiteSpace(request.Autor))
        {
            return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El autor es requerido");
        }

        Libro tmp = new Libro(
            request.Titulo, 
            request.Autor, 
            request.ISBN, 
            request.Precio, 
            request.Stock, 
            request.EsFisico,
            request.CategoriaId, 
            request.Descripcion
        );
        
        list.Add(tmp);
        
        BaseResponse result = new DataResponse<Libro>(true, (int)HttpStatusCode.Created, "Libro Creado", data: tmp);

        return result;
    }
}
