CREATE DATABASE quiniela;

USE quiniela;


CREATE TABLE participantes(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(256) NOT NULL,
	multimedia VARCHAR(256)  NULL,
	correo VARCHAR(256) NULL,
	codigo VARCHAR(256) NOT NULL,
	estado VARCHAR(20) NOT NULL
);

INSERT INTO participantes VALUES(NULL,'LUIS GUZMAN', NULL, 'luis.guzman@datumredsoft.com', 'LU0001', 'Activo');
INSERT INTO participantes VALUES(NULL,'DANIEL RODRIGUEZ', NULL, 'daniel.rodriguez@datumredsoft.com', 'DA0002', 'Activo');

CREATE TABLE competicion(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(256) NOT NULL,
	multimedia VARCHAR(256)  NULL,
	estado VARCHAR(20) NOT NULL
);

INSERT INTO competicion VALUES(NULL,'CATAR 2022', NULL, 'Activo');
INSERT INTO competicion VALUES(NULL,'UEFA CHAMPIOS LEAGUE 2022-2033', NULL, 'Activo');


CREATE TABLE fases(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(256) NOT NULL,
	modoGrupo BOOLEAN NOT NULL,
	idCompeticion INT NOT NULL,
	estado VARCHAR(20) NOT NULL,
	FOREIGN KEY (idCompeticion) REFERENCES competicion(id)
);


