using Microsoft.AspNetCore.Mvc;
using ATDapi.Responses;
using ATDapi.Models;
using Dapper;
using System.Data.Odbc;

namespace ATDapi.Endpoints.Ecommerce;

[ApiController]
[Route("api/ecommerce")]
public class EcommerceController : ControllerBase
{
    private readonly string _connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=server-terciario.hilet.com,14133;Database=240425;Uid=sa;Pwd=desaHilet2025;TrustServerCertificate=Yes;";

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
                SELECT l.Id, l.Titulo, l.Autor, l.ISBN, l.Precio, l.Stock, 
                       l.EsFisico, l.CategoriaId, l.Descripcion, l.FechaPublicacion,
                       c.Nombre as CategoriaNombre
                FROM Libros l
                LEFT JOIN Categorias c ON l.CategoriaId = c.Id
                WHERE l.Activo = 1 AND l.Stock > 0
                ORDER BY l.FechaCreacion DESC";

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
                SELECT l.Id, l.Titulo, l.Autor, l.ISBN, l.Precio, l.Stock, 
                       l.EsFisico, l.CategoriaId, l.Descripcion, l.FechaPublicacion,
                       c.Nombre as CategoriaNombre
                FROM Libros l
                LEFT JOIN Categorias c ON l.CategoriaId = c.Id
                WHERE l.Id = ? AND l.Activo = 1";

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
                SELECT l.Id, l.Titulo, l.Autor, l.ISBN, l.Precio, l.Stock, 
                       l.EsFisico, l.CategoriaId, l.Descripcion, l.FechaPublicacion,
                       c.Nombre as CategoriaNombre
                FROM Libros l
                LEFT JOIN Categorias c ON l.CategoriaId = c.Id
                WHERE l.CategoriaId = ? AND l.Activo = 1 AND l.Stock > 0
                ORDER BY l.FechaCreacion DESC";

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
                SELECT c.Id, c.Nombre, c.Descripcion, c.FechaCreacion,
                       COUNT(l.Id) as CantidadLibros
                FROM Categorias c
                LEFT JOIN Libros l ON c.Id = l.CategoriaId AND l.Activo = 1 AND l.Stock > 0
                WHERE c.Activo = 1
                GROUP BY c.Id, c.Nombre, c.Descripcion, c.FechaCreacion
                ORDER BY c.Nombre";

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
                SELECT TOP 6 l.Id, l.Titulo, l.Autor, l.ISBN, l.Precio, l.Stock, 
                       l.EsFisico, l.CategoriaId, l.Descripcion, l.FechaPublicacion,
                       c.Nombre as CategoriaNombre,
                       COALESCE(SUM(dp.Cantidad), 0) as TotalVendidos
                FROM Libros l
                LEFT JOIN Categorias c ON l.CategoriaId = c.Id
                LEFT JOIN Detalle_Pedido dp ON l.Id = dp.ID_Libro
                LEFT JOIN Pedidos p ON dp.ID_Pedido = p.ID_Pedido AND p.Estado = 'Completado'
                WHERE l.Activo = 1 AND l.Stock > 0
                GROUP BY l.Id, l.Titulo, l.Autor, l.ISBN, l.Precio, l.Stock, 
                         l.EsFisico, l.CategoriaId, l.Descripcion, l.FechaPublicacion, c.Nombre
                ORDER BY TotalVendidos DESC, l.FechaCreacion DESC";

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
                SELECT l.Id, l.Titulo, l.Autor, l.ISBN, l.Precio, l.Stock, 
                       l.EsFisico, l.CategoriaId, l.Descripcion, l.FechaPublicacion,
                       c.Nombre as CategoriaNombre
                FROM Libros l
                LEFT JOIN Categorias c ON l.CategoriaId = c.Id
                WHERE l.Activo = 1 AND l.Stock > 0 
                AND (l.Titulo LIKE ? OR l.Autor LIKE ? OR l.Descripcion LIKE ?)
                ORDER BY l.FechaCreacion DESC";

            var terminoBusqueda = $"%{termino}%";
            var libros = await connection.QueryAsync<dynamic>(query, new { 
                Termino1 = terminoBusqueda, 
                Termino2 = terminoBusqueda, 
                Termino3 = terminoBusqueda 
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