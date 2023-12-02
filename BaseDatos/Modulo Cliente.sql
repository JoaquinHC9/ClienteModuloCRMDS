DROP DATABASE IF EXISTS telecomunicacionesv2;
CREATE DATABASE telecomunicacionesv2;

	
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
    direccion VARCHAR(100), 
    codigo_postal INT,
    trabajo VARCHAR(25),
    hobie VARCHAR(25), 
    estado_civil VARCHAR(1),
    num_hijos VARCHAR(1), 
    contac_externo VARCHAR(9),
    FOREIGN KEY (dni) REFERENCES cliente (dni)
);


INSERT INTO cliente (dni, nombre, apellido, fechaNac, distrito, departamento, correo, sexo, fechaafili)
VALUES
  (12345678, 'Juan', 'Pérez', '1990-01-15', 'Lima', 'Lima', 'juan@example.com', 'M', '2023-10-03'),
  (98765432, 'María', 'Gómez', '1985-08-25', 'Arequipa', 'Arequipa', 'maria@example.com', 'F', '2023-10-03'),
  (55555555, 'Pedro', 'Sánchez', '1995-03-10', 'Cusco', 'Cusco', 'pedro@example.com', 'M', '2023-10-03'),
  (99999999, 'Laura', 'Martínez', '1988-12-05', 'Trujillo', 'La Libertad', 'laura@example.com', 'F', '2023-10-03'),
  (11111111, 'Carlos', 'López', '1992-06-20', 'Arequipa', 'Arequipa', 'carlos@example.com', 'M', '2023-10-03'),
  (22222222, 'Ana', 'Rodríguez', '1987-04-18', 'Lima', 'Lima', 'ana@example.com', 'F', '2023-10-03'),
  (33333333, 'Diego', 'García', '1998-09-28', 'Cusco', 'Cusco', 'diego@example.com', 'M', '2023-10-03'),
  (44444444, 'Sofía', 'Hernández', '1984-03-30', 'Trujillo', 'La Libertad', 'sofia@example.com', 'F', '2023-10-03'),
  (66666666, 'Luis', 'Torres', '1993-07-14', 'Arequipa', 'Arequipa', 'luis@example.com', 'M', '2023-10-03'),
  (88888888, 'Elena', 'López', '1990-02-02', 'Lima', 'Lima', 'elena@example.com', 'F', '2023-10-03');

-- Insertar usuarios en la tabla clienteDetallado
INSERT INTO clienteDetallado (dni, direccion, codigo_postal, trabajo, hobie, estado_civil, num_hijos, contac_externo)
VALUES
  (12345678, 'Calle 123', 15001, 'Ingeniero', 'Pintura', 'S', '0', '923456789'),
  (98765432, 'Avenida Principal', 15002, 'Médico', 'Música', 'C', '2', '987654321'),
  (55555555, 'Calle Secundaria', 15003, 'Abogado', 'Deportes', 'S', '1', '955555555'),
  (99999999, 'Calle 789', 15004, 'Profesor', 'Lectura', 'C', '3', '999999999'),
  (11111111, 'Avenida Secundaria', 15005, 'Arquitecto', 'Cocina', 'S', '0', '911111111'),
  (22222222, 'Calle 456', 15006, 'Diseñador', 'Viajes', 'C', '2', '922222222'),
  (33333333, 'Avenida 789', 15007, 'Contador', 'Fotografía', 'S', '1', '933333333'),
  (44444444, 'Calle 789', 15008, 'Economista', 'Jardinería', 'C', '2', '944444444'),
  (66666666, 'Avenida Final', 15009, 'Ingeniero Civil', 'Natación', 'S', '0', '966666666'),
  (88888888, 'Calle 111', 15010, 'Psicólogo', 'Ajedrez', 'C', '1', '988888888');


CREATE TABLE administrador
(
    dni VARCHAR(20) PRIMARY KEY,    
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    correo VARCHAR(50) UNIQUE,
    contrasena VARCHAR(100)
);

INSERT INTO administrador (nombre, dni, apellido, correo, contrasena)
VALUES
  ('NombreAdmin1', '000000001', 'ApellidoAdmin1', 'admin1@example.com', 'contra1'),
  ('NombreAdmin2', '000000002', 'ApellidoAdmin2', 'admin2@example.com', 'contra2');

CREATE TABLE operacion
(
    id_operacion SERIAL PRIMARY KEY,
    dni_admin VARCHAR(20) REFERENCES administrador(dni),
    dni_cliente VARCHAR(20) REFERENCES cliente(dni),    
    descripcion VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from cliente;
select * from clienteDetallado;