INSERT INTO fases VALUES (NULL,'GRUPO A', TRUE, 1, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO B', TRUE, 1, 'Activo');  
INSERT INTO fases VALUES (NULL,'GRUPO C', TRUE, 1, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO D', TRUE, 1, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO E', TRUE, 1, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO F', TRUE, 1, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO G', TRUE, 1, 'Activo');
INSERT INTO fases VALUES (NULL,'GRUPO H', TRUE, 1, 'Activo');


INSERT INTO fases VALUES (NULL,'GRUPO A', TRUE, 2, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO B', TRUE, 2, 'Activo');  
INSERT INTO fases VALUES (NULL,'GRUPO C', TRUE, 2, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO D', TRUE, 2, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO E', TRUE, 2, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO F', TRUE, 2, 'Activo'); 
INSERT INTO fases VALUES (NULL,'GRUPO G', TRUE, 2, 'Activo');
INSERT INTO fases VALUES (NULL,'GRUPO H', TRUE, 2, 'Activo');


CREATE  TABLE equipos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	equipo VARCHAR(256) NOT NULL,
	logo VARCHAR(256)  NULL,
	estado VARCHAR(20) NOT NULL
);


INSERT INTO EQUIPOS (equipo, estado) values( 'QATAR', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'ECUADOR', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'SENEGAL', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'HOLANDA', 'Activo');

INSERT INTO EQUIPOS (equipo, estado) values( 'INGLATERRA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'IRÁN', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'ESTADOS UNIDOS', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Gal|Esc|Ucr', 'Activo');

INSERT INTO EQUIPOS (equipo, estado) values( 'ARGENTINA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'ARABIA SAUDITA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'MÉXICO', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'POLONIA', 'Activo');

INSERT INTO EQUIPOS (equipo, estado) values( 'FRANCIA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'PER/EAU/AUS', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'DINAMARCA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'TÚNEZ', 'Activo');

INSERT INTO EQUIPOS (equipo, estado) values( 'ESPAÑA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'COSTA RICA / N. ZEL', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'ALEMANIA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'JAPÓN', 'Activo');

INSERT INTO EQUIPOS (equipo, estado) values( 'BÉLGICA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'CANADÁ', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'MARRUECOS', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'CROACIA', 'Activo');

INSERT INTO EQUIPOS (equipo, estado) values( 'BRASIL', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'SERBIA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'SUIZA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'CAMERÚN', 'Activo');

INSERT INTO EQUIPOS (equipo, estado) values( 'PORTUGAL', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'GHANA', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'URUGUAY', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'COREA DEL SUR', 'Activo');


INSERT INTO EQUIPOS (equipo, estado) values( 'Manchester City', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Paris Saint-Germain', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'RB Leipzig', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Club Brugge', 'Activo');


INSERT INTO EQUIPOS (equipo, estado) values( 'Liverpool', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Atletico Madrid', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Porto', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'AC Milan', 'Activo');


INSERT INTO EQUIPOS (equipo, estado) values( 'Ajax', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Sporting CP', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Borussia Dortmund', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Besiktas', 'Activo');


INSERT INTO EQUIPOS (equipo, estado) values( 'Real Madrid', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Internazionale', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Sheriff Tiraspol', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Shakhtar Donetsk', 'Activo');


INSERT INTO EQUIPOS (equipo, estado) values( 'Bayern Munich', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Benfica', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Barcelona', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Dinamo Kiev', 'Activo');


INSERT INTO EQUIPOS (equipo, estado) values( 'Manchester United', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Villarreal', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Atalanta', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Young Boys', 'Activo');


INSERT INTO EQUIPOS (equipo, estado) values( 'Lille', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Salzburg', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Sevilla', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'VfL Wolfsburg', 'Activo');


INSERT INTO EQUIPOS (equipo, estado) values( 'Juventus', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Chelsea', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Zenit St. Petersburg', 'Activo');
INSERT INTO EQUIPOS (equipo, estado) values( 'Malmö FF', 'Activo');


CREATE TABLE partidos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idFase INT NOT NULL,
	fechaHora VARCHAR(256) NULL,
	idEquipoLocal INT NOT NULL,
	marcadorLocal INT  NULL,
	idEquipoVisitante INT NOT NULL,
	marcadorVisitante INT  NULL,
	estado VARCHAR(20) NOT NULL,
	FOREIGN KEY (idFase) REFERENCES fases(id),
	FOREIGN KEY (idEquipoLocal) REFERENCES equipos(id),
	FOREIGN KEY (idEquipoVisitante) REFERENCES equipos(id)
);


INSERT INTO partidos VALUES(NULL, 1, NULL, 1, NULL, 2, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 1, NULL, 3, NULL, 4, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 1, NULL, 1, NULL, 3, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 1, NULL, 2, NULL, 4, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 1, NULL, 1, NULL, 4, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 1, NULL, 2, NULL, 3, NULL, 'Activo');

INSERT INTO partidos VALUES(NULL, 2, NULL, 5, NULL, 6, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 2, NULL, 7, NULL, 8, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 2, NULL, 5, NULL, 7, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 2, NULL, 6, NULL, 8, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 2, NULL, 5, NULL, 8, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 2, NULL, 6, NULL, 7, NULL, 'Activo');

INSERT INTO partidos VALUES(NULL, 3, NULL, 9 , NULL, 12, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 3, NULL, 10, NULL, 11, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 3, NULL, 11 , NULL, 9, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 3, NULL, 10, NULL, 12, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 3, NULL, 9 , NULL, 10, NULL, 'Activo');
INSERT INTO partidos VALUES(NULL, 3, NULL, 11, NULL, 12, NULL, 'Activo');


CREATE TABLE quinielas(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(256) NOT NULL,
	codigo VARCHAR(256) NOT NULL,
	idCompeticion INT NOT NULL,
	estado VARCHAR(20) NOT NULL,
	FOREIGN KEY (idCompeticion) REFERENCES competicion(id)
);

CREATE TABLE quinielaParticipante(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idQuiniela INT NOT NULL,
	idParticipante INT NOT NULL,
	FOREIGN KEY (idQuiniela) REFERENCES quinielas(id),
	FOREIGN KEY (idParticipante) REFERENCES participantes(id)
);


CREATE TABLE configuracionFase(
	id INT AUTO_INCREMENT PRIMARY KEY,
	aciertoResultado INT NOT NULL,
	aciertoGanador INT NOT NULL,
	aciertoPreguntas INT NOT NULL,
	fechaMaxRespuesta VARCHAR(64) NULL,
	idFase INT NOT NULL,
	estado VARCHAR(20) NOT NULL,
	FOREIGN KEY (idFase) REFERENCES fases(id)
);


CREATE TABLE preguntas(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idConfiguracionFase INT NOT NULL,
	pregunta VARCHAR(256) NOT NULL,
	puntos INT NOT NULL,
	estado VARCHAR(20) NOT NULL,
	FOREIGN KEY (idConfiguracionFase) REFERENCES configuracionFase(id)
);

CREATE TABLE respuestas(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idPregunta INT NOT NULL,
	respuesta VARCHAR(256) NOT NULL,
	correcta BOOLEAN  NULL,
	estado VARCHAR(20) NOT NULL,
	FOREIGN KEY (idPregunta) REFERENCES preguntas(id)
);

CREATE TABLE premios(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idQuiniela INT NOT NULL,
	titulo VARCHAR(256) NOT NULL,
	descripcion VARCHAR(256) NULL,
	multimedia VARCHAR(32770)  NULL,
	estado VARCHAR(20) NOT NULL,
	FOREIGN KEY (idQuiniela) REFERENCES quinielas(id)
);

CREATE TABLE resultadosPartidos(
  	id INT AUTO_INCREMENT PRIMARY KEY,
	idPartido INT NOT NULL,
	idQuinielaParticipante INT NOT NULL,
	marcadorCasa INT,
	marcadorVisitante INT,
	estado VARCHAR(20) NULL,
	FOREIGN KEY (idPartido) REFERENCES partidos(id),
	FOREIGN KEY (idQuinielaParticipante) REFERENCES quinielaParticipante(id)
);

CREATE TABLE resultadoPreguntas(
  	id INT AUTO_INCREMENT PRIMARY KEY,
	idRespuesta INT NOT NULL,
	idQuinielaParticipante INT NOT NULL,
	estado VARCHAR(20) NULL,
	FOREIGN KEY (idRespuesta) REFERENCES respuestas(id),
	FOREIGN KEY (idQuinielaParticipante) REFERENCES quinielaParticipante(id)
);

