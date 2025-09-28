namespace ATDapi.Models;

public class Categoria
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; } = DateTime.Now;
    public bool Activo { get; set; } = true;

    public Categoria()
    {
    }

    public Categoria(string nombre, string descripcion = "")
    {
        Nombre = nombre;
        Descripcion = descripcion;
        FechaCreacion = DateTime.Now;
        Activo = true;
    }
}
