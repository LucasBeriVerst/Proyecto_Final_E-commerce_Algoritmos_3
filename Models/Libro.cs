namespace ATDapi.Models;

public class Libro
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Autor { get; set; } = string.Empty;
    public string ISBN { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public bool EsFisico { get; set; } = true; // Por defecto es físico
    public int CategoriaId { get; set; }
    public string Descripcion { get; set; } = string.Empty;
    public DateTime FechaPublicacion { get; set; }
    public DateTime FechaCreacion { get; set; } = DateTime.Now;
    public bool Activo { get; set; } = true;

    public Libro()
    {
    }

    public Libro(string titulo, string autor, string isbn, decimal precio, int stock, bool esFisico, int categoriaId, string descripcion = "")
    {
        Titulo = titulo;
        Autor = autor;
        ISBN = isbn;
        Precio = precio;
        Stock = stock;
        EsFisico = esFisico;
        CategoriaId = categoriaId;
        Descripcion = descripcion;
        FechaPublicacion = DateTime.Now;
        FechaCreacion = DateTime.Now;
        Activo = true;
    }
}
