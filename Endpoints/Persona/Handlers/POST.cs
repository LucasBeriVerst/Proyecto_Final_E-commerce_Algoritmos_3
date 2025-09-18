using System.Net;
using ATDapi.Repository.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.PersonaC.Handlers;

public class POSTHandlers {

    public static BaseResponse CreateOnePersonaHandler(string name, List<Persona> list)
    {
        Persona tmp = new Persona(name);
        list.Add(tmp);
        
        BaseResponse result = new DataResponse<Persona>(true, (int)HttpStatusCode.Created, "Persona Creada", data: tmp);

        return result;
    }

}