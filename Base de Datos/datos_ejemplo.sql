-- Script para insertar datos de ejemplo en la base de datos Local
-- Basado en la estructura de Proyecto_Ecommerce_Alg3.sql
-- Ejecutar después de crear la base de datos con Proyecto_Ecommerce_Alg3.sql

USE Local;

-- Insertar Géneros
INSERT INTO Generos (Nombre, Descripcion) VALUES
('Ciencia Ficción', 'Libros de ciencia ficción y fantasía científica'),
('Fantasía', 'Libros de fantasía épica y aventuras mágicas'),
('Romance', 'Novelas románticas y historias de amor'),
('Misterio', 'Novelas de misterio y suspenso'),
('Historia', 'Libros históricos y biografías'),
('Autoayuda', 'Libros de desarrollo personal y motivación'),
('Terror', 'Novelas de terror y horror'),
('Aventura', 'Libros de aventuras y acción');

-- Insertar Editoriales
INSERT INTO Editoriales (Nombre, Pais) VALUES
('Planeta', 'España'),
('Alfaguara', 'España'),
('Anagrama', 'España'),
('Tusquets', 'España'),
('Debolsillo', 'España'),
('Penguin Random House', 'Estados Unidos'),
('HarperCollins', 'Estados Unidos'),
('Simon & Schuster', 'Estados Unidos');

-- Insertar Autores
INSERT INTO Autores (Nombre, Apellido, Biografia) VALUES
('Isaac', 'Asimov', 'Escritor de ciencia ficción, conocido por sus novelas sobre robots'),
('J.R.R.', 'Tolkien', 'Escritor británico, autor de El Señor de los Anillos'),
('Jane', 'Austen', 'Novelista británica del siglo XIX'),
('Agatha', 'Christie', 'Escritora británica de novelas de misterio'),
('Stephen', 'King', 'Escritor estadounidense de terror y suspense'),
('Gabriel', 'García Márquez', 'Escritor colombiano, Premio Nobel de Literatura'),
('Paulo', 'Coelho', 'Escritor brasileño, autor de El Alquimista'),
('Dale', 'Carnegie', 'Escritor estadounidense de libros de autoayuda');

-- Insertar Libros
INSERT INTO Libros (ID_Genero, ID_Editorial, Titulo, Descripcion, Isbn, Fecha_Publicacion, Url_Portada) VALUES
(1, 1, 'Fundación', 'Primera novela de la serie Fundación de Isaac Asimov', '978-84-376-1234-5', '1951-05-01', '/portadas/Fundacion.jpg'),
(2, 2, 'El Señor de los Anillos', 'Trilogía épica de fantasía de J.R.R. Tolkien', '978-84-376-2345-6', '1954-07-29', '/portadas/El_Senor_de_los_Anillos.jpg'),
(3, 3, 'Orgullo y Prejuicio', 'Novela romántica clásica de Jane Austen', '978-84-376-3456-7', '1813-01-28', '/portadas/Orgullo_y_Prejuicio.jpg'),
(4, 4, 'Asesinato en el Orient Express', 'Novela de misterio de Agatha Christie', '978-84-376-4567-8', '1934-01-01', '/portadas/Asesinato_en_el_Orient_Express.jpg'),
(5, 5, 'Cien Años de Soledad', 'Novela de Gabriel García Márquez', '978-84-376-5678-9', '1967-06-05', '/portadas/Cien_Anos_de_Soledad.jpg'),
(6, 6, 'Cómo Ganar Amigos e Influir', 'Libro de autoayuda de Dale Carnegie', '978-84-376-6789-0', '1936-10-01', '/portadas/Como_Ganar_Amigos_e_Influir.jpg'),
(7, 7, 'El Resplandor', 'Novela de terror de Stephen King', '978-84-376-7890-1', '1977-01-28', '/portadas/El_Resplandor.jpg'),
(6, 8, 'El Alquimista', 'Novela de Paulo Coelho', '978-84-376-8901-2', '1988-01-01', '/portadas/El_Alquimista.jpg');

-- Insertar Libros Físicos (usando IDENTITY_INSERT para evitar problemas con las claves)
SET IDENTITY_INSERT Libros_Fisicos ON;
INSERT INTO Libros_Fisicos (ID_Libro, Precio, Stock) VALUES
(1, 15.99, 25),
(2, 24.99, 18),
(3, 12.99, 30),
(4, 16.99, 22),
(5, 19.99, 15),
(6, 14.99, 40),
(7, 18.99, 12),
(8, 13.99, 35);
SET IDENTITY_INSERT Libros_Fisicos OFF;

