using Microsoft.AspNetCore.Mvc;
using ATDapi.Helpers;
using ATDapi.Responses;
using Microsoft.AspNetCore.Authorization;
using ATDapi.Repository.interfaces;
using ATDapi.Repository.Models;

namespace ATDapi.Endpoints.UserC;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IRepository<Users> _usersRepository;

    public UserController(IRepository<Users> userRepository)
    {
        this._usersRepository = userRepository;
    }

    [HttpPost]
    [Route("login")]
    public BaseResponse Login()
    {
        var token = JWTGen.GenerateJWT();
        return new DataResponse<string>(true, 200, "TokenGenerado", data: token);
    }

    [HttpGet]
    [Route("authtest")]
    [Authorize]
    public BaseResponse AuthTest()
    {
        return new BaseResponse(true, 200, "El usuario esta autorizado");
    }

    [HttpGet]
    [Route("getAll")]
    public async Task<BaseResponse> GetAll()
    {
        var query = Users.GetAllUsers();
        var result = await _usersRepository.GetAllAsync(query);

        return new DataResponse<IEnumerable<Users>>(true, 200, "Resultado", data: result);
    }

    [HttpPost]
    [Route("create")]
    public async Task<BaseResponse> CreateUser([FromBody]Users user)
    {
        var query = user.CreateUser();
        var result = await _usersRepository.AddAsync(query);

        return new DataResponse<int>(true, 200, "Usuario Agregado", data: result);
    }

}
