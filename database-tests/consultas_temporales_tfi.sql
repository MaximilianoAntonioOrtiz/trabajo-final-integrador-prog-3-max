/*
-- listar especialidades activas
SELECT e.id_especialidad, e.nombre
FROM `especialidades` AS e
WHERE e.activo = 1;
*/
-- preparar el entorno para la transaccion
START TRANSACTION;

-- lista la especialidad  de id = 2 (CLINICA)
SELECT * 
FROM `especialidades`
WHERE id_especialidad = 2;

-- baja logica de una especialidad creo que es el soft delete (esto hace que una especialidad deje de estar activa osea disponible)
UPDATE especialidades
SET especialidades.activo = 0
WHERE especialidades.id_especialidad = 2;

SELECT *
FROM `especialidades`
WHERE id_especialidad = 2;

-- editar una especialidad (cambiar el nombre de una especialidad)

-- mostar cual es la especialidad 2 (CLINICA)
SELECT *
FROM `especialidades`
WHERE especialidades.id_especialidad = 2;

UPDATE especialidades
SET especialidades.nombre = 'NUEVO NOMBRE'
WHERE especialidades.id_especialidad = 2;

-- crear especialidades
INSERT INTO `especialidades` (nombre) VALUES ('nombre_especialidad');

-- buscar los datos de los pacientes
SELECT *
FROM pacientes AS p
INNER JOIN usuarios AS u
ON u.id_usuario = p.id_usuario; 

-- buscar los datos de los pacientes incluida su obra social
SELECT p.id_paciente, u.nombres, u.apellido, u.documento, u.email, os.nombre 
FROM pacientes AS p
INNER JOIN usuarios AS u
ON u.id_usuario = p.id_usuario
INNER JOIN obras_sociales AS os
ON os.id_obra_social = p.id_obra_social; 

-- deshacer cambios de las consultas de prueba
ROLLBACK;


