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

-- deshacer cambios de las consultas de prueba
ROLLBACK;


