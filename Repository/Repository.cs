using System.Data;
using System.Data.Odbc;
using Dapper;
using ATDapi.Repository.interfaces;
using Microsoft.Extensions.Configuration;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly string _connectionString;

    public Repository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("OdbcConnection") 
            ?? "Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=Proyecto_Ecommerce_Alg3;Trusted_Connection=yes;TrustServerCertificate=yes;";
    }

    private IDbConnection CreateConnection()
    {
        return new OdbcConnection(_connectionString);
    }


    public async Task<IEnumerable<T>> GetAllAsync(string query)
    {
        using var connection = CreateConnection();
        return await connection.QueryAsync<T>(query);
    }

    public async Task<T?> GetByIdAsync(string query)
    {
        using var connection = CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<T>(query);
    }

    public async Task<int> AddAsync(string query)
    {
        using var connection = CreateConnection();
        return await connection.ExecuteAsync(query);
    }

    public async Task<int> UpdateAsync(string query)
    {
        using var connection = CreateConnection();
        return await connection.ExecuteAsync(query);
    }
    
    public async Task<int> DeleteAsync(string query)
    {
        using var connection = CreateConnection();
        return await connection.ExecuteAsync(query);
    }

}