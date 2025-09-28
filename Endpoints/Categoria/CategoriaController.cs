using Microsoft.AspNetCore.Mvc;
using ATDapi.Responses;
using ATDapi.Endpoints.CategoriaC.Requests;
using ATDapi.Models;
using ATDapi.Endpoints.CategoriaC.Handlers;

namespace ATDapi.Endpoints.CategoriaC;

[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    public static List<Categoria> CategoriasList = new List<Categoria>();

    [HttpGet]
    [Route("getAll")]
    public BaseResponse GetAllCategoriasEndpoint()
    {
        BaseResponse response = GETHandlers.GetAllCategoriasHandler(CategoriasList);

        Response.StatusCode = response.code;
        return response;
    }

    [HttpGet]
    [Route("get")]
    public BaseResponse GetOneCategoriaEndpoint([FromQuery]GetOneCategoria request)
    {
       BaseResponse response = GETHandlers.GetOneCategoriaHandler(CategoriasList, request.Id);

       Response.StatusCode = response.code;
       return response;
    }
    
    [HttpPost]
    [Route("create")]
    public BaseResponse CreateOneCategoriaEndpoint([FromBody]CreateOneCategoria request)
    {
        BaseResponse response = POSTHandlers.CreateOneCategoriaHandler(request, CategoriasList);

        Response.StatusCode = response.code;
        return response;
    }

    [HttpPatch]
    [Route("edit")]
    public BaseResponse EditOneCategoriaEndpoint([FromBody]EditOneCategoria request)
    {
        BaseResponse response = PATHHandlers.EditOneCategoriaHandler(CategoriasList, request);

        Response.StatusCode = response.code;
        return response;     
    }
}
