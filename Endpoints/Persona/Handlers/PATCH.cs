using System.Net;
using ATDapi.Repository.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.PersonaC.Handlers;

public class PATHHandlers 
{

    public static BaseResponse EditOnePersonaHandler(List<Persona> list,int id_persona, string name)
    {
        Persona? tmp = list.FirstOrDefault(x => x.id == id_persona);

        if(tmp == null)
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Persona no encontrada");
        }
        else
        {
            list.Remove(tmp);

            tmp.name = name;
            list.Add(tmp);

            return new DataResponse<Persona>(true, (int)HttpStatusCode.Created, "Objeto actualizado", data: tmp);
        }
    }
}