import chess
import smartpy as sp

player1 = sp.test_account("player1")
player2 = sp.test_account("player2")

default_storage = {
    'player1': player1.address,
    'player2': player2.address
}

other_storage = {
    'player1': player2.address,
    'player2': player1.address
}