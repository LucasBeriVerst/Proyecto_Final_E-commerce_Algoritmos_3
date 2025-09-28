using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.PersonaC.Handlers;

public class GETHandlers {
    public static BaseResponse GetAllPersonasHandler(List<Persona> list)
    {
        return new DataResponse<List<Persona>>(true, (int)HttpStatusCode.OK, "Lista encontrada", data: list);
    }

    public static BaseResponse GetOnePersonaHandler(List<Persona> list, int id_persona)
    {
        Persona? tmp = list.FirstOrDefault(x => x.Id == id_persona);

        if(tmp != null)
        {
            return new DataResponse<Persona>(true, (int)HttpStatusCode.OK, "Persona encontrada", data: tmp);
        }
        else
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Persona no encontrada");
        }
    }
}