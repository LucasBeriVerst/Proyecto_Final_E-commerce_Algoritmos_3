using System.Net;
using ATDapi.Models;
using ATDapi.Responses;

namespace ATDapi.Endpoints.PersonaC.Handlers;

public class PATHHandlers 
{

    public static BaseResponse EditOnePersonaHandler(List<Persona> list, int id_persona, string nombre, string email, string telefono)
    {
        Persona? tmp = list.FirstOrDefault(x => x.Id == id_persona);

        if(tmp == null)
        {
            return new BaseResponse(false, (int)HttpStatusCode.NotFound, "Persona no encontrada");
        }
        else
        {
            list.Remove(tmp);

            tmp.Nombre = nombre;
            tmp.Email = email;
            tmp.Telefono = telefono;
            list.Add(tmp);

            return new DataResponse<Persona>(true, (int)HttpStatusCode.OK, "Persona actualizada", data: tmp);
        }
    }
}