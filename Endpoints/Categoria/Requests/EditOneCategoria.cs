namespace ATDapi.Endpoints.CategoriaC.Requests;

public class EditOneCategoria 
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
}