-- Insertar Libros Digitales (usando IDENTITY_INSERT para evitar problemas con las claves)
SET IDENTITY_INSERT Libros_Digitales ON;
INSERT INTO Libros_Digitales (ID_Libro, Precio, Url_Descarga) VALUES
(1, 9.99, 'https://download.example.com/fundacion.pdf'),
(3, 7.99, 'https://download.example.com/pride.pdf'),
(6, 8.99, 'https://download.example.com/amigos.pdf'),
(8, 6.99, 'https://download.example.com/alquimista.pdf');
SET IDENTITY_INSERT Libros_Digitales OFF;

-- Insertar relación Libro-Autor
INSERT INTO Libro_Autor (ID_Libro, ID_Autor) VALUES
(1, 1), -- Fundación - Isaac Asimov
(2, 2), -- El Señor de los Anillos - J.R.R. Tolkien
(3, 3), -- Orgullo y Prejuicio - Jane Austen
(4, 4), -- Asesinato en el Orient Express - Agatha Christie
(5, 6), -- Cien Años de Soledad - Gabriel García Márquez
(6, 8), -- Cómo Ganar Amigos - Dale Carnegie
(7, 5), -- El Resplandor - Stephen King
(8, 7); -- El Alquimista - Paulo Coelho

-- Insertar Usuarios de ejemplo
INSERT INTO Usuarios (Nombre, Apellido, Email, Telefono, Domicilio_Calle, Domicilio_Numero, Rol) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '123-456-7890', 'Av. Principal', 123, 'cliente'),
('María', 'González', 'maria.gonzalez@email.com', '098-765-4321', 'Calle Secundaria', 456, 'cliente'),
('Admin', 'Sistema', 'admin@sistema.com', '555-000-0000', 'Calle Admin', 1, 'admin');

-- Insertar algunos Pedidos de ejemplo
INSERT INTO Pedidos (ID_Usuario, Fecha, Total, Estado) VALUES
(1, '2024-01-15', 32.98, 'pagado'),
(2, '2024-01-16', 25.98, 'pendiente'),
(1, '2024-01-17', 19.99, 'enviado');

-- Insertar Detalles de Pedido
INSERT INTO Detalle_Pedido (ID_Libro, ID_Pedido, Tipo, Cantidad, Precio_Unitario) VALUES
(1, 1, 'fisico', 1, 15.99),
(3, 1, 'fisico', 1, 12.99),
(2, 2, 'fisico', 1, 24.99),
(5, 3, 'fisico', 1, 19.99);

-- Insertar Pagos
INSERT INTO Pagos (ID_Pedido, Monto, Metodo, Fecha, Estado) VALUES
(1, 32.98, 'tarjeta', '2024-01-15', 'aprobado'),
(2, 25.98, 'PayPal', '2024-01-16', 'pendiente'),
(3, 19.99, 'transferencia', '2024-01-17', 'aprobado');

-- Insertar Carritos
INSERT INTO Carrito (ID_Usuario, Fecha_Creacion) VALUES
(1, '2024-01-20'),
(2, '2024-01-21');

-- Insertar Detalles de Carrito
INSERT INTO Detalle_Carrito (ID_Carrito, ID_Libro, Cantidad, Tipo) VALUES
(1, 4, 1, 'fisico'),
(1, 6, 2, 'fisico'),
(2, 7, 1, 'fisico');

PRINT '✅ Datos de ejemplo insertados exitosamente!';
PRINT '📚 Se han creado:';
PRINT '   - 8 Géneros';
PRINT '   - 8 Editoriales';
PRINT '   - 8 Autores';
PRINT '   - 8 Libros';
PRINT '   - 8 Libros Físicos';
PRINT '   - 4 Libros Digitales';
PRINT '   - 8 Relaciones Libro-Autor';
PRINT '   - 3 Usuarios';
PRINT '   - 3 Pedidos';
PRINT '   - 4 Detalles de Pedido';
PRINT '   - 3 Pagos';
PRINT '   - 2 Carritos';
PRINT '   - 3 Detalles de Carrito';
