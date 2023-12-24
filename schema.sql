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

-- Dumping structure for table games.board
CREATE TABLE IF NOT EXISTS `board` (
  `ID` int(11) NOT NULL,
  `a` int(11) NOT NULL,
  `b` int(11) NOT NULL,
  `c` int(11) NOT NULL,
  `d` int(11) NOT NULL,
  `b_color` enum('R','B') NOT NULL,
  `card_value` enum('Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King') DEFAULT NULL,
  `is_open` tinyint(1) NOT NULL DEFAULT 0,
  `picked_by` int(11) DEFAULT NULL,
  `player_id` int(11) NOT NULL,
  PRIMARY KEY (`a`,`b`,`c`,`d`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.board: ~0 rows (approximately)

-- Dumping structure for table games.cards
CREATE TABLE IF NOT EXISTS `cards` (
  `CardID` int(11) NOT NULL AUTO_INCREMENT,
  `CardRank` varchar(10) NOT NULL,
  `CardSuit` varchar(10) NOT NULL,
  `CardState` varchar(10) NOT NULL,
  PRIMARY KEY (`CardID`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.cards: ~48 rows (approximately)
INSERT INTO `cards` (`CardID`, `CardRank`, `CardSuit`, `CardState`) VALUES
	(1, 'Ace', 'Hearts', 'Pack'),
	(2, 'Ace', 'Diamonds', 'Pack'),
	(3, 'Ace', 'Clubs', 'Pack'),
	(4, 'Ace', 'Spades', 'Pack'),
	(5, '2', 'Hearts', 'Pack'),
	(6, '2', 'Diamonds', 'Pack'),
	(7, '2', 'Clubs', 'Pack'),
	(8, '2', 'Spades', 'Pack'),
	(9, '3', 'Hearts', 'Pack'),
	(10, '3', 'Diamonds', 'Pack'),
	(11, '3', 'Clubs', 'Pack'),
	(12, '3', 'Spades', 'Pack'),
	(13, '4', 'Hearts', 'Pack'),
	(14, '4', 'Diamonds', 'Pack'),
	(15, '4', 'Clubs', 'Pack'),
	(16, '4', 'Spades', 'Pack'),
	(17, '5', 'Hearts', 'Pack'),
	(18, '5', 'Diamonds', 'Pack'),
	(19, '5', 'Clubs', 'Pack'),
	(20, '5', 'Spades', 'Pack'),
	(21, '6', 'Hearts', 'Pack'),
	(22, '6', 'Diamonds', 'Pack'),
	(23, '6', 'Clubs', 'Pack'),
	(24, '6', 'Spades', 'Pack'),
	(25, '7', 'Hearts', 'Pack'),
	(26, '7', 'Diamonds', 'Pack'),
	(27, '7', 'Clubs', 'Pack'),
	(28, '7', 'Spades', 'Pack'),
	(29, '8', 'Hearts', 'Pack'),
	(30, '8', 'Diamonds', 'Pack'),
	(31, '8', 'Clubs', 'Pack'),
	(32, '8', 'Spades', 'Pack'),
	(33, '9', 'Hearts', 'Pack'),
	(34, '9', 'Diamonds', 'Pack'),
	(35, '9', 'Clubs', 'Pack'),
	(36, '9', 'Spades', 'Pack'),
	(37, '10', 'Hearts', 'Pack'),
	(38, '10', 'Diamonds', 'Pack'),
	(39, '10', 'Clubs', 'Pack'),
	(40, '10', 'Spades', 'Pack'),
	(41, 'Jack', 'Hearts', 'Pack'),
	(42, 'Jack', 'Diamonds', 'Pack'),
	(43, 'Jack', 'Clubs', 'Pack'),
	(44, 'Jack', 'Spades', 'Pack'),
	(45, 'Queen', 'Hearts', 'Pack'),
	(46, 'Queen', 'Diamonds', 'Pack'),
	(47, 'Queen', 'Clubs', 'Pack'),
	(48, 'Queen', 'Spades', 'Pack');

-- Dumping structure for table games.ontable
CREATE TABLE IF NOT EXISTS `ontable` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `StateID` int(11) DEFAULT NULL,
  `CardID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `StateID` (`StateID`),
  KEY `CardID` (`CardID`),
  CONSTRAINT `ontable_ibfk_1` FOREIGN KEY (`StateID`) REFERENCES `state` (`StateID`),
  CONSTRAINT `ontable_ibfk_2` FOREIGN KEY (`CardID`) REFERENCES `cards` (`CardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.ontable: ~0 rows (approximately)

-- Dumping structure for table games.pack
CREATE TABLE IF NOT EXISTS `pack` (
  `PackCardID` int(11) NOT NULL AUTO_INCREMENT,
  `StateID` int(11) DEFAULT NULL,
  `CardID` int(11) DEFAULT NULL,
  PRIMARY KEY (`PackCardID`),
  UNIQUE KEY `StateID` (`StateID`,`CardID`),
  KEY `CardID` (`CardID`),
  CONSTRAINT `pack_ibfk_1` FOREIGN KEY (`StateID`) REFERENCES `state` (`StateID`),
  CONSTRAINT `pack_ibfk_2` FOREIGN KEY (`CardID`) REFERENCES `cards` (`CardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.pack: ~0 rows (approximately)

-- Dumping structure for table games.playercards
CREATE TABLE IF NOT EXISTS `playercards` (
  `PlayerID` int(11) NOT NULL,
  `CardID` int(11) NOT NULL,
  `IsHeld` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`PlayerID`,`CardID`),
  KEY `CardID` (`CardID`),
  CONSTRAINT `playercards_ibfk_1` FOREIGN KEY (`PlayerID`) REFERENCES `players` (`PlayerID`),
  CONSTRAINT `playercards_ibfk_2` FOREIGN KEY (`CardID`) REFERENCES `cards` (`CardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.playercards: ~0 rows (approximately)

-- Dumping structure for table games.players
CREATE TABLE IF NOT EXISTS `players` (
  `PlayerID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `GamesWon` int(11) DEFAULT 0,
  `GamesPlayed` int(11) DEFAULT 0,
  `round` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`PlayerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.players: ~0 rows (approximately)

-- Dumping structure for table games.state
CREATE TABLE IF NOT EXISTS `state` (
  `StateID` int(11) NOT NULL,
  `RoundNumber` int(11) DEFAULT 1,
  `Date_played` date NOT NULL,
  `score` int(11) DEFAULT NULL,
  `TurnOrder` int(11) DEFAULT 1,
  `status` enum('not active','started','ended','aborted') NOT NULL DEFAULT 'not active',
  `ActivePlayerID` int(11) DEFAULT NULL,
  `WinnerID` int(11) DEFAULT NULL,
  `result` enum('player1','player2','draw') DEFAULT NULL,
  `last_change` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`StateID`),
  KEY `WinnerID` (`WinnerID`),
  CONSTRAINT `state_ibfk_1` FOREIGN KEY (`WinnerID`) REFERENCES `players` (`PlayerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.state: ~0 rows (approximately)

-- Dumping structure for table games.sweep
CREATE TABLE IF NOT EXISTS `sweep` (
  `SweepID` int(11) NOT NULL AUTO_INCREMENT,
  `StateID` int(11) DEFAULT NULL,
  `RoundNumber` int(11) DEFAULT NULL,
  `PlayerID` int(11) DEFAULT NULL,
  `CardCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`SweepID`),
  KEY `StateID` (`StateID`),
  KEY `PlayerID` (`PlayerID`),
  CONSTRAINT `sweep_ibfk_1` FOREIGN KEY (`StateID`) REFERENCES `state` (`StateID`),
  CONSTRAINT `sweep_ibfk_2` FOREIGN KEY (`PlayerID`) REFERENCES `players` (`PlayerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table games.sweep: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
