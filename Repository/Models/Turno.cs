namespace ATDapi.Repository.Models;

public class Turno {
    //El contador es unicamente para replicar el comportaimento de un identity usando listas
    public static int count = 0;
    public int id {get; set;}
    public int id_persona {get; set;}
    public DateTime start {get; set;}
    public DateTime end {get; set;}

    public Turno(DateTime start, DateTime end, int id_persona)
    {
        this.id = count;
        this.id_persona = id_persona;
        this.start = start;
        this.end = end;
        count++;
    }

    //No deberia utilizarse, esta por si lo necesito pasar como parametro en un endpoint
    public Turno(){}
}