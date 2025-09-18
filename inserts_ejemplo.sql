-- =========================================
-- DATOS DE EJEMPLO
-- =========================================

-- Libros
INSERT INTO Libros VALUES (1, 'Novela de misterio', '978-1234567890');
INSERT INTO Libros VALUES (2, 'Manual de programación', '978-9876543210');
INSERT INTO Libros VALUES (3, 'Historia universal', '978-5556667778');
INSERT INTO Libros VALUES (4, 'Ciencia ficción futurista', '978-1122334455');
INSERT INTO Libros VALUES (5, 'Recetario de cocina', '978-9988776655');

-- Autores
INSERT INTO Autores VALUES (1, 'Agatha Christie');
INSERT INTO Autores VALUES (2, 'Gabriel García Márquez');
INSERT INTO Autores VALUES (3, 'Stephen King');
INSERT INTO Autores VALUES (4, 'Isaac Asimov');
INSERT INTO Autores VALUES (5, 'Julia Child');

-- Libro Físico
INSERT INTO Libro_Fisico VALUES (1, 2500.00, 10);
INSERT INTO Libro_Fisico VALUES (2, 3000.50, 5);
INSERT INTO Libro_Fisico VALUES (3, 1500.75, 20);
INSERT INTO Libro_Fisico VALUES (4, 4200.00, 7);
INSERT INTO Libro_Fisico VALUES (5, 1800.00, 12);

-- Libro Digital
INSERT INTO Libro_Digital VALUES (1, 1200.00, 'https://descarga.com/libro1');
INSERT INTO Libro_Digital VALUES (2, 950.50, 'https://descarga.com/libro2');
INSERT INTO Libro_Digital VALUES (3, 700.00, 'https://descarga.com/libro3');
INSERT INTO Libro_Digital VALUES (4, 1500.00, 'https://descarga.com/libro4');
INSERT INTO Libro_Digital VALUES (5, 1100.75, 'https://descarga.com/libro5');

-- Usuarios
INSERT INTO Usuarios VALUES (1, 'Juan', 'Pérez', '30123456', 'juanp@example.com', '1123456789', 'San Martín', 123, 'Cliente');
INSERT INTO Usuarios VALUES (2, 'María', 'Gómez', '28987654', 'mariag@example.com', '1145678901', 'Belgrano', 456, 'Cliente');
INSERT INTO Usuarios VALUES (3, 'Carlos', 'López', '32567890', 'carlosl@example.com', '1167890123', 'Mitre', 789, 'Admin');
INSERT INTO Usuarios VALUES (4, 'Ana', 'Martínez', '27890123', 'anam@example.com', '1134567890', 'Rivadavia', 101, 'Cliente');
INSERT INTO Usuarios VALUES (5, 'Lucía', 'Fernández', '33234567', 'luciaf@example.com', '1178901234', 'Corrientes', 202, 'Cliente');

-- Categorías
INSERT INTO Categorias VALUES (1, 'Novela');
INSERT INTO Categorias VALUES (2, 'Programación');
INSERT INTO Categorias VALUES (3, 'Historia');
INSERT INTO Categorias VALUES (4, 'Ciencia Ficción');
INSERT INTO Categorias VALUES (5, 'Cocina');

-- Editoriales
INSERT INTO Editoriales VALUES (1, 'Planeta');
INSERT INTO Editoriales VALUES (2, 'Santillana');
INSERT INTO Editoriales VALUES (3, 'Anagrama');
INSERT INTO Editoriales VALUES (4, 'Siglo XXI');
INSERT INTO Editoriales VALUES (5, 'Penguin Random House');

-- Pedidos
INSERT INTO Pedidos VALUES (1, '2025-01-15', 'Pendiente', 5000.00);
INSERT INTO Pedidos VALUES (2, '2025-02-01', 'Pagado', 3200.50);
INSERT INTO Pedidos VALUES (3, '2025-03-10', 'Cancelado', 0.00);
INSERT INTO Pedidos VALUES (4, '2025-04-20', 'Enviado', 4500.75);
INSERT INTO Pedidos VALUES (5, '2025-05-05', 'Pendiente', 2700.00);

-- Detalle Pedido
INSERT INTO Detalle_Pedido VALUES (1, 2, 1250.00);
INSERT INTO Detalle_Pedido VALUES (2, 1, 3200.50);
INSERT INTO Detalle_Pedido VALUES (3, 3, 1500.25);
INSERT INTO Detalle_Pedido VALUES (4, 1, 4500.75);
INSERT INTO Detalle_Pedido VALUES (5, 5, 540.00);