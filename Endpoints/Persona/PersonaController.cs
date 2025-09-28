using Microsoft.AspNetCore.Mvc;
using ATDapi.Responses;
using ATDapi.Endpoints.PersonaC.Requests;
using ATDapi.Models;
using ATDapi.Endpoints.PersonaC.Handlers;

namespace ATDapi.Endpoints.PersonaC;

[ApiController]
[Route("api/[controller]")]
public class PersonaController : ControllerBase
{
    public static List<Persona> PersonasList = new List<Persona>();

    [HttpGet]
    [Route("getAll")]
    public BaseResponse GetAllPersonasEndpoint()
    {
        BaseResponse response = GETHandlers.GetAllPersonasHandler(PersonasList);

        Response.StatusCode = response.code;
        return response;
    }

    [HttpGet]
    [Route("get")]
    public BaseResponse GetOnePersonaEndpoint([FromQuery]GetOnePersona request)
    {
       BaseResponse response = GETHandlers.GetOnePersonaHandler(PersonasList, request.Id);

       Response.StatusCode = response.code;
       return response;
    }
    
    [HttpPost]
    [Route("create")]
    public BaseResponse CreateOnePersonaEndpoint([FromBody]CreateOnePersona request)
    {
        BaseResponse response = POSTHandlers.CreateOnePersonaHandler(request.Nombre, request.Email, request.Telefono, PersonasList);

        Response.StatusCode = response.code;
        return response;
    }

    [HttpPatch]
    [Route("edit")]
    public BaseResponse EditOnePersonaEndpoint([FromBody]EditOnePersona request)
    {
        BaseResponse response = PATHHandlers.EditOnePersonaHandler(PersonasList, request.Id, request.Nombre, request.Email, request.Telefono);

        Response.StatusCode = response.code;
        return response;     
    }
}
