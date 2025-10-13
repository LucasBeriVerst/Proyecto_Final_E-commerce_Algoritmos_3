using Microsoft.AspNetCore.Mvc;
using ATDapi.Responses;
using ATDapi.Models;
using Dapper;
using System.Data.Odbc;
using Microsoft.Extensions.Configuration;

namespace ATDapi.Endpoints.Ecommerce;

[ApiController]
[Route("api/ecommerce")]
public class EcommerceController : ControllerBase
{
    private readonly string _connectionString;

    public EcommerceController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("OdbcConnection") 
            ?? "Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=Proyecto_Ecommerce_Alg3;Trusted_Connection=yes;TrustServerCertificate=yes;";
    }

    /// <summary>
    /// Obtiene todos los libros disponibles para el público (solo activos)
    /// </summary>
    [HttpGet]
    [Route("libros")]
    public async Task<BaseResponse> GetLibrosPublicos()
    {
        try
        {
            using var connection = new OdbcConnection(_connectionString);
            
            var query = @"
                SELECT l.ID_Libro as Id, l.Titulo, l.Descripcion, l.Isbn as ISBN, 
                       l.Fecha_Publicacion as FechaPublicacion, l.Url_Portada,
                       g.Nombre as CategoriaNombre, g.ID_Genero as CategoriaId,
                       e.Nombre as EditorialNombre,
                       COALESCE(lf.Precio, ld.Precio) as Precio,
                       COALESCE(lf.Stock, 0) as Stock,
                       CASE WHEN lf.ID_Libro IS NOT NULL THEN 1 ELSE 0 END as EsFisico
                FROM Libros l
                LEFT JOIN Generos g ON l.ID_Genero = g.ID_Genero
                LEFT JOIN Editoriales e ON l.ID_Editorial = e.ID_Editorial
                LEFT JOIN Libros_Fisicos lf ON l.ID_Libro = lf.ID_Libro
                LEFT JOIN Libros_Digitales ld ON l.ID_Libro = ld.ID_Libro
                WHERE COALESCE(lf.Stock, 1) > 0
                ORDER BY l.ID_Libro DESC";

            var libros = await connection.QueryAsync<dynamic>(query);
            
            return new DataResponse<object>(true, 200, "Libros obtenidos exitosamente", libros.ToList());
        }
        catch (Exception ex)
        {
            return new BaseResponse(false, 500, $"Error al obtener libros: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene un libro específico por ID para el público
    /// </summary>
    [HttpGet]
    [Route("libros/{id}")]
    public async Task<BaseResponse> GetLibroPublico(int id)
    {
        try
        {
            using var connection = new OdbcConnection(_connectionString);
            
            var query = @"
                SELECT l.ID_Libro as Id, l.Titulo, l.Descripcion, l.Isbn as ISBN, 
                       l.Fecha_Publicacion as FechaPublicacion, l.Url_Portada,
                       g.Nombre as CategoriaNombre, g.ID_Genero as CategoriaId,
                       e.Nombre as EditorialNombre,
                       COALESCE(lf.Precio, ld.Precio) as Precio,
                       COALESCE(lf.Stock, 0) as Stock,
                       CASE WHEN lf.ID_Libro IS NOT NULL THEN 1 ELSE 0 END as EsFisico
                FROM Libros l
                LEFT JOIN Generos g ON l.ID_Genero = g.ID_Genero
                LEFT JOIN Editoriales e ON l.ID_Editorial = e.ID_Editorial
                LEFT JOIN Libros_Fisicos lf ON l.ID_Libro = lf.ID_Libro
                LEFT JOIN Libros_Digitales ld ON l.ID_Libro = ld.ID_Libro
                WHERE l.ID_Libro = ?";

            var libro = await connection.QueryFirstOrDefaultAsync<dynamic>(query, new { Id = id });
            
            if (libro == null)
            {
                return new BaseResponse(false, 404, "Libro no encontrado");
            }

            return new DataResponse<object>(true, 200, "Libro obtenido exitosamente", libro);
        }
        catch (Exception ex)
        {
            return new BaseResponse(false, 500, $"Error al obtener libro: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene libros por categoría
    /// </summary>
    [HttpGet]
    [Route("libros/categoria/{categoriaId}")]
    public async Task<BaseResponse> GetLibrosPorCategoria(int categoriaId)
    {
        try
        {
            using var connection = new OdbcConnection(_connectionString);
            
            var query = @"
                SELECT l.ID_Libro as Id, l.Titulo, l.Descripcion, l.Isbn as ISBN, 
                       l.Fecha_Publicacion as FechaPublicacion, l.Url_Portada,
                       g.Nombre as CategoriaNombre, g.ID_Genero as CategoriaId,
                       e.Nombre as EditorialNombre,
                       COALESCE(lf.Precio, ld.Precio) as Precio,
                       COALESCE(lf.Stock, 0) as Stock,
                       CASE WHEN lf.ID_Libro IS NOT NULL THEN 1 ELSE 0 END as EsFisico
                FROM Libros l
                LEFT JOIN Generos g ON l.ID_Genero = g.ID_Genero
                LEFT JOIN Editoriales e ON l.ID_Editorial = e.ID_Editorial
                LEFT JOIN Libros_Fisicos lf ON l.ID_Libro = lf.ID_Libro
                LEFT JOIN Libros_Digitales ld ON l.ID_Libro = ld.ID_Libro
                WHERE l.ID_Genero = ? AND COALESCE(lf.Stock, 1) > 0
                ORDER BY l.ID_Libro DESC";

            var libros = await connection.QueryAsync<dynamic>(query, new { CategoriaId = categoriaId });
            
            return new DataResponse<object>(true, 200, "Libros por categoría obtenidos exitosamente", libros.ToList());
        }
        catch (Exception ex)
        {
            return new BaseResponse(false, 500, $"Error al obtener libros por categoría: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene todas las categorías activas
    /// </summary>
    [HttpGet]
    [Route("categorias")]
    public async Task<BaseResponse> GetCategoriasPublicas()
    {
        try
        {
            using var connection = new OdbcConnection(_connectionString);
            
            var query = @"
                SELECT g.ID_Genero as Id, g.Nombre, g.Descripcion,
                       COUNT(l.ID_Libro) as CantidadLibros
                FROM Generos g
                LEFT JOIN Libros l ON g.ID_Genero = l.ID_Genero
                LEFT JOIN Libros_Fisicos lf ON l.ID_Libro = lf.ID_Libro
                WHERE COALESCE(lf.Stock, 1) > 0 OR l.ID_Libro IS NULL
                GROUP BY g.ID_Genero, g.Nombre, g.Descripcion
                ORDER BY g.Nombre";

            var categorias = await connection.QueryAsync<dynamic>(query);
            
            return new DataResponse<object>(true, 200, "Categorías obtenidas exitosamente", categorias.ToList());
        }
        catch (Exception ex)
        {
            return new BaseResponse(false, 500, $"Error al obtener categorías: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene los libros más vendidos (best sellers)
    /// </summary>
    [HttpGet]
    [Route("libros/bestsellers")]
    public async Task<BaseResponse> GetBestSellers()
    {
        try
        {
            using var connection = new OdbcConnection(_connectionString);
            
            var query = @"
                SELECT TOP 6 l.ID_Libro as Id, l.Titulo, l.Descripcion, l.Isbn as ISBN, 
                       l.Fecha_Publicacion as FechaPublicacion, l.Url_Portada,
                       g.Nombre as CategoriaNombre, g.ID_Genero as CategoriaId,
                       e.Nombre as EditorialNombre,
                       COALESCE(lf.Precio, ld.Precio) as Precio,
                       COALESCE(lf.Stock, 0) as Stock,
                       CASE WHEN lf.ID_Libro IS NOT NULL THEN 1 ELSE 0 END as EsFisico,
                       COALESCE(SUM(dp.Cantidad), 0) as TotalVendidos
                FROM Libros l
                LEFT JOIN Generos g ON l.ID_Genero = g.ID_Genero
                LEFT JOIN Editoriales e ON l.ID_Editorial = e.ID_Editorial
                LEFT JOIN Libros_Fisicos lf ON l.ID_Libro = lf.ID_Libro
                LEFT JOIN Libros_Digitales ld ON l.ID_Libro = ld.ID_Libro
                LEFT JOIN Detalle_Pedido dp ON l.ID_Libro = dp.ID_Libro
                LEFT JOIN Pedidos p ON dp.ID_Pedido = p.ID_Pedido AND p.Estado = 'pagado'
                WHERE COALESCE(lf.Stock, 1) > 0
                GROUP BY l.ID_Libro, l.Titulo, l.Descripcion, l.Isbn, l.Fecha_Publicacion, l.Url_Portada,
                         g.Nombre, g.ID_Genero, e.Nombre, lf.Precio, ld.Precio, lf.Stock, lf.ID_Libro
                ORDER BY TotalVendidos DESC, l.ID_Libro DESC";

            var bestSellers = await connection.QueryAsync<dynamic>(query);
            
            return new DataResponse<object>(true, 200, "Best sellers obtenidos exitosamente", bestSellers.ToList());
        }
        catch (Exception ex)
        {
            return new BaseResponse(false, 500, $"Error al obtener best sellers: {ex.Message}");
        }
    }

    /// <summary>
    /// Busca libros por término de búsqueda
    /// </summary>
    [HttpGet]
    [Route("libros/buscar")]
    public async Task<BaseResponse> BuscarLibros([FromQuery] string termino)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(termino))
            {
                return new BaseResponse(false, 400, "Término de búsqueda requerido");
            }

            using var connection = new OdbcConnection(_connectionString);
            
            var query = @"
                SELECT l.ID_Libro as Id, l.Titulo, l.Descripcion, l.Isbn as ISBN, 
                       l.Fecha_Publicacion as FechaPublicacion, l.Url_Portada,
                       g.Nombre as CategoriaNombre, g.ID_Genero as CategoriaId,
                       e.Nombre as EditorialNombre,
                       COALESCE(lf.Precio, ld.Precio) as Precio,
                       COALESCE(lf.Stock, 0) as Stock,
                       CASE WHEN lf.ID_Libro IS NOT NULL THEN 1 ELSE 0 END as EsFisico
                FROM Libros l
                LEFT JOIN Generos g ON l.ID_Genero = g.ID_Genero
                LEFT JOIN Editoriales e ON l.ID_Editorial = e.ID_Editorial
                LEFT JOIN Libros_Fisicos lf ON l.ID_Libro = lf.ID_Libro
                LEFT JOIN Libros_Digitales ld ON l.ID_Libro = ld.ID_Libro
                WHERE COALESCE(lf.Stock, 1) > 0 
                AND (l.Titulo LIKE ? OR l.Descripcion LIKE ?)
                ORDER BY l.ID_Libro DESC";

            var terminoBusqueda = $"%{termino}%";
            var libros = await connection.QueryAsync<dynamic>(query, new { 
                Termino1 = terminoBusqueda, 
                Termino2 = terminoBusqueda
            });
            
            return new DataResponse<object>(true, 200, "Búsqueda completada exitosamente", libros.ToList());
        }
        catch (Exception ex)
        {
            return new BaseResponse(false, 500, $"Error en la búsqueda: {ex.Message}");
        }
    }
}

// Clase para el request de venta
public class VentaRequest
{
    public int LibroId { get; set; }
    public int Cantidad { get; set; }
}