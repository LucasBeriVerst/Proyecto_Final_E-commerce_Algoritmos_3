namespace ATDapi.Endpoints.FinanzaC.Requests;

public class EditOneFinanza 
{
    public int Id { get; set; }
    public string Tipo { get; set; } = string.Empty;
    public string Concepto { get; set; } = string.Empty;
    public decimal Monto { get; set; }
    public string Descripcion { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
}
