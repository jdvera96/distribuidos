-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: db_polylost
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calificacione`
--

DROP TABLE IF EXISTS `calificacione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `calificacione` (
  `idcalificacionE` int(11) NOT NULL AUTO_INCREMENT,
  `calificacion` int(11) DEFAULT NULL,
  `fechaCalificacionE` date DEFAULT NULL,
  `IdEstudiante` varchar(10) NOT NULL,
  `IdReclamador` varchar(10) NOT NULL,
  PRIMARY KEY (`idcalificacionE`),
  KEY `fk_calificacionE_usuario1_idx` (`IdEstudiante`),
  KEY `fk_calificacionE_usuario2_idx` (`IdReclamador`),
  CONSTRAINT `fk_calificacionE_usuario1` FOREIGN KEY (`IdEstudiante`) REFERENCES `usuario` (`cedula`),
  CONSTRAINT `fk_calificacionE_usuario2` FOREIGN KEY (`IdReclamador`) REFERENCES `usuario` (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacione`
--

LOCK TABLES `calificacione` WRITE;
/*!40000 ALTER TABLE `calificacione` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificacione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'electronico'),(2,'accesorios'),(3,'otros');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encuentro`
--

DROP TABLE IF EXISTS `encuentro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `encuentro` (
  `idEncuentro` int(11) NOT NULL AUTO_INCREMENT,
  `estadoE` tinyint(4) DEFAULT NULL,
  `facultad` varchar(45) DEFAULT NULL,
  `horaE` varchar(25) DEFAULT NULL,
  `fechaE` date DEFAULT NULL,
  `referenciaE` varchar(100) DEFAULT NULL,
  `idReclamador` varchar(10) NOT NULL,
  `idObjeto` int(11) NOT NULL,
  PRIMARY KEY (`idEncuentro`),
  KEY `fk_encuentro_usuario1_idx` (`idReclamador`),
  KEY `fk_encuentro_objeto1_idx` (`idObjeto`),
  CONSTRAINT `fk_encuentro_objeto1` FOREIGN KEY (`idObjeto`) REFERENCES `objeto` (`idobjeto`),
  CONSTRAINT `fk_encuentro_usuario1` FOREIGN KEY (`idReclamador`) REFERENCES `usuario` (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuentro`
--

LOCK TABLES `encuentro` WRITE;
/*!40000 ALTER TABLE `encuentro` DISABLE KEYS */;
/*!40000 ALTER TABLE `encuentro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objeto`
--

DROP TABLE IF EXISTS `objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `objeto` (
  `idobjeto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `imagenO` varchar(100) DEFAULT NULL,
  `estadoR` tinyint(4) DEFAULT NULL,
  `fechaRO` date DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `horaRegistro` varchar(45) DEFAULT NULL,
  `eliminadoO` tinyint(4) DEFAULT NULL,
  `calificacionEO` int(11) DEFAULT NULL,
  `idsubcategoria` int(11) DEFAULT NULL,
  `idEstudiante` varchar(10) NOT NULL,
  `lugar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idobjeto`),
  KEY `fk_objeto_categoria1_idx` (`idsubcategoria`),
  KEY `fk_objeto_usuario2_idx` (`idEstudiante`),
  CONSTRAINT `fk_objeto_usuario2` FOREIGN KEY (`idEstudiante`) REFERENCES `usuario` (`cedula`),
  CONSTRAINT `objeto_ibfk_1` FOREIGN KEY (`idsubcategoria`) REFERENCES `subcategoria` (`idsubcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objeto`
--

LOCK TABLES `objeto` WRITE;
/*!40000 ALTER TABLE `objeto` DISABLE KEYS */;
INSERT INTO `objeto` VALUES (1,'iphone s5',NULL,0,'2019-08-15','celular encontrado en el lago','negro','15:45',0,-1,1,'0982737473','lago'),(2,'samsung note3',NULL,0,'2019-08-11','celular encontrado cerca de la fiec','negro','09:21',0,-1,1,'0982737473','fiec'),(3,'lapto sony vaio',NULL,0,'2019-07-17','lapto dejada en el laboratorio de quimica','rojo','17:00',0,-1,2,'0932475843','fcnm'),(4,'billetera de barcelona',NULL,0,'2019-07-23','billetera encontrada en las mesas de la fiec vieja','amarilla','13:00',0,-1,3,'0932475843','fiec'),(5,'llaves de auto',NULL,0,'2019-08-14','llaves encontrada cerca de la fsch','cafe','09:00',0,-1,4,'0932475843','fcsh');
/*!40000 ALTER TABLE `objeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategoria`
--

DROP TABLE IF EXISTS `subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subcategoria` (
  `idsubcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `idcategoria` int(11) NOT NULL,
  PRIMARY KEY (`idsubcategoria`),
  KEY `fk_subcategoria_categoria1_idx` (`idcategoria`),
  CONSTRAINT `fk_subcategoria_categoria1` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategoria`
--

LOCK TABLES `subcategoria` WRITE;
/*!40000 ALTER TABLE `subcategoria` DISABLE KEYS */;
INSERT INTO `subcategoria` VALUES (1,'celulares',1),(2,'laptos',1),(3,'billeteras',2),(4,'llaves',2),(5,'libros',3),(6,'cuadernos',3);
/*!40000 ALTER TABLE `subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `cedula` varchar(10) NOT NULL,
  `matricula` varchar(9) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `idRolUsuario` varchar(1) DEFAULT NULL,
  `nombreUsuario` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `whatsapp` tinyint(4) DEFAULT NULL,
  `eliminadoE` tinyint(4) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('0932475843','201722354','karina','salazar','3','kari2019','23546543','0987382837',0,0,'karina@espol.edu.ec','alborada sexta etapa'),('0982737473','201832587','nicole','desiderio','3','nicole19','222222','0982349495',1,0,'nicole@espol.edu.ec','colinas de la florida'),('0987865754','201623454','andres','iparreno','3','andresip','11111','0979578743',1,0,'liparren@espol.edu.ec','mapasingue'),('1312561952','201601358','juan','vera','3','jdvera','12345','0990241515',1,0,'jdvera@espol.edu.ec','florida norte');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-15 23:20:40
