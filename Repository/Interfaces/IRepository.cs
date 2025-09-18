namespace ATDapi.Repository.interfaces;


public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync(string query);
    Task<T?> GetByIdAsync(string query);
    Task<int> AddAsync(string query);
    Task<int> UpdateAsync(string query);
    Task<int> DeleteAsync(string query);
}