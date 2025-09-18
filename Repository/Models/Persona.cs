namespace ATDapi.Repository.Models;

public class Persona {
    //El contador es unicamente para replicar el comportaimento de un identity usando listas
    public static int count = 0;
    public int id {get; set;}
    public string name {get; set;}

    public Persona(string name){
        this.name = name;
        this.id = count;
        count++;
    }

    //No deberia utilizarse, esta por si lo necesito pasar como parametro en un endpoint
    public Persona() {}
}