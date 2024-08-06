-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: smarthome
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `smarthome`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `smarthome` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `smarthome`;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `devicetype_id` int DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `schedule_on` timestamp NULL DEFAULT NULL,
  `schedule_off` timestamp NULL DEFAULT NULL,
  `status` enum('on','off') DEFAULT 'off',
  `device_id` int NOT NULL AUTO_INCREMENT,
  `manual_override` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`device_id`),
  KEY `devicetype_id` (`devicetype_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`devicetype_id`) REFERENCES `devicetypes` (`devicetype_id`),
  CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (2,2,'2024-07-27 06:00:00','2024-07-28 14:00:00','on',2,0),(1,11,'2024-08-02 01:00:00','2024-08-01 20:00:00','on',14,0),(1,2,NULL,NULL,'off',15,0),(1,12,'2024-08-06 06:00:00','2024-08-06 08:00:00','off',23,0),(1,12,'2024-08-06 06:00:00','2024-08-06 08:00:00','off',24,0),(1,12,'2024-08-06 06:00:00','2024-08-06 08:00:00','off',25,0);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devicetypes`
--

DROP TABLE IF EXISTS `devicetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devicetypes` (
  `devicetype_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`devicetype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicetypes`
--

LOCK TABLES `devicetypes` WRITE;
/*!40000 ALTER TABLE `devicetypes` DISABLE KEYS */;
INSERT INTO `devicetypes` VALUES (1,'Lamp'),(2,'Fan'),(3,'Speakers'),(4,'Air Conditioner');
/*!40000 ALTER TABLE `devicetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (2,'Bedroom',1),(3,'Kitchen',2),(4,'Garage',3),(5,'Office',2),(11,'Kitchen',1),(12,'Test Register\'s Room',10);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'Lamp in Kitchen is turned on',1),(2,1,'Lamp in Kitchen is turned off',1),(3,1,'Lamp in Kitchen is turned on',1),(4,1,'Lamp in Kitchen is turned on',1),(5,1,'Lamp in Kitchen is turned on',1),(6,1,'Fan in Bedroom is turned on',1),(7,1,'Lamp in Kitchen is turned on',1),(8,1,'Fan in Bedroom is turned on',1),(9,1,'Lamp in Kitchen is turned on',1),(10,1,'Fan in Bedroom is turned on',1),(11,1,'Lamp in Kitchen is turned on',1),(12,1,'Lamp in Kitchen is turned on',1),(13,1,'Lamp in Kitchen is turned on',1),(14,1,'Lamp in Kitchen is turned on',1),(15,1,'Lamp in Kitchen is turned on',1),(16,1,'Lamp in Kitchen is turned on',1),(17,1,'Lamp in Kitchen is turned on',1),(18,1,'Fan in Bedroom is turned off',1),(19,1,'Fan in Bedroom is turned on',0),(20,10,'Fan in Test Register\'s Room is turned on',1);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user123','$2b$10$6/dCUBI.JLyVqwXOakuoDOxq521yKT.CFnWUh7ZMaLW15luP9Riza',1,'user123@email.com','2024-08-02 18:12:16'),('user456','$2b$10$ew01BEpqKC9PGh.kjuFxc.glxVH9kCXJ3ufOUJpZtCz12aSuW4LAm',2,NULL,'2024-08-02 18:12:16'),('user789','$2b$10$nLud.PWcWmmGkaMNIkHoROTLcNP8Ag2yBUmcBHZbz.T568hP5cMUK',3,NULL,'2024-08-02 18:12:16'),('changetestregister','$2b$10$KEdYJZMLSOq3Bx08.me6NOA/imFO845njpb2OglLDXHKP8Hm6i4B6',10,'changetestregister@email.com','2024-08-06 05:51:38');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-06 14:18:33
