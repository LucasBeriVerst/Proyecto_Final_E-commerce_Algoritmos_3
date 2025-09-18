using System.Text;
using ATDapi.Repository.interfaces;
using ATDapi.Repository.Models;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => 
    {
        options.AddDefaultPolicy(policy => {
            policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
        });
    }
);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "localhost",                      
            ValidAudience = "localhost",                   
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("EPkEoWpSwio1wENYdQfIyFqc5wwHz6Tk") 
            )
        };
    });

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();
