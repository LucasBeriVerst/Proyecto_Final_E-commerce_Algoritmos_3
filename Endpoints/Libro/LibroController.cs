using Microsoft.AspNetCore.Mvc;
using ATDapi.Responses;
using ATDapi.Endpoints.LibroC.Requests;
using ATDapi.Models;
using ATDapi.Endpoints.LibroC.Handlers;

namespace ATDapi.Endpoints.LibroC;

[ApiController]
[Route("api/[controller]")]
public class LibroController : ControllerBase
{
    public static List<Libro> LibrosList = new List<Libro>();

    [HttpGet]
    [Route("getAll")]
    public BaseResponse GetAllLibrosEndpoint()
    {
        BaseResponse response = GETHandlers.GetAllLibrosHandler(LibrosList);

        Response.StatusCode = response.code;
        return response;
    }

    [HttpGet]
    [Route("get")]
    public BaseResponse GetOneLibroEndpoint([FromQuery]GetOneLibro request)
    {
       BaseResponse response = GETHandlers.GetOneLibroHandler(LibrosList, request.Id);

       Response.StatusCode = response.code;
       return response;
    }
    
    [HttpPost]
    [Route("create")]
    public BaseResponse CreateOneLibroEndpoint([FromBody]CreateOneLibro request)
    {
        BaseResponse response = POSTHandlers.CreateOneLibroHandler(request, LibrosList);

        Response.StatusCode = response.code;
        return response;
    }

    [HttpPatch]
    [Route("edit")]
    public BaseResponse EditOneLibroEndpoint([FromBody]EditOneLibro request)
    {
        BaseResponse response = PATHHandlers.EditOneLibroHandler(LibrosList, request);

        Response.StatusCode = response.code;
        return response;     
    }

    [HttpPost]
    [Route("vender")]
    public BaseResponse VenderLibroEndpoint([FromBody]VenderLibro request)
    {
        BaseResponse response = VENTAHandlers.VenderLibroHandler(LibrosList, FinanzaController.FinanzasList, request.LibroId, request.Cantidad);

        Response.StatusCode = response.code;
        return response;
    }
}
