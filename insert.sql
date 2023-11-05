-- Insertar registros en la tabla de Usuarios
INSERT INTO Usuarios (nombre_usuario, Contrasena, Rol) VALUES
    ('usuario1', 'contraseña1', 'Comercial'),
    ('usuario2', 'contraseña2', 'RRHH'),
    ('usuario3', 'contraseña3', 'Administrador');

-- Insertar registros en la tabla de Clientes
INSERT INTO Clientes (nombre_empresa, Rubro, nombre_contacto, Telefono, correo_electronico, Ubicacion) VALUES
    ('Empresa1', 'Rubro1', 'Contacto1', '1234567890', 'contacto1@example.com', 'Ubicación1'),
    ('Empresa2', 'Rubro2', 'Contacto2', '9876543210', 'contacto2@example.com', 'Ubicación2');

-- Insertar registros en la tabla de Candidatos
INSERT INTO Candidatos (nombre_candidato, fecha_nacimiento, telefono, correo_electronico, Residencia) VALUES
    ('Candidato1', '1990-01-15', '555-1234567', 'candidato1@example.com', 'Residencia1'),
    ('Candidato2', '1985-05-20', '555-9876543', 'candidato2@example.com', 'Residencia2');

-- Insertar registros en la tabla de Propuestas
INSERT INTO Propuestas (FechaEnvioPropuesta, UsuarioEjecutivoComercialID, ClienteID, TipoPropuestaEnviada, MontoPropuesta, Descuento, EstadoPropuesta, FechaActualizacionSeguimiento, ComentariosSeguimiento) VALUES
    ('2023-08-15', 1, 1, 'Tipo1', 5000.00, 10.00, 'Pendiente', '2023-08-20 09:30:00', 'Comentario 1'),
    ('2023-08-20', 1, 2, 'Tipo2', 7500.00, 15.00, 'En Proceso', '2023-08-25 11:45:00', 'Comentario 2');

-- Insertar registros en la tabla de Plazas de Trabajo
INSERT INTO plazas_trabajos (nombre_plaza, propuesta_id, usuario_recurso_humanos_id, Salario, cantidad_solicitada, fecha_recepcion_validacion_perfil, fecha_modificacion_perfil, fecha_publicacion_perfil, Estatus, fecha_finalizacion) VALUES
    ('Plaza1', 1, 2, 6000.00, 2, '2023-09-01', '2023-09-05', '2023-09-10', 'Cerrado', '2023-09-20'),
    ('Plaza2', 2, 2, 8000.00, 3, '2023-09-03', '2023-09-07', '2023-09-12', 'En Proceso', NULL);

-- Insertar registros en la tabla de Envío de CVs (Ternas)
INSERT INTO envio_cvs (plaza_trabajo_id, candidato_id, fecha_envio_cv, numero_terna) VALUES
    (1, 1, '2023-09-02', '1a terna'),
    (1, 2, '2023-09-04', '2a terna'),
    (2, 1, '2023-09-05', '1a terna');

-- Insertar registros en la tabla de Filtración de Entrevistas
INSERT INTO filtracion_entrevistas (plaza_trabajo_id, candidato_id, Estatus) VALUES
    (1, 1, 'Candidato contratado'),
    (1, 2, 'Otro'),
    (2, 1, 'Otro');

-- Insertar registros en la tabla de Historial de Asignación de Plazas de Trabajo
INSERT INTO historial_asignaciones (plaza_trabajo_id, analista_rrhh_id, fecha_asignacion, fecha_desasignacion) VALUES
    (1, 2, '2023-09-01 10:00:00', '2023-09-15 15:30:00'),
    (2, 2, '2023-09-03 11:30:00', NULL);