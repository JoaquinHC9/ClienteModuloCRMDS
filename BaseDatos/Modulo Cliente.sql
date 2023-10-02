-- Database: telecomunicaciones

-- DROP DATABASE IF EXISTS telecomunicaciones;
DROP DATABASE IF EXISTS telecomunicaciones;
CREATE DATABASE telecomunicaciones;

	
CREATE TABLE cliente
(
    dni int PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fechaNac DATE,
    distrito VARCHAR(50),
    departamento VARCHAR(50),
    correo VARCHAR(50),
    sexo CHAR(1)
);

CREATE TABLE clienteDetallado
(
    dni INT PRIMARY KEY,
    codigoPostal INT,
    trabajo VARCHAR(25),
    hobie VARCHAR(25),
    estadoCivil CHAR(1),
    numHijos VARCHAR(1),
    contacExterno VARCHAR(9),
    FOREIGN KEY (dni) REFERENCES cliente (dni)
);

CREATE TABLE equipo
(
    idEquipo INT PRIMARY KEY,
    dni INT,
    modelo VARCHAR(25),
    marca VARCHAR(25),
    color VARCHAR(25),
    fechaCompra DATE,
    garantia DATE,
    FOREIGN KEY (dni) REFERENCES cliente (dni)
);

CREATE TABLE linea
(	
    idLinea INT PRIMARY KEY,
    dni INT,
    idEquipo INT,
    plan VARCHAR(25),
    FOREIGN KEY (dni) REFERENCES cliente (dni),
    FOREIGN KEY (idEquipo) REFERENCES Equipo (idEquipo)
);

INSERT INTO cliente (dni, nombre, apellido, fechaNac, distrito, departamento, correo, sexo)
VALUES
  (123456789, 'Juan', 'Pérez', '1990-01-15', 'Lima', 'Lima', 'juan@example.com', 'M'),
  (987654321, 'María', 'Gómez', '1985-08-25', 'Arequipa', 'Arequipa', 'maria@example.com', 'F'),
  (555555555, 'Pedro', 'Sánchez', '1995-03-10', 'Cusco', 'Cusco', 'pedro@example.com', 'M'),
  (999999999, 'Laura', 'Martínez', '1988-12-05', 'Trujillo', 'La Libertad', 'laura@example.com', 'F'),
  (111111111, 'Carlos', 'López', '1992-06-20', 'Arequipa', 'Arequipa', 'carlos@example.com', 'M'),
  (222222222, 'Ana', 'Rodríguez', '1987-04-18', 'Lima', 'Lima', 'ana@example.com', 'F'),
  (333333333, 'Diego', 'García', '1998-09-28', 'Cusco', 'Cusco', 'diego@example.com', 'M'),
  (444444444, 'Sofía', 'Hernández', '1984-03-30', 'Trujillo', 'La Libertad', 'sofia@example.com', 'F'),
  (666666666, 'Luis', 'Torres', '1993-07-14', 'Arequipa', 'Arequipa', 'luis@example.com', 'M'),
  (888888888, 'Elena', 'López', '1990-02-02', 'Lima', 'Lima', 'elena@example.com', 'F');

-- Insertar usuarios en la tabla clienteDetallado
INSERT INTO clienteDetallado (dni, codigoPostal, trabajo, hobie, estadoCivil, numHijos, contacExterno)
VALUES
  (123456789, 15001, 'Ingeniero', 'Pintura', 'S', '0', '923456789'),
  (987654321, 15002, 'Médico', 'Música', 'C', '2', '987654321'),
  (555555555, 15003, 'Abogado', 'Deportes', 'S', '1', '955555555'),
  (999999999, 15004, 'Profesor', 'Lectura', 'C', '3', '999999999'),
  (111111111, 15005, 'Arquitecto', 'Cocina', 'S', '0', '911111111'),
  (222222222, 15006, 'Diseñador', 'Viajes', 'C', '2', '922222222'),
  (333333333, 15007, 'Contador', 'Fotografía', 'S', '1', '933333333'),
  (444444444, 15008, 'Economista', 'Jardinería', 'C', '2', '944444444'),
  (666666666, 15009, 'Ingeniero Civil', 'Natación', 'S', '0', '966666666'),
  (888888888, 15010, 'Psicólogo', 'Ajedrez', 'C', '1', '988888888');


INSERT INTO equipo (idEquipo, dni, modelo, marca, color, fechaCompra, garantia)
VALUES
  (1, 123456789, 'iPhone 12', 'Apple', 'Negro', '2021-01-15', '2023-01-15'),
  (2, 987654321, 'Samsung Galaxy S21', 'Samsung', 'Azul', '2021-02-10', '2023-02-10'),
  (3, 555555555, 'Google Pixel 5', 'Google', 'Blanco', '2021-03-10', '2023-03-10'),
  (4, 999999999, 'OnePlus 8T', 'OnePlus', 'Gris', '2021-04-05', '2023-04-05'),
  (5, 111111111, 'Huawei P40', 'Huawei', 'Dorado', '2021-05-20', '2023-05-20'),
  (6, 222222222, 'Xiaomi Mi 11', 'Xiaomi', 'Plata', '2021-06-18', '2023-06-18'),
  (7, 333333333, 'Sony Xperia 5 II', 'Sony', 'Rojo', '2021-07-25', '2023-07-25'),
  (8, 444444444, 'LG Velvet', 'LG', 'Morado', '2021-08-10', '2023-08-10'),
  (9, 666666666, 'OnePlus Nord', 'OnePlus', 'Verde', '2021-09-30', '2023-09-30'),
  (10, 888888888, 'Motorola Moto G Power', 'Motorola', 'Turquesa', '2021-10-15', '2023-10-15');


INSERT INTO linea (idLinea, dni, idEquipo, plan)
VALUES
  (1, 123456789, 1, 'Plan Básico'),
  (2, 987654321, 2, 'Plan Premium'),
  (3, 555555555, 3, 'Plan Estándar'),
  (4, 999999999, 4, 'Plan Familiar'),
  (5, 111111111, 5, 'Plan Premium'),
  (6, 222222222, 6, 'Plan Básico'),
  (7, 333333333, 7, 'Plan Estándar'),
  (8, 444444444, 8, 'Plan Premium'),
  (9, 666666666, 9, 'Plan Básico'),
  (10, 888888888, 10, 'Plan Familiar');
select * from cliente;
select * from clienteDetallado;
select * from equipo;
select * from linea;
