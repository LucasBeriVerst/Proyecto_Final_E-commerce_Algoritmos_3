using System.Data;
using System.Data.Odbc;
using Dapper;
using ATDapi.Repository.interfaces;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly string _connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=server-terciario.hilet.com,14133;Database=240425;Uid=sa;Pwd=desaHilet2025;TrustServerCertificate=Yes;";

    public Repository()
    {

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