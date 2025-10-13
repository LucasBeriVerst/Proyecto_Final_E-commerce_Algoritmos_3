-- CREATE DATABASE Local;

USE Local;

------------------------------------------------------------------------------

CREATE TABLE Generos (
	ID_Genero INT PRIMARY KEY IDENTITY,
	Nombre VARCHAR(30),
	Descripcion VARCHAR(70)
);

CREATE TABLE Editoriales (
	ID_Editorial INT PRIMARY KEY IDENTITY,
	Nombre VARCHAR(30),
	Pais VARCHAR(30)
);

CREATE TABLE Libros (
	ID_Libro INT PRIMARY KEY IDENTITY,
	ID_Genero INT,
	ID_Editorial INT,
	Titulo VARCHAR(50),
	Descripcion VARCHAR(150),
	Isbn VARCHAR(17),		--(unico)
	Fecha_Publicacion DATE,
	Url_Portada VARCHAR(255),
	FOREIGN KEY (ID_Genero) REFERENCES Generos(ID_Genero),
	FOREIGN KEY (ID_Editorial) REFERENCES Editoriales(ID_Editorial)
);

CREATE TABLE Libros_Fisicos (
	ID_Libro INT PRIMARY KEY IDENTITY,	--PK y FK a la vez
	Precio FLOAT,
	Stock INT
);

CREATE TABLE Libros_Digitales (
	ID_Libro INT PRIMARY KEY IDENTITY,	--PK y FK a la vez
	Precio FLOAT,
	Url_Descarga VARCHAR(250)
);

CREATE TABLE Autores (
	ID_Autor INT PRIMARY KEY IDENTITY,
	Nombre VARCHAR(20),
	Apellido VARCHAR(20),
	Biografia VARCHAR(150)
);

CREATE TABLE Libro_Autor (
	ID_Libro INT,		-- PK compuesta(ID_Libro + ID_Autor)
	ID_Autor INT,
	FOREIGN KEY (ID_Libro) REFERENCES Libros(ID_Libro),
	FOREIGN KEY (ID_Autor) REFERENCES Autores(ID_Autor)
);

CREATE TABLE Usuarios (
	ID_Usuario INT PRIMARY KEY IDENTITY,
	Nombre VARCHAR(20),
	Apellido VARCHAR(20),
	Email VARCHAR(50),
	Telefono VARCHAR(20),
	Domicilio_Calle VARCHAR(40),
	Domicilio_Numero INT,
	Rol VARCHAR(15)		--(cliente, admin)
);

CREATE TABLE Pedidos (
	ID_Pedido INT PRIMARY KEY IDENTITY,
	ID_Usuario INT,
	Fecha DATE,
	Total FLOAT,
	Estado VARCHAR(15),		--(pendiente, pagado, enviado, cancelado)
	FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);

CREATE TABLE Detalle_Pedido (
	ID_Detalle_Pedido INT PRIMARY KEY IDENTITY,
	ID_Libro INT,
	ID_Pedido INT,
	Tipo VARCHAR(30),	--(fisico/digital)
	Cantidad INT,
	Precio_Unitario FLOAT		--obligatorio
);

CREATE TABLE Pagos (
	ID_Pago INT PRIMARY KEY IDENTITY,
	ID_Pedido INT,
	Monto FLOAT,
	Metodo VARCHAR(15),		--(tarjeta, PayPal, transferencia, etc.)
	Fecha DATE,
	Estado VARCHAR(15),		--(aprobado, rechazado, pendiente)
	FOREIGN KEY (ID_Pedido) REFERENCES Pedidos(ID_Pedido)
);

CREATE TABLE Carrito (
	ID_Carrito INT PRIMARY KEY IDENTITY,
	ID_Usuario INT,
	Fecha_Creacion DATE,
	FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);

CREATE TABLE Detalle_Carrito (
	ID_Detalle_Carrito INT PRIMARY KEY IDENTITY,
	ID_Carrito INT,
	ID_Libro INT,
	Cantidad INT,
	Tipo VARCHAR(15),	--(fisico/digital)
	FOREIGN KEY (ID_Carrito) REFERENCES Carrito(ID_Carrito),
	FOREIGN KEY (ID_Libro) REFERENCES Libros(ID_Libro)
);


