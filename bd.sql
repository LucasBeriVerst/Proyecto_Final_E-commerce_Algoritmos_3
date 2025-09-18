
CREATE TABLE Libros (
    ID_Libro INT PRIMARY KEY,
    Descripcion VARCHAR,
    Isbn VARCHAR
);

CREATE TABLE Autores (
    ID_Autor INT PRIMARY KEY,
    Nombre_Autor VARCHAR
);

CREATE TABLE Libro_Fisico (
    ID_Libro_Fisico INT PRIMARY KEY,
    Precio FLOAT,
    Stock INT
);

CREATE TABLE Libro_Digital (
    ID_Libro_Digital INT PRIMARY KEY,
    Precio FLOAT,
    Url_Descarga VARCHAR
);

CREATE TABLE Usuarios (
    ID_Usuario INT PRIMARY KEY,
    Nombre VARCHAR,
    Apellido VARCHAR,
    Dni VARCHAR,
    Email VARCHAR,
    Telefono VARCHAR,
    Domicilio_Calle VARCHAR,
    Domicilio_Numero INT,
    Rol VARCHAR
);

CREATE TABLE Categorias (
    ID_Categoria INT PRIMARY KEY,
    Nombre VARCHAR
);

CREATE TABLE Editoriales (
    ID_Editorial INT PRIMARY KEY,
    Nombre VARCHAR
);

CREATE TABLE Pedidos (
    ID_Pedido INT PRIMARY KEY,
    Fecha DATE,
    Estado VARCHAR,
    Total FLOAT
);

CREATE TABLE Detalle_Pedido (
    ID_Detalle INT PRIMARY KEY,
    Cantidad INT,
    Precio_Unitario FLOAT
);
