namespace ATDapi.Endpoints.LibroC.Requests;

public class EditOneLibro 
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Autor { get; set; } = string.Empty;
    public string ISBN { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public bool EsFisico { get; set; } = true;
    public int CategoriaId { get; set; }
    public string Descripcion { get; set; } = string.Empty;
}
