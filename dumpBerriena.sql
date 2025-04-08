-- SQLBook: Code
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: ehulock
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `erreserba`
--

DROP TABLE IF EXISTS `erreserba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `erreserba` (
  `idErreserba` int NOT NULL AUTO_INCREMENT,
  `egoera` tinyint NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `fill_time` timestamp NULL DEFAULT NULL,
  `empty_time` timestamp NULL DEFAULT NULL,
  `idUser` int NOT NULL,
  `idKutxatila` int NOT NULL,
  PRIMARY KEY (`idErreserba`),
  KEY `fk_erreserba_kutxatila1_idx` (`idKutxatila`),
  KEY `fk_erreserba_user1_idx` (`idUser`),
  CONSTRAINT `fk_erreserba_kutxatila1` FOREIGN KEY (`idKutxatila`) REFERENCES `kutxatila` (`idKutxatila`) ON DELETE CASCADE,
  CONSTRAINT `fk_erreserba_user1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;








--
-- Table structure for table `gela`
--

DROP TABLE IF EXISTS `gela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gela` (
  `idGela` int NOT NULL AUTO_INCREMENT,
  `kodea` varchar(45) NOT NULL,
  `koordenatuak` point DEFAULT NULL,
  `mota` enum('ikasgela','bulegoa','komuna','igogailua','kafetegia','beste batzuk','eskailerak') NOT NULL,
  `solairua` int NOT NULL,
  `eraikina` enum('A','B','C','D','E','F','G','I','M') NOT NULL,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  PRIMARY KEY (`idGela`),
  UNIQUE KEY `kodea_UNIQUE` (`kodea`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gela`
--

LOCK TABLES `gela` WRITE;
/*!40000 ALTER TABLE `gela` DISABLE KEYS */;
INSERT INTO `gela` VALUES (2,'P6I1L',NULL,'ikasgela',6,'I',5,23),(3,'P6I2L',NULL,'ikasgela',6,'I',14,23),(5,'P6I3L',NULL,'ikasgela',6,'I',25,23),(6,'P6I4L',NULL,'ikasgela',6,'I',31,23),(7,'P6I5A',NULL,'ikasgela',6,'I',39,23),(8,'P6I6I',NULL,'ikasgela',6,'I',46,23),(9,'P6I7L',NULL,'ikasgela',6,'I',53,23),(10,'P6I8A',NULL,'ikasgela',6,'I',60,23),(11,'P6I9A',NULL,'ikasgela',6,'I',68,23),(12,'P6I10L',NULL,'ikasgela',6,'I',76,23),(13,'P6I11L',NULL,'ikasgela',6,'I',85,23),(14,'P6I12L',NULL,'ikasgela',6,'I',94,23),(15,'P6I36',NULL,'bulegoa',6,'I',2,95),(16,'P6I35',NULL,'bulegoa',6,'I',5,87),(17,'P6I34',NULL,'bulegoa',6,'I',8,95),(18,'P6I33',NULL,'bulegoa',6,'I',11,87),(19,'P6I32',NULL,'bulegoa',6,'I',14,95),(20,'P6I31',NULL,'bulegoa',6,'I',17,87),(21,'P6I30',NULL,'bulegoa',6,'I',20,95),(22,'P6I29',NULL,'bulegoa',6,'I',23,87),(23,'P6I28',NULL,'bulegoa',6,'I',26,95),(24,'P6I27',NULL,'bulegoa',6,'I',30,87),(25,'P6I26',NULL,'bulegoa',6,'I',34,95),(26,'P6I25',NULL,'bulegoa',6,'I',40,87),(27,'P6I24',NULL,'bulegoa',6,'I',50,87),(28,'P6I23',NULL,'bulegoa',6,'I',54,87),(29,'P6I22',NULL,'bulegoa',6,'I',60,87),(30,'P6I21',NULL,'bulegoa',6,'I',70,87),(31,'P6I20',NULL,'bulegoa',6,'I',75,87),(32,'P6I19',NULL,'bulegoa',6,'I',79,87),(33,'P6I18',NULL,'bulegoa',6,'I',82,95),(34,'P6I17',NULL,'bulegoa',6,'I',85,87),(35,'P6I16',NULL,'bulegoa',6,'I',88,95),(36,'P6I15',NULL,'bulegoa',6,'I',91,87),(37,'P6I14',NULL,'bulegoa',6,'I',94,95),(38,'P6I13',NULL,'bulegoa',6,'I',98,87);
/*!40000 ALTER TABLE `gela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ibilbidea`
--

DROP TABLE IF EXISTS `ibilbidea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ibilbidea` (
  `idIbilbidea` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `jatorria` int NOT NULL,
  `helmuga` int NOT NULL,
  PRIMARY KEY (`idIbilbidea`),
  KEY `idUser` (`idUser`),
  KEY `jatorria` (`jatorria`),
  KEY `helmuga` (`helmuga`),
  CONSTRAINT `ibilbidea_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE,
  CONSTRAINT `ibilbidea_ibfk_2` FOREIGN KEY (`jatorria`) REFERENCES `gela` (`idGela`) ON DELETE CASCADE,
  CONSTRAINT `ibilbidea_ibfk_3` FOREIGN KEY (`helmuga`) REFERENCES `gela` (`idGela`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ibilbidea`
--

LOCK TABLES `ibilbidea` WRITE;
/*!40000 ALTER TABLE `ibilbidea` DISABLE KEYS */;
INSERT INTO `ibilbidea` VALUES (1,2,6,2),(2,2,2,7),(3,2,2,3),(4,2,5,2),(5,2,2,6),(6,4,2,6),(7,2,2,6),(9,2,2,5),(10,2,2,3),(11,2,2,5),(12,2,2,5),(14,2,2,6),(15,2,2,5),(16,2,2,5),(17,2,2,5),(18,2,2,3),(19,2,2,3),(20,2,2,5);
/*!40000 ALTER TABLE `ibilbidea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kutxatila`
--

DROP TABLE IF EXISTS `kutxatila`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kutxatila` (
  `idKutxatila` int NOT NULL AUTO_INCREMENT,
  `kodea` varchar(45) NOT NULL,
  `egoera` tinyint NOT NULL,
  `kokapena` varchar(45) NOT NULL,
  `hasiera_ordua` time NOT NULL,
  `amaiera_ordua` time NOT NULL,
  PRIMARY KEY (`idKutxatila`),
  UNIQUE KEY `kodea_UNIQUE` (`kodea`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kutxatila`
--

LOCK TABLES `kutxatila` WRITE;
/*!40000 ALTER TABLE `kutxatila` DISABLE KEYS */;
INSERT INTO `kutxatila` VALUES (2,'P1M7A001',1,'M','00:00:00','23:59:00'),(3,'P0B17002',0,'B','12:00:00','20:00:00'),(5,'P0B17003',0,'B','17:00:00','20:00:00'),(6,'P0B17004',0,'B','08:00:00','10:00:00'),(9,'P1M7A002',0,'M','12:02:00','18:02:00'),(10,'P1M7A003',0,'M','12:02:00','14:02:00');
/*!40000 ALTER TABLE `kutxatila` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pausoa`
--

DROP TABLE IF EXISTS `pausoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pausoa` (
  `idPausoa` int NOT NULL AUTO_INCREMENT,
  `ondokoa` int NOT NULL,
  `posizioa` int NOT NULL,
  PRIMARY KEY (`idPausoa`),
  KEY `fk_pausoa_gela1_idx` (`ondokoa`),
  KEY `fk_pausoa_gela2_idx` (`posizioa`),
  CONSTRAINT `fk_pausoa_gela1` FOREIGN KEY (`ondokoa`) REFERENCES `gela` (`idGela`),
  CONSTRAINT `fk_pausoa_gela2` FOREIGN KEY (`posizioa`) REFERENCES `gela` (`idGela`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pausoa`
--

LOCK TABLES `pausoa` WRITE;
/*!40000 ALTER TABLE `pausoa` DISABLE KEYS */;
INSERT INTO `pausoa` VALUES (1,2,3),(2,3,5),(3,5,6),(4,6,7),(5,7,8),(6,8,9),(7,9,10);
/*!40000 ALTER TABLE `pausoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('user','admin') NOT NULL,
  `token` varchar(255),
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `idUser_UNIQUE` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'paula','paula@ehu.eus','1234','2025-03-04 15:20:29','admin',null),(2,'user','user@ehu.eus','user','2025-03-25 14:39:24','user',null),(4,'Puti','irati@ikasle.ehu','tufyf','2025-03-27 13:05:44','user',null);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ehulock'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `erreserba_amaitu` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = cp850 */ ;;
/*!50003 SET character_set_results = cp850 */ ;;
/*!50003 SET collation_connection  = cp850_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `erreserba_amaitu` ON SCHEDULE EVERY 1 MINUTE STARTS '2025-03-18 16:43:22' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE erreserba
  SET egoera = 2
  WHERE end_time <= NOW() AND egoera = 1 */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `erreserba_hasi` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = cp850 */ ;;
/*!50003 SET character_set_results = cp850 */ ;;
/*!50003 SET collation_connection  = cp850_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `erreserba_hasi` ON SCHEDULE EVERY 1 MINUTE STARTS '2025-03-18 16:42:54' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE erreserba
  SET egoera = 1
  WHERE start_time <= NOW() AND egoera = 0 */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'ehulock'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-29 21:15:41
