using Microsoft.AspNetCore.Mvc;
using ATDapi.Responses;
using ATDapi.Endpoints.FinanzaC.Requests;
using ATDapi.Models;
using ATDapi.Endpoints.FinanzaC.Handlers;

namespace ATDapi.Endpoints.FinanzaC;

[ApiController]
[Route("api/[controller]")]
public class FinanzaController : ControllerBase
{
    public static List<Finanza> FinanzasList = new List<Finanza>();

    [HttpGet]
    [Route("getAll")]
    public BaseResponse GetAllFinanzasEndpoint()
    {
        BaseResponse response = GETHandlers.GetAllFinanzasHandler(FinanzasList);

        Response.StatusCode = response.code;
        return response;
    }

    [HttpGet]
    [Route("get")]
    public BaseResponse GetOneFinanzaEndpoint([FromQuery]GetOneFinanza request)
    {
       BaseResponse response = GETHandlers.GetOneFinanzaHandler(FinanzasList, request.Id);

       Response.StatusCode = response.code;
       return response;
    }

    [HttpGet]
    [Route("resumen")]
    public BaseResponse GetResumenFinancieroEndpoint()
    {
        BaseResponse response = GETHandlers.GetResumenFinancieroHandler(FinanzasList);

        Response.StatusCode = response.code;
        return response;
    }
    
    [HttpPost]
    [Route("create")]
    public BaseResponse CreateOneFinanzaEndpoint([FromBody]CreateOneFinanza request)
    {
        BaseResponse response = POSTHandlers.CreateOneFinanzaHandler(request, FinanzasList);

        Response.StatusCode = response.code;
        return response;
    }

    [HttpPatch]
    [Route("edit")]
    public BaseResponse EditOneFinanzaEndpoint([FromBody]EditOneFinanza request)
    {
        BaseResponse response = PATHHandlers.EditOneFinanzaHandler(FinanzasList, request);

        Response.StatusCode = response.code;
        return response;     
    }
}
