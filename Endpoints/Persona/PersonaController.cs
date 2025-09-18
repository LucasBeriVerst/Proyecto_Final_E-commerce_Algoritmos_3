using Microsoft.AspNetCore.Mvc;
using ATDapi.Responses;
using ATDapi.Endpoints.PersonaC.Requests;
using ATDapi.Repository.Models;
using ATDapi.Endpoints.PersonaC.Handlers;


namespace ATDapi.Endpoints.PersonaC;

[ApiController]
[Route("api/[controller]")]
public class PersonaControlller : ControllerBase
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
       BaseResponse response = GETHandlers.GetOnePersonaHandler(PersonasList, request.id_persona);

       Response.StatusCode = response.code;
       return response;
    }
    
    [HttpPost]
    [Route("create")]
    public BaseResponse CreateOnePersonaEndpoint([FromBody]CreateOnePersona request)
    {
        BaseResponse response = POSTHandlers.CreateOnePersonaHandler(request.name, PersonasList);

        Response.StatusCode = response.code;
        return response;
    }


    [HttpPatch]
    [Route("edit")]
    public BaseResponse EditOnePersonaEndpoint([FromBody]EditOnePersona request)
    {
        BaseResponse response = PATHHandlers.EditOnePersonaHandler(PersonasList, request.id_persona, request.name);

        Response.StatusCode = response.code;
        return response;     
    }

}