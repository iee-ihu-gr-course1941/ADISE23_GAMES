-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table games.cards
CREATE TABLE IF NOT EXISTS `cards` (
  `CardID` int(11) NOT NULL,
  `CardRank` varchar(10) NOT NULL,
  `CardSuit` varchar(10) NOT NULL,
  PRIMARY KEY (`CardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.cards: ~52 rows (approximately)
INSERT INTO `cards` (`CardID`, `CardRank`, `CardSuit`) VALUES
	(1, 'Ace', 'Hearts'),
	(2, 'Ace', 'Diamonds'),
	(3, 'Ace', 'Clubs'),
	(4, 'Ace', 'Spades'),
	(5, '2', 'Hearts'),
	(6, '2', 'Diamonds'),
	(7, '2', 'Clubs'),
	(8, '2', 'Spades'),
	(9, '3', 'Hearts'),
	(10, '3', 'Diamonds'),
	(11, '3', 'Clubs'),
	(12, '3', 'Spades'),
	(13, '4', 'Hearts'),
	(14, '4', 'Diamonds'),
	(15, '4', 'Clubs'),
	(16, '4', 'Spades'),
	(17, '5', 'Hearts'),
	(18, '5', 'Diamonds'),
	(19, '5', 'Clubs'),
	(20, '5', 'Spades'),
	(21, '6', 'Hearts'),
	(22, '6', 'Diamonds'),
	(23, '6', 'Clubs'),
	(24, '6', 'Spades'),
	(25, '7', 'Hearts'),
	(26, '7', 'Diamonds'),
	(27, '7', 'Clubs'),
	(28, '7', 'Spades'),
	(29, '8', 'Hearts'),
	(30, '8', 'Diamonds'),
	(31, '8', 'Clubs'),
	(32, '8', 'Spades'),
	(33, '9', 'Hearts'),
	(34, '9', 'Diamonds'),
	(35, '9', 'Clubs'),
	(36, '9', 'Spades'),
	(37, '10', 'Hearts'),
	(38, '10', 'Diamonds'),
	(39, '10', 'Clubs'),
	(40, '10', 'Spades'),
	(41, 'Jack', 'Hearts'),
	(42, 'Jack', 'Diamonds'),
	(43, 'Jack', 'Clubs'),
	(44, 'Jack', 'Spades'),
	(45, 'Queen', 'Hearts'),
	(46, 'Queen', 'Diamonds'),
	(47, 'Queen', 'Clubs'),
	(48, 'Queen', 'Spades'),
	(49, 'King', 'Hearts'),
	(50, 'King', 'Diamonds'),
	(51, 'King', 'Clubs'),
	(52, 'King', 'Spades');

-- Dumping structure for table games.game
CREATE TABLE IF NOT EXISTS `game` (
  `GameID` int(11) NOT NULL AUTO_INCREMENT,
  `IsFinished` tinyint(1) DEFAULT 0,
  `PlayerOneID` int(11) DEFAULT NULL,
  `PlayerTwoID` int(11) DEFAULT NULL,
  `CurrentTurnPlayerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`GameID`),
  KEY `PlayerOneID` (`PlayerOneID`),
  KEY `PlayerTwoID` (`PlayerTwoID`),
  KEY `CurrentTurnPlayerID` (`CurrentTurnPlayerID`),
  CONSTRAINT `game_ibfk_1` FOREIGN KEY (`PlayerOneID`) REFERENCES `players` (`PlayerID`),
  CONSTRAINT `game_ibfk_2` FOREIGN KEY (`PlayerTwoID`) REFERENCES `players` (`PlayerID`),
  CONSTRAINT `game_ibfk_3` FOREIGN KEY (`CurrentTurnPlayerID`) REFERENCES `players` (`PlayerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.game: ~0 rows (approximately)

-- Dumping structure for table games.gameresults
CREATE TABLE IF NOT EXISTS `gameresults` (
  `ResultID` int(11) NOT NULL AUTO_INCREMENT,
  `PlayerID` int(11) DEFAULT NULL,
  `GameID` int(11) DEFAULT NULL,
  `DatePlayed` date DEFAULT NULL,
  `Win` tinyint(1) DEFAULT NULL,
  `Loss` tinyint(1) DEFAULT NULL,
  `Score` int(11) DEFAULT NULL,
  `Round` int(11) DEFAULT NULL,
  PRIMARY KEY (`ResultID`),
  KEY `PlayerID` (`PlayerID`),
  KEY `GameID` (`GameID`),
  CONSTRAINT `gameresults_ibfk_1` FOREIGN KEY (`PlayerID`) REFERENCES `players` (`PlayerID`),
  CONSTRAINT `gameresults_ibfk_2` FOREIGN KEY (`GameID`) REFERENCES `game` (`GameID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.gameresults: ~0 rows (approximately)

-- Dumping structure for table games.hands
CREATE TABLE IF NOT EXISTS `hands` (
  `HandID` int(11) NOT NULL AUTO_INCREMENT,
  `GameID` int(11) DEFAULT NULL,
  `PlayerID` int(11) DEFAULT NULL,
  `CardID` int(11) DEFAULT NULL,
  `CardPicked` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`HandID`),
  KEY `GameID` (`GameID`),
  KEY `PlayerID` (`PlayerID`),
  KEY `CardID` (`CardID`),
  CONSTRAINT `hands_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `game` (`GameID`),
  CONSTRAINT `hands_ibfk_2` FOREIGN KEY (`PlayerID`) REFERENCES `players` (`PlayerID`),
  CONSTRAINT `hands_ibfk_3` FOREIGN KEY (`CardID`) REFERENCES `cards` (`CardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.hands: ~0 rows (approximately)

-- Dumping structure for table games.ontable
CREATE TABLE IF NOT EXISTS `ontable` (
  `TableCardID` int(11) NOT NULL AUTO_INCREMENT,
  `GameID` int(11) DEFAULT NULL,
  `CardID` int(11) DEFAULT NULL,
  PRIMARY KEY (`TableCardID`),
  KEY `GameID` (`GameID`),
  KEY `CardID` (`CardID`),
  CONSTRAINT `ontable_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `game` (`GameID`),
  CONSTRAINT `ontable_ibfk_2` FOREIGN KEY (`CardID`) REFERENCES `cards` (`CardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.ontable: ~0 rows (approximately)

-- Dumping structure for table games.pack
CREATE TABLE IF NOT EXISTS `pack` (
  `PackCardID` int(11) NOT NULL AUTO_INCREMENT,
  `GameID` int(11) DEFAULT NULL,
  `CardID` int(11) DEFAULT NULL,
  PRIMARY KEY (`PackCardID`),
  UNIQUE KEY `GameID` (`GameID`,`CardID`),
  KEY `CardID` (`CardID`),
  CONSTRAINT `pack_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `game` (`GameID`),
  CONSTRAINT `pack_ibfk_2` FOREIGN KEY (`CardID`) REFERENCES `cards` (`CardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.pack: ~0 rows (approximately)

-- Dumping structure for table games.players
CREATE TABLE IF NOT EXISTS `players` (
  `PlayerID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `GamesWon` int(11) DEFAULT 0,
  `GamesPlayed` int(11) DEFAULT 0,
  `Email` varchar(255) DEFAULT NULL,
  `LoggedIn` tinyint(1) DEFAULT 0,
  `UserType` varchar(10) NOT NULL DEFAULT 'registered',
  `InLobby` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`PlayerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.players: ~0 rows (approximately)

-- Dumping structure for table games.state
CREATE TABLE IF NOT EXISTS `state` (
  `GameID` int(11) NOT NULL,
  `WinnerID` int(11) DEFAULT NULL,
  `GameOver` tinyint(1) DEFAULT NULL,
  `RoundNumber` int(11) DEFAULT 1,
  PRIMARY KEY (`GameID`),
  KEY `WinnerID` (`WinnerID`),
  CONSTRAINT `state_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `game` (`GameID`),
  CONSTRAINT `state_ibfk_2` FOREIGN KEY (`WinnerID`) REFERENCES `players` (`PlayerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.state: ~0 rows (approximately)

-- Dumping structure for table games.sweep
CREATE TABLE IF NOT EXISTS `sweep` (
  `SweepID` int(11) NOT NULL AUTO_INCREMENT,
  `GameID` int(11) DEFAULT NULL,
  `RoundNumber` int(11) DEFAULT NULL,
  `PreviousCards` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`PreviousCards`)),
  PRIMARY KEY (`SweepID`),
  KEY `GameID` (`GameID`),
  CONSTRAINT `sweep_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `game` (`GameID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.sweep: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
