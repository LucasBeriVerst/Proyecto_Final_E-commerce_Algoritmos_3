using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace ATDapi.Helpers;

public class JWTGen
{
    public static string GenerateJWT()
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EPkEoWpSwio1wENYdQfIyFqc5wwHz6Tk"));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim("user", "0")
        };

        var token = new JwtSecurityToken(
            issuer: "localhost",             
            audience: "localhost",           
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}