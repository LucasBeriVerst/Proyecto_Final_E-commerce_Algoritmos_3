using System;
using System.Data.Odbc;
using Microsoft.Extensions.Configuration;

namespace ATDapi
{
    public class DatabaseConnectionTest
    {
        public static void TestConnection()
        {
            try
            {
                // Configuración de conexión
                var connectionString = "Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=Proyecto_Ecommerce_Alg3;Trusted_Connection=yes;TrustServerCertificate=yes;";
                
                Console.WriteLine("🔍 Probando conexión a la base de datos...");
                Console.WriteLine($"📡 Cadena de conexión: {connectionString}");
                
                using var connection = new OdbcConnection(connectionString);
                connection.Open();
                
                Console.WriteLine("✅ ¡Conexión exitosa!");
                Console.WriteLine($"📊 Servidor: {connection.ServerVersion}");
                Console.WriteLine($"🗄️ Base de datos: Proyecto_Ecommerce_Alg3");
                
                // Probar una consulta simple
                var testQuery = "SELECT COUNT(*) as TotalGeneros FROM Generos";
                using var command = new OdbcCommand(testQuery, connection);
                var result = command.ExecuteScalar();
                
                Console.WriteLine($"📚 Total de géneros en la base de datos: {result}");
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ Error de conexión:");
                Console.WriteLine($"🔴 Mensaje: {ex.Message}");
                Console.WriteLine($"🔴 Tipo: {ex.GetType().Name}");
                
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"🔴 Error interno: {ex.InnerException.Message}");
                }
                
                Console.WriteLine("\n💡 Posibles soluciones:");
                Console.WriteLine("1. Verificar que SQL Server esté ejecutándose");
                Console.WriteLine("2. Verificar que la base de datos 'Proyecto_Ecommerce_Alg3' exista");
                Console.WriteLine("3. Verificar que el driver ODBC esté instalado");
                Console.WriteLine("4. Ejecutar el script SQL para crear la base de datos");
            }
        }
    }
}
