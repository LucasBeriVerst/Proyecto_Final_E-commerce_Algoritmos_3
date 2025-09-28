namespace ATDapi.Models;

public class Persona
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; } = DateTime.Now;
    public bool Activo { get; set; } = true;

    public Persona()
    {
    }

    public Persona(string nombre, string email = "", string telefono = "")
    {
        Nombre = nombre;
        Email = email;
        Telefono = telefono;
        FechaCreacion = DateTime.Now;
        Activo = true;
    }
}
