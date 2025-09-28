using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.LibroC.Handlers;

public class VENTAHandlers 
{
    public static BaseResponse VenderLibroHandler(List<Libro> librosList, List<Finanza> finanzasList, int libroId, int cantidad = 1)
    {
        Libro? libro = librosList.FirstOrDefault(x => x.Id == libroId);

        if(libro == null)
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Libro no encontrado");
        }

        if(!libro.Activo)
        {
            return new BaseResponse(false, (int)HttpStatusCode.BadRequest, "El libro no está disponible");
        }

        // Solo verificar stock para libros físicos
        if(libro.EsFisico && libro.Stock < cantidad)
        {
            return new BaseResponse(false, (int)HttpStatusCode.BadRequest, 
                $"Stock insuficiente. Disponible: {libro.Stock}, Solicitado: {cantidad}");
        }

        // Solo reducir stock para libros físicos
        if(libro.EsFisico)
        {
            libro.Stock -= cantidad;
        }

        // Crear entrada de finanza automáticamente
        decimal montoTotal = libro.Precio * cantidad;
        Finanza nuevaFinanza = new Finanza(
            "Ingreso", 
            $"Venta de libro: {libro.Titulo}", 
            montoTotal, 
            $"Venta de {cantidad} ejemplar(es) del libro '{libro.Titulo}' - Tipo: {(libro.EsFisico ? "Físico" : "Digital")}", 
            "Ventas de Libros"
        );
        
        finanzasList.Add(nuevaFinanza);

        var ventaInfo = new
        {
            LibroId = libro.Id,
            Titulo = libro.Titulo,
            Tipo = libro.EsFisico ? "Físico" : "Digital",
            Cantidad = cantidad,
            PrecioUnitario = libro.Precio,
            PrecioTotal = montoTotal,
            StockRestante = libro.EsFisico ? libro.Stock : "Ilimitado",
            FechaVenta = DateTime.Now,
            FinanzaId = nuevaFinanza.Id
        };

        return new DataResponse<object>(true, (int)HttpStatusCode.OK, "Venta realizada exitosamente", data: ventaInfo);
    }
}
