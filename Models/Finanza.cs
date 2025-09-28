namespace ATDapi.Models;

public class Finanza
{
    public int Id { get; set; }
    public string Tipo { get; set; } = string.Empty; // "Ingreso" o "Gasto"
    public string Concepto { get; set; } = string.Empty;
    public decimal Monto { get; set; }
    public DateTime Fecha { get; set; } = DateTime.Now;
    public string Descripcion { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; } = DateTime.Now;
    public bool Activo { get; set; } = true;

    public Finanza()
    {
    }

    public Finanza(string tipo, string concepto, decimal monto, string descripcion = "", string categoria = "")
    {
        Tipo = tipo;
        Concepto = concepto;
        Monto = monto;
        Descripcion = descripcion;
        Categoria = categoria;
        Fecha = DateTime.Now;
        FechaCreacion = DateTime.Now;
        Activo = true;
    }
}
