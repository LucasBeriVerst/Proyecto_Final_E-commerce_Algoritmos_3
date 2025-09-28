using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.PersonaC.Handlers;

public class POSTHandlers {

    public static BaseResponse CreateOnePersonaHandler(string nombre, string email, string telefono, List<Persona> list)
    {
        Persona tmp = new Persona(nombre, email, telefono);
        list.Add(tmp);
        
        BaseResponse result = new DataResponse<Persona>(true, (int)HttpStatusCode.Created, "Persona Creada", data: tmp);

        return result;
    }

}