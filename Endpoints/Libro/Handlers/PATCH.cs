using System.Net;
using ATDapi.Models;
using ATDapi.Responses;
using ATDapi.Endpoints.LibroC.Requests;

namespace ATDapi.Endpoints.LibroC.Handlers;

public class PATHHandlers 
{
    public static BaseResponse EditOneLibroHandler(List<Libro> list, EditOneLibro request)
    {
        Libro? tmp = list.FirstOrDefault(x => x.Id == request.Id);

        if(tmp == null)
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Libro no encontrado");
        }
        else
        {
            if (string.IsNullOrWhiteSpace(request.Titulo))
            {
                return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El título es requerido");
            }

            if (string.IsNullOrWhiteSpace(request.Autor))
            {
                return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El autor es requerido");
            }

            list.Remove(tmp);

            tmp.Titulo = request.Titulo;
            tmp.Autor = request.Autor;
            tmp.ISBN = request.ISBN;
            tmp.Precio = request.Precio;
            tmp.Stock = request.Stock;
            tmp.EsFisico = request.EsFisico;
            tmp.CategoriaId = request.CategoriaId;
            tmp.Descripcion = request.Descripcion;

            list.Add(tmp);

            return new DataResponse<Libro>(true, (int)HttpStatusCode.OK, "Libro actualizado", data: tmp);
        }
    }
}
