namespace ATDapi.Repository.Models;


public class Users {
    public int? ID {get; set;}
    public string Name {get; set;}
    public string Password {get; set;}

    public static string GetAllUsers()
    {
        return string.Format("SELECT * FROM dbo.Users");
    }

    public static string GetUserFromDB(int id)
    {
        return string.Format("SELECT * FROM dbo.Users WHERE ID = {0}", id);
    }

    public string CreateUser()
    {
        return string.Format("INSERT INTO Users VALUES ('{0}', '{1}')", this.Name, this.Password);
    }
}