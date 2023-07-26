# TicTacToe - Example for illustrative purposes only.

import smartpy as sp


@sp.module
def main():
    class TicTacToe(sp.Contract):
        def __init__(self):
            self.data.nbMoves = 0
            self.data.winner = 0
            self.data.draw = False
            self.data.deck = {
                0: {0: 0, 1: 0, 2: 0},
                1: {0: 0, 1: 0, 2: 0},
                2: {0: 0, 1: 0, 2: 0},
            }
            self.data.nextPlayer = 1

        @sp.entrypoint
        def play(self, params):
            assert self.data.winner == 0 and not self.data.draw
            assert params.i >= 0 and params.i < 3
            assert params.j >= 0 and params.j < 3
            assert params.move == self.data.nextPlayer
            assert self.data.deck[params.i][params.j] == 0
            self.data.deck[params.i][params.j] = params.move
            self.data.nbMoves += 1
            self.data.nextPlayer = 3 - self.data.nextPlayer
            self.data.winner = self.checkLine(
                sp.record(winner=self.data.winner, line=self.data.deck[params.i])
            )
            self.data.winner = self.checkLine(
                sp.record(
                    winner=self.data.winner,
                    line={
                        0: self.data.deck[0][params.j],
                        1: self.data.deck[1][params.j],
                        2: self.data.deck[2][params.j],
                    },
                )
            )
            self.data.winner = self.checkLine(
                sp.record(
                    winner=self.data.winner,
                    line={
                        0: self.data.deck[0][0],
                        1: self.data.deck[1][1],
                        2: self.data.deck[2][2],
                    },
                )
            )
            self.data.winner = self.checkLine(
                sp.record(
                    winner=self.data.winner,
                    line={
                        0: self.data.deck[0][2],
                        1: self.data.deck[1][1],
                        2: self.data.deck[2][0],
                    },
                )
            )
            if self.data.nbMoves == 9 and self.data.winner == 0:
                self.data.draw = True

        @sp.private()
        def checkLine(self, winner, line):
            winner_ = winner
            if line[0] != 0 and line[0] == line[1] and line[0] == line[2]:
                winner_ = line[0]
            return winner_


# Tests
if "templates" not in __name__:

    @sp.add_test(name="TicTacToe")
    def test():
        scenario = sp.test_scenario(main)
        scenario.h1("Tic-Tac-Toe")
        # define a contract
        c1 = main.TicTacToe()

        # show its representation
        scenario.h2("A sequence of interactions with a winner")
        scenario += c1
        scenario.h2("Message execution")
        scenario.h3("A first move in the center")
        c1.play(i=1, j=1, move=1)
        scenario.h3("A forbidden move")
        c1.play(i=1, j=1, move=2).run(valid=False)
        scenario.h3("A second move")
        c1.play(i=1, j=2, move=2)
        scenario.h3("Other moves")
        c1.play(i=2, j=1, move=1)
        c1.play(i=2, j=2, move=2)
        scenario.verify(c1.data.winner == 0)
        c1.play(i=0, j=1, move=1)
        scenario.verify(c1.data.winner == 1)
        scenario.p("Player1 has won")
        c1.play(i=0, j=0, move=2).run(valid=False)

        c2 = main.TicTacToe()
        scenario.h2("A sequence of interactions with a draw")
        scenario += c2
        scenario.h2("Message execution")
        scenario.h3("A first move in the center")
        c2.play(i=1, j=1, move=1)
        scenario.h3("A forbidden move")
        c2.play(i=1, j=1, move=2).run(valid=False)
        scenario.h3("A second move")
        c2.play(i=1, j=2, move=2)
        scenario.h3("Other moves")
        c2.play(i=2, j=1, move=1)
        c2.play(i=2, j=2, move=2)
        c2.play(i=0, j=0, move=1)
        c2.play(i=0, j=1, move=2)
        c2.play(i=0, j=2, move=1)
        c2.play(i=2, j=0, move=2)
        c2.play(i=1, j=0, move=1)
