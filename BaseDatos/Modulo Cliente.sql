-- Database: telecomunicaciones

-- DROP DATABASE IF EXISTS telecomunicaciones;
DROP DATABASE IF EXISTS telecomunicaciones;
CREATE DATABASE telecomunicaciones;

	
CREATE TABLE cliente
(
    dni VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fechaNac DATE,
    distrito VARCHAR(50),
    departamento VARCHAR(50),
    correo VARCHAR(50),
    sexo CHAR(1),
    fechaafili DATE
    );

CREATE TABLE clienteDetallado
(
    dni VARCHAR(20) PRIMARY KEY,
    direccion VARCHAR(100), -- Cambiar a VARCHAR(100) para permitir direcciones más largas
    codigoPostal INT,
    trabajo VARCHAR(25), -- Cambiar a VARCHAR(25) para permitir trabajos más largos
    hobie VARCHAR(25), -- Cambiar a VARCHAR(25) para permitir hobbies más largos
    estadoCivil VARCHAR(1), -- Cambiar a VARCHAR(1) para permitir 'S' o 'C'
    numHijos VARCHAR(1), -- Cambiar a VARCHAR(1) para permitir 1 carácter
    contacexterno VARCHAR(9),
    FOREIGN KEY (dni) REFERENCES cliente (dni)
);

CREATE TABLE equipo
(
    idEquipo INT PRIMARY KEY,
    dni VARCHAR(20),
    modelo VARCHAR(25),
    marca VARCHAR(25),
    color VARCHAR(25),
    fechaCompra DATE,
    garantia DATE,
    FOREIGN KEY (dni) REFERENCES cliente (dni)
);

CREATE TABLE linea_telefono
(	
    numeroTelefono VARCHAR(20) PRIMARY KEY, -- Cambiado a VARCHAR para almacenar el número de teléfono
    dni VARCHAR(20),
    idEquipo INT,
    plan VARCHAR(25),
    fechaCompra DATE, -- Fecha de compra (puedes ajustar el tipo de dato según tu necesidad)
    fechaPago DATE, -- Fecha de pago (puedes ajustar el tipo de dato según tu necesidad)
    montoPagoMensual DECIMAL(10, 2), -- Cambiado a DECIMAL para el monto
    estado INT -- Cambiado a INT para el estado (0 para no activo, 1 para activo)
    FOREIGN KEY (dni) REFERENCES cliente (dni),
    FOREIGN KEY (idEquipo) REFERENCES Equipo (idEquipo)
);

INSERT INTO cliente (dni, nombre, apellido, fechaNac, distrito, departamento, correo, sexo, fechaafili)
VALUES
  (123456789, 'Juan', 'Pérez', '1990-01-15', 'Lima', 'Lima', 'juan@example.com', 'M', '2023-10-03'),
  (987654321, 'María', 'Gómez', '1985-08-25', 'Arequipa', 'Arequipa', 'maria@example.com', 'F', '2023-10-03'),
  (555555555, 'Pedro', 'Sánchez', '1995-03-10', 'Cusco', 'Cusco', 'pedro@example.com', 'M', '2023-10-03'),
  (999999999, 'Laura', 'Martínez', '1988-12-05', 'Trujillo', 'La Libertad', 'laura@example.com', 'F', '2023-10-03'),
  (111111111, 'Carlos', 'López', '1992-06-20', 'Arequipa', 'Arequipa', 'carlos@example.com', 'M', '2023-10-03'),
  (222222222, 'Ana', 'Rodríguez', '1987-04-18', 'Lima', 'Lima', 'ana@example.com', 'F', '2023-10-03'),
  (333333333, 'Diego', 'García', '1998-09-28', 'Cusco', 'Cusco', 'diego@example.com', 'M', '2023-10-03'),
  (444444444, 'Sofía', 'Hernández', '1984-03-30', 'Trujillo', 'La Libertad', 'sofia@example.com', 'F', '2023-10-03'),
  (666666666, 'Luis', 'Torres', '1993-07-14', 'Arequipa', 'Arequipa', 'luis@example.com', 'M', '2023-10-03'),
  (888888888, 'Elena', 'López', '1990-02-02', 'Lima', 'Lima', 'elena@example.com', 'F', '2023-10-03');

-- Insertar usuarios en la tabla clienteDetallado
INSERT INTO clienteDetallado (dni, direccion, codigoPostal, trabajo, hobie, estadocivil, numhijos, contacexterno)
VALUES
  (123456789, 'Calle 123', 15001, 'Ingeniero', 'Pintura', 'S', '0', '923456789'),
  (987654321, 'Avenida Principal', 15002, 'Médico', 'Música', 'C', '2', '987654321'),
  (555555555, 'Calle Secundaria', 15003, 'Abogado', 'Deportes', 'S', '1', '955555555'),
  (999999999, 'Calle 789', 15004, 'Profesor', 'Lectura', 'C', '3', '999999999'),
  (111111111, 'Avenida Secundaria', 15005, 'Arquitecto', 'Cocina', 'S', '0', '911111111'),
  (222222222, 'Calle 456', 15006, 'Diseñador', 'Viajes', 'C', '2', '922222222'),
  (333333333, 'Avenida 789', 15007, 'Contador', 'Fotografía', 'S', '1', '933333333'),
  (444444444, 'Calle 789', 15008, 'Economista', 'Jardinería', 'C', '2', '944444444'),
  (666666666, 'Avenida Final', 15009, 'Ingeniero Civil', 'Natación', 'S', '0', '966666666'),
  (888888888, 'Calle 111', 15010, 'Psicólogo', 'Ajedrez', 'C', '1', '988888888');


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


INSERT INTO linea_telefono (numeroTelefono, dni, plan, fechaCompra, fechaPago, montoPagoMensual, estado)
VALUES
  ('123456789', '123456789', 'Plan Básico', '2023-10-26', '2023-11-26', 29.99, 1),
  ('987654321', '987654321', 'Plan Premium', '2023-10-26', '2023-11-26', 49.99, 1),
  ('555555555', '555555555', 'Plan Estándar', '2023-10-26', '2023-11-26', 39.99, 1),
  ('999999999', '999999999', 'Plan Familiar', '2023-10-26', '2023-11-26', 59.99, 1),
  ('111111111', '111111111', 'Plan Premium', '2023-10-26', '2023-11-26', 49.99, 1),
  ('222222222', '222222222', 'Plan Básico', '2023-10-26', '2023-11-26', 29.99, 1),
  ('333333333', '333333333', 'Plan Estándar', '2023-10-26', '2023-11-26', 39.99, 1),
  ('444444444', '444444444', 'Plan Premium', '2023-10-26', '2023-11-26', 49.99, 1),
  ('666666666', '666666666', 'Plan Básico', '2023-10-26', '2023-11-26', 29.99, 1),
  ('888888888', '888888888', 'Plan Familiar', '2023-10-26', '2023-11-26', 59.99, 1);
select * from cliente;
select * from clienteDetallado;
select * from equipo;
select * from linea_telefono;
