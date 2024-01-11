<?php 
header('Content-Type: application/json');

session_start();
require_once 'dbconnect.php';

$classicDeck = [
  '../images/classic-cards/1-hearts.png',
  '../images/classic-cards/2-hearts.png',
  '../images/classic-cards/3-hearts.png',
  '../images/classic-cards/4-hearts.png',
  '../images/classic-cards/5-hearts.png',
  '../images/classic-cards/6-hearts.png',
  '../images/classic-cards/6-hearts.png',
  '../images/classic-cards/7-hearts.png',
  '../images/classic-cards/8-hearts.png',
  '../images/classic-cards/9-hearts.png',
  '../images/classic-cards/10-hearts.png',
  '../images/classic-cards/king-hearts.png',
  '../images/classic-cards/queen-hearts.png',
  '../images/classic-cards/jack-hearts.png',
  '../images/classic-cards/1-spades.png',
  '../images/classic-cards/2-spades.png',
  '../images/classic-cards/3-spades.png',
  '../images/classic-cards/4-spades.png',
  '../images/classic-cards/5-spades.png',
  '../images/classic-cards/6-spades.png',
  '../images/classic-cards/6-spades.png',
  '../images/classic-cards/7-spades.png',
  '../images/classic-cards/8-spades.png',
  '../images/classic-cards/9-spades.png',
  '../images/classic-cards/10-spades.png',
  '../images/classic-cards/king-spades.png',
  '../images/classic-cards/queen-spades.png',
  '../images/classic-cards/jack-spades.png',
  '../images/classic-cards/1-clubs.png',
  '../images/classic-cards/2-clubs.png',
  '../images/classic-cards/3-clubs.png',
  '../images/classic-cards/4-clubs.png',
  '../images/classic-cards/5-clubs.png',
  '../images/classic-cards/6-clubs.png',
  '../images/classic-cards/7-clubs.png',
  '../images/classic-cards/8-clubs.png',
  '../images/classic-cards/9-clubs.png',
  '../images/classic-cards/10-clubs.png',
  '../images/classic-cards/king-clubs.png',
  '../images/classic-cards/queen-clubs.png',
  '../images/classic-cards/jack-clubs.png',
  '../images/classic-cards/1-diamonds.png',
  '../images/classic-cards/2-diamonds.png',
  '../images/classic-cards/3-diamonds.png',
  '../images/classic-cards/4-diamonds.png',
  '../images/classic-cards/5-diamonds.png',
  '../images/classic-cards/6-diamonds.png',
  '../images/classic-cards/7-diamonds.png',
  '../images/classic-cards/8-diamonds.png',
  '../images/classic-cards/9-diamonds.png',
  '../images/classic-cards/10-diamonds.png',
  '../images/classic-cards/king-diamonds.png',
  '../images/classic-cards/queen-diamonds.png',
  '../images/classic-cards/jack-diamonds.png',
];

$themeDeck = [
  '../images/theme-cards/1-hearts.png',
  '../images/theme-cards/2-hearts.png',
  '../images/theme-cards/3-hearts.png',
  '../images/theme-cards/4-hearts.png',
  '../images/theme-cards/5-hearts.png',
  '../images/theme-cards/6-hearts.png',
  '../images/theme-cards/6-hearts.png',
  '../images/theme-cards/7-hearts.png',
  '../images/theme-cards/8-hearts.png',
  '../images/theme-cards/9-hearts.png',
  '../images/theme-cards/10-hearts.png',
  '../images/theme-cards/king-hearts.png',
  '../images/theme-cards/queen-hearts.png',
  '../images/theme-cards/jack-hearts.png',
  '../images/theme-cards/1-spades.png',
  '../images/theme-cards/2-spades.png',
  '../images/theme-cards/3-spades.png',
  '../images/theme-cards/4-spades.png',
  '../images/theme-cards/5-spades.png',
  '../images/theme-cards/6-spades.png',
  '../images/theme-cards/6-spades.png',
  '../images/theme-cards/7-spades.png',
  '../images/theme-cards/8-spades.png',
  '../images/theme-cards/9-spades.png',
  '../images/theme-cards/10-spades.png',
  '../images/theme-cards/king-spades.png',
  '../images/theme-cards/queen-spades.png',
  '../images/theme-cards/jack-spades.png',
  '../images/theme-cards/1-clubs.png',
  '../images/theme-cards/2-clubs.png',
  '../images/theme-cards/3-clubs.png',
  '../images/theme-cards/4-clubs.png',
  '../images/theme-cards/5-clubs.png',
  '../images/theme-cards/6-clubs.png',
  '../images/theme-cards/7-clubs.png',
  '../images/theme-cards/8-clubs.png',
  '../images/theme-cards/9-clubs.png',
  '../images/theme-cards/10-clubs.png',
  '../images/theme-cards/king-clubs.png',
  '../images/theme-cards/queen-clubs.png',
  '../images/theme-cards/jack-clubs.png',
  '../images/theme-cards/1-diamonds.png',
  '../images/theme-cards/2-diamonds.png',
  '../images/theme-cards/3-diamonds.png',
  '../images/theme-cards/4-diamonds.png',
  '../images/theme-cards/5-diamonds.png',
  '../images/theme-cards/6-diamonds.png',
  '../images/theme-cards/7-diamonds.png',
  '../images/theme-cards/8-diamonds.png',
  '../images/theme-cards/9-diamonds.png',
  '../images/theme-cards/10-diamonds.png',
  '../images/theme-cards/king-diamonds.png',
  '../images/theme-cards/queen-diamonds.png',
  '../images/theme-cards/jack-diamonds.png',
];

function getShuffledDeck($preference) {
    global $classicDeck, $themeDeck;
    $deck = ($preference === 'classic') ? $classicDeck : $themeDeck;
    shuffle($deck);
    return $deck;
}

$playerDeckPreference = $_SESSION['deckPreference'] ?? 'classic'; 

$shuffledDeck = getShuffledDeck($playerDeckPreference);

$topCards = array_slice($shuffledDeck, 0, 8);

$response = [
    'success' => true,
    'cards' => $topCards
];

echo json_encode($response);
?>
