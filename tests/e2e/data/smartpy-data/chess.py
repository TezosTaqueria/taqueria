# Chess
# Example for ILLUSTRATIVE PURPOSE ONLY

import smartpy as sp


@sp.module
def main():
    def matrix(vms):
        mm = {}
        km = 0
        for vvs in vms:
            mv = {}
            kv = 0
            for vv in vvs:
                mv[kv] = vv
                kv += 1
            mm[km] = mv
            km += 1
        return mm

    PAWN = 1
    ROOK = 2
    KNIGHT = 3
    BISHOP = 4
    QUEEN = 5
    KING = 6

    N_PAWN = sp.nat(1)
    N_ROOK = sp.nat(2)
    N_KNIGHT = sp.nat(3)
    N_BISHOP = sp.nat(4)
    N_QUEEN = sp.nat(5)
    N_KING = sp.nat(6)

    t_status: type = sp.variant(
        play=sp.unit,
        force_play=sp.unit,
        finished=sp.string,
        claim_stalemate=sp.unit,
    )

    t_move: type = sp.record(
        f=sp.record(i=sp.int, j=sp.int),
        t=sp.record(i=sp.int, j=sp.int),
        promotion=sp.option[sp.nat],
        claim_repeat=sp.option[
            sp.pair[sp.nat, sp.nat]
        ],  # Claim repeat after the move has been done, params: 2 other identical fullMove number
    )

    t_board_state: type = sp.record(
        castle=sp.map[sp.int, sp.map[sp.int, sp.bool]],
        check=sp.bool,
        deck=sp.map[sp.int, sp.map[sp.int, sp.int]],
        enPassant=sp.option[sp.record(i=sp.int, j=sp.int)],
        fullMove=sp.nat,
        halfMoveClock=sp.nat,
        kings=sp.map[sp.int, sp.record(i=sp.int, j=sp.int)],
        nextPlayer=sp.int,
        # pastMoves is (fullMove, player): blake2b(pack(castle, deck, enPassant))
        pastMoves=sp.map[sp.pair[sp.nat, sp.int], sp.bytes],
    )

    t_get_movable_to_params: type = sp.record(
        i=sp.int,
        j=sp.int,
        player=sp.int,
        deck=sp.map[sp.int, sp.map[sp.int, sp.int]],
        pawn_capturing=sp.bool,
    )

    def sign(x):
        return 1 if x > 0 else (-1 if x < 0 else 0)

    def verify_repeat(param):
        """Verify if the same position has been observed 3 times.

        Two positions are by definition "the same" if:
            - the same types of pieces occupy the same squares
            - the same player has the move
            - the remaining castling rights are the same and the possibility to capture "en passant" is the same.
        The repeated positions not need to occur in succession.

        FullMoves start at 1 and is incremented only after both players_map played one time.
        """
        (board_state_, player, fullMoves) = param
        sp.cast(fullMoves, sp.set[sp.nat])
        assert sp.len(fullMoves) == 3
        for fullMove in fullMoves.elements():
            assert (
                sp.blake2b(
                    sp.pack(
                        (
                            board_state_.castle,
                            board_state_.deck,
                            board_state_.enPassant,
                        )
                    )
                )
                == board_state_.pastMoves[(fullMove, player)]
            ), ("NotSameMove", sp.record(fullMove=fullMove))

    class Chess(sp.Contract):
        def __init__(self, player1, player2):
            self.data.board_state = sp.cast(
                sp.record(
                    castle=({1: {-1: True, 1: True}, -1: {-1: True, 1: True}}),
                    check=False,
                    deck=sp.cast(
                        matrix(
                            [
                                [2, 3, 4, 5, 6, 4, 3, 2],
                                [1, 1, 1, 1, 1, 1, 1, 1],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [-1, -1, -1, -1, -1, -1, -1, -1],
                                [-2, -3, -4, -5, -6, -4, -3, -2],
                            ]
                        ),
                        sp.map[sp.int, sp.map[sp.int, sp.int]],
                    ),
                    enPassant=None,
                    fullMove=sp.nat(1),
                    halfMoveClock=sp.nat(0),
                    kings={-1: sp.record(i=7, j=4), 1: sp.record(i=0, j=4)},
                    nextPlayer=1,
                    pastMoves={
                        (0, -1): sp.bytes(
                            "0xbaf82e0f3ca2b90e482d6b6846873df9fee4e1baf369bc897bcef3b113a359df"
                        )
                    },
                ),
                t_board_state,
            )
            self.data.draw_offer = set()
            self.data.metadata = sp.big_map()
            self.data.players = {player1, player2}
            self.data.players_map = {-1: player2, 1: player1}
            self.data.status = sp.variant.play()

            sp.cast(
                self.data,
                sp.record(
                    board_state=t_board_state,
                    draw_offer=sp.set[sp.address],
                    metadata=sp.big_map[sp.string, sp.bytes],
                    players=sp.set[sp.address],
                    players_map=sp.map[sp.int, sp.address],
                    status=t_status,
                ),
            )

            # list_of_views = [self.build_fen]
            # metadata_base = {
            #     "version": "alpha 0.1",
            #     "description" : (
            #         """Example of a chess game contract.\n
            #         Given as an ILLUSTRATIVE PURPOSE ONLY
            #         """
            #     ),
            #     "interfaces": ["TZIP-016"],
            #     "authors": [
            #         "SmartPy <https://smartpy.io>"
            #     ],
            #     "homepage": "https://smartpy.io",
            #     "views": list_of_views,
            #     "source": {
            #         "tools": ["SmartPy"],
            #         "location": "https://gitlab.com/SmartPy/smartpy/-/blob/master/python/templates/state_channel_games/game_platform.py"
            #     },
            # }
            # self.init_metadata("metadata_base", metadata_base)

        # Offchain views #

        @sp.offchain_view
        def build_fen(self):
            """Return the state of the board chess in the fen standard"""
            fen = ""
            rep = {
                1: "P",
                2: "R",
                3: "N",
                4: "B",
                5: "Q",
                6: "K",
                -1: "p",
                -2: "r",
                -3: "n",
                -4: "b",
                -5: "q",
                -6: "k",
            }
            column = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"}
            to_str = {
                0: "0",
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                6: "6",
                7: "7",
                8: "8",
                9: "9",
            }
            empty = 0
            nb_lines = 0

            # Pieces
            for row in reversed(self.data.board_state.deck.values()):
                for piece in row.values():
                    if piece == 0:
                        empty += 1
                    else:
                        if empty > 0:
                            fen += to_str[empty]
                            empty = 0

                        fen += rep[piece]

                if empty > 0:
                    fen += to_str[empty]
                    empty = 0

                nb_lines += 1
                if nb_lines < 8:
                    fen += "/"

            # Next player
            if self.data.board_state.nextPlayer == 1:
                fen += " w "
            else:
                fen += " b "

            # Castling
            if self.data.board_state.castle[1][1]:
                fen += "K"
            if self.data.board_state.castle[1][-1]:
                fen += "Q"
            if self.data.board_state.castle[-1][1]:
                fen += "k"
            if self.data.board_state.castle[-1][-1]:
                fen += "q"
            if not (
                self.data.board_state.castle[1][1]
                or self.data.board_state.castle[1][-1]
                or self.data.board_state.castle[-1][1]
                or self.data.board_state.castle[-1][-1]
            ):
                fen += "-"

            # En passant
            if self.data.board_state.enPassant.is_some():
                enPassant = self.data.board_state.enPassant.unwrap_some()
                fen += " " + column[enPassant.j]
                fen += to_str[sp.as_nat(enPassant.i + 1)] + " "
            else:
                fen += " - "

            # Halfmove clock
            (q, r) = sp.ediv(self.data.board_state.halfMoveClock, 10).unwrap_some()
            if q > 0:
                fen += to_str[q]
            fen += to_str[r] + " "

            # Fullmove number
            (q2, r2) = sp.ediv(self.data.board_state.fullMove, 10).unwrap_some()
            if q2 > 0:
                (q3, r3) = sp.ediv(q2, 10).unwrap_some()
                if q3 > 0:
                    fen += to_str[q3]
                fen += to_str[r3]
            fen += to_str[r2]

            return fen

        # Private lambdas #

        @sp.private
        def get_movable_to(self, i, j, player, deck, pawn_capturing):
            """Return player's list of pieces that are capable to move on a square.
            ASSUME That the square doesn't contain a piece owned by `player`.
            ASSUME That the square contains a piece owned by opponent if `pawn_capturing` is True
            Don't take into account "En passant".
            Don't take into account if the move/take is illegal because player would be in check after it.

            Params:
                i, j (sp.int): square's coordinates
                player (sp.int): attacking player
                deck: current deck
                pawn_capturing (sp.bool): if pawn_capturing is True: pawns are capturing else: moving
            """
            sp.cast(i, sp.int)
            sp.cast(j, sp.int)
            sp.cast(player, sp.int)
            sp.cast(deck, sp.map[sp.int, sp.map[sp.int, sp.int]])
            sp.cast(pawn_capturing, sp.bool)

            check = sp.cast([], sp.list[sp.record(i=sp.int, j=sp.int)])

            # square attacked by a pawn
            if pawn_capturing:
                for c in [(i + player, j - 1), (i + player, j + 1)]:
                    if (
                        deck.get(sp.fst(c), default={}).get(sp.snd(c), default=0)
                        == PAWN * player
                    ):
                        check.push(sp.record(i=sp.fst(c), j=sp.snd(c)))

            # Pawn can move onto it
            else:
                # move by 1
                c = (i - player, j)
                if deck.get(sp.fst(c), default={}).get(sp.snd(c), default=0) == (
                    PAWN * player
                ):
                    check.push(sp.record(i=sp.fst(c), j=sp.snd(c)))

                # jump
                if (player == 1 and i == 3) or (player == -1 and i == 4):
                    c = (i + player * 2, j)
                    if deck.get(sp.fst(c), default={}).get(sp.snd(c), default=0) == (
                        PAWN * player
                    ):
                        check.push(sp.record(i=sp.fst(c), j=sp.snd(c)))

            # square attacked by a knight
            for c in [
                (i + 2, j - 1),
                (i + 2, j + 1),
                (i + 1, j - 2),
                (i + 1, j + 2),
                (i - 2, j - 1),
                (i - 2, j + 1),
                (i - 1, j - 2),
                (i - 1, j + 2),
            ]:
                if (
                    deck.get(sp.fst(c), default={}).get(sp.snd(c), default=0)
                    == KNIGHT * player
                ):
                    check.push(sp.record(i=sp.fst(c), j=sp.snd(c)))

            # square attacked by a king
            # only verified if the i j square doesn't correspond to player's KING
            if deck.get(i, default={}).get(j, default=0) != (KING * player * -1):
                for c in [
                    (i + 1, j + 1),
                    (i - 1, j - 1),
                    (i + 1, j - 1),
                    (i - 1, j + 1),
                    (i + 0, j + 1),
                    (i + 1, j + 0),
                    (i + 0, j - 1),
                    (i - 1, j + 0),
                ]:
                    if (
                        deck.get(sp.fst(c), default={}).get(sp.snd(c), default=0)
                        == KING * player
                    ):
                        check.push(sp.record(i=sp.fst(c), j=sp.snd(c)))

            @sp.effects
            def check_queen_other(param):
                (i_c, j_c, other, continue_, c_deck, player_, check) = param
                check_ = check
                new_continue = continue_
                if new_continue:
                    c = c_deck.get(i_c, default={}).get(j_c, default=0)
                    if (c != 0) and (c != KING * player_ * -1):
                        if c == QUEEN * player_ or c == other * player_:
                            check_.push(sp.record(i=i_c, j=j_c))
                        else:
                            new_continue = False
                return (check_, new_continue)

            continue_ = True

            # line/column attacked by a rook/queen
            ranges = {0: j, 1: 8 - j, 2: i, 3: 8 - i}
            k = [(0, -1), (0, 1), (-1, 0), (1, 0)]
            n = 0
            for x in k:
                # TODO: replace when unpair in for is possible
                (a, b) = x
                for l in range(1, ranges[n]):
                    (new_check, new_continue) = check_queen_other(
                        (i + l * a, j + l * b, ROOK, continue_, deck, player, check)
                    )
                    check = new_check
                    continue_ = new_continue
                continue_ = True
                n += 1

            # diagonals attacked by a bishop/queen
            ranges = {
                0: sp.min(i, j),
                1: sp.min(8 - i, 8 - j),
                2: sp.min(i, 8 - j),
                3: sp.min(8 - i, j),
            }
            k = [(-1, -1), (1, 1), (-1, 1), (1, -1)]
            n = 0
            for x in k:
                # TODO: replace when unpair in for is possible
                (a, b) = x
                for l in range(1, ranges[n]):
                    assert j + l * b < 9, sp.record(i=i, j=j, l=l, b=b, n=n)
                    (new_check, new_continue) = check_queen_other(
                        (i + l * a, j + l * b, BISHOP, continue_, deck, player, check)
                    )
                    check = new_check
                    continue_ = new_continue
                continue_ = True
                n += 1

            return sp.cast(check, sp.list[sp.record(i=sp.int, j=sp.int)])

        @sp.private
        def move_piece(self, board_state, move, get_movable_to):
            """
            Move a piece from one square to another in the deck
                Change the board_state accordingly (deck, kings, check, castle, enPassant, halfMoveClock, fullMove)
                Return a TBool to True if the game is draw
                Do not detect checkmate
            Return (t_board_state, TBool): new board state and `is_draw`

            """
            is_draw = False
            new_board_state = board_state

            assert move.f.i >= 0 and move.f.i < 8  # from position
            assert move.f.j >= 0 and move.f.j < 8
            assert move.t.i >= 0 and move.t.i < 8  # to position
            assert move.t.j >= 0 and move.t.j < 8
            deltaY = move.t.i - move.f.i
            deltaX = move.t.j - move.f.j
            assert deltaX != 0 or deltaY != 0
            nextPlayer = new_board_state.nextPlayer
            deck = new_board_state.deck
            # Moving its own piece
            assert sign(deck[move.f.i][move.f.j]) == nextPlayer
            # Not moving onto its own piece
            assert sign(deck[move.t.i][move.t.j]) != nextPlayer
            # Not moving onto a king
            assert deck[move.t.i][move.t.j] != KING * nextPlayer

            resetClock = False
            promotion = False

            ###########
            # King move
            if abs(deck[move.f.i][move.f.j]) == N_KING:
                # Castling
                if abs(deltaX) == 2 and deltaY == 0:
                    assert (nextPlayer == 1 and move.f.i == 0 and move.f.j == 4) or (
                        nextPlayer == -1 and move.f.i == 7 and move.f.j == 4
                    )
                    assert new_board_state.castle[nextPlayer][sign(deltaX)]
                    if deltaX > 0:
                        deck[move.t.i][7] = 0
                    else:
                        deck[move.t.i][0] = 0
                    deck[move.t.i][move.t.j - sign(deltaX)] = ROOK * nextPlayer

                # Standard move
                else:
                    assert abs(deltaX) <= 1 and abs(deltaY) <= 1

                new_board_state.kings[nextPlayer] = sp.record(i=move.t.i, j=move.t.j)
                new_board_state.castle[nextPlayer] = {-1: False, 1: False}

            ###########
            # Rook move

            if abs(deck[move.f.i][move.f.j]) == N_ROOK:
                assert deltaX == 0 or deltaY == 0
                for k in range(1, sp.to_int(sp.max(abs(deltaX), abs(deltaY))) - 1):
                    dx = sign(deltaX)
                    dy = sign(deltaY)
                    assert deck[move.f.i + k * dy][move.f.j + k * dx] == 0

                left_side = (nextPlayer == 1 and move.f.i == 0 and move.f.j == 0) or (
                    nextPlayer == -1 and move.f.i == 7 and move.f.j == 0
                )
                right_side = (nextPlayer == 1 and move.f.i == 0 and move.f.j == 7) or (
                    nextPlayer == -1 and move.f.i == 7 and move.f.j == 7
                )

                if left_side:
                    new_board_state.castle[nextPlayer][-1] = False
                if right_side:
                    new_board_state.castle[nextPlayer][1] = False

            ############
            # Queen move

            if abs(deck[move.f.i][move.f.j]) == N_QUEEN:
                assert deltaX == 0 or deltaY == 0 or abs(deltaX) == abs(deltaY)
                for k in range(1, sp.to_int(sp.max(abs(deltaX), abs(deltaY))) - 1):
                    dx = sign(deltaX)
                    dy = sign(deltaY)
                    assert deck[move.f.i + k * dy][move.f.j + k * dx] == 0

            #############
            # Bishop move

            if abs(deck[move.f.i][move.f.j]) == N_BISHOP:
                assert abs(deltaX) == abs(deltaY)
                for k in range(1, sp.to_int(sp.max(abs(deltaX), abs(deltaY))) - 1):
                    dx = sign(deltaX)
                    dy = sign(deltaY)
                    assert deck[move.f.i + k * dy][move.f.j + k * dx] == 0

            #############
            # Knight move
            if abs(deck[move.f.i][move.f.j]) == N_KNIGHT:
                assert abs(deltaX * deltaY) == 2

            ###########
            # Pawn move

            # Pawn move must be after every other
            # Because of the promotion system
            if abs(deck[move.f.i][move.f.j]) == N_PAWN:
                assert (
                    # En passant
                    (
                        abs(deltaX) == 1
                        and deltaY * nextPlayer == 1
                        and board_state.enPassant.is_some()
                        and move.f.i == board_state.enPassant.unwrap_some().i
                        and move.f.j == board_state.enPassant.unwrap_some().j
                    )
                    # Jump
                    or (
                        deltaX == 0
                        and deltaY * nextPlayer == 2
                        and deck[move.t.i - nextPlayer][move.t.j] == 0
                    )
                    # Move
                    or (deltaX == 0 and deltaY * nextPlayer == 1)
                    # Take
                    or (
                        abs(deltaX) == 1
                        and deltaY * nextPlayer == 1
                        and deck[move.t.i][move.t.j] != nextPlayer
                    )
                )

                if deltaY * nextPlayer == 2:
                    new_board_state.enPassant = sp.Some(
                        sp.record(i=move.t.i - nextPlayer, j=move.t.j)
                    )
                else:
                    new_board_state.enPassant = None
                resetClock = True
                # Promotion
                if move.t.i == 7 or move.t.i == 0:
                    promotion = True
            else:
                new_board_state.enPassant = None

            king = new_board_state.kings[nextPlayer]

            if deck[move.t.i][move.t.j] != 0:
                resetClock = True

            if promotion:
                piece = move.promotion.unwrap_some()
                assert piece > 1 and piece < 6
                deck[move.t.i][move.t.j] = sp.mul(nextPlayer, piece)
            else:
                assert move.promotion.is_none()
                deck[move.t.i][move.t.j] = deck[move.f.i][move.f.j]
            deck[move.f.i][move.f.j] = 0

            # Not in check after the move
            assert (
                sp.len(
                    get_movable_to(
                        sp.record(
                            i=king.i,
                            j=king.j,
                            player=nextPlayer * -1,
                            deck=deck,
                            pawn_capturing=True,
                        )
                    )
                )
                == 0
            )

            # Register move
            new_board_state.pastMoves[
                (new_board_state.fullMove, nextPlayer)
            ] = sp.blake2b(
                sp.pack((new_board_state.castle, deck, new_board_state.enPassant))
            )
            new_board_state.deck = deck

            if move.claim_repeat.is_some():
                (fullMove1, fullMove2) = move.claim_repeat.unwrap_some()
                verify_repeat(
                    (
                        new_board_state,
                        nextPlayer,
                        {fullMove1, fullMove2, new_board_state.fullMove},
                    )
                )
                is_draw = True

            nextPlayer *= -1
            if nextPlayer == 1:
                new_board_state.fullMove += 1
            if resetClock:
                new_board_state.halfMoveClock = 0
            else:
                new_board_state.halfMoveClock += 1

            king = new_board_state.kings[nextPlayer]

            if (
                sp.len(
                    get_movable_to(
                        sp.record(
                            i=king.i,
                            j=king.j,
                            player=nextPlayer * -1,
                            deck=deck,
                            pawn_capturing=True,
                        )
                    )
                )
                > 0
            ):
                new_board_state.check = True

            else:
                new_board_state.check = False

            if new_board_state.halfMoveClock > 49:
                is_draw = True

            return (new_board_state, is_draw)

        @sp.private
        def is_checkmate(self, board_state, get_movable_to):
            """Return sp.bool(True) if the board_state represents a checkmate"""

            def not_defending(param):
                (
                    defending_squares,
                    attacking_square,
                    deck,
                    initial_king,
                    nextPlayer,
                    checkmate,
                    get_movable_to_,
                ) = param
                """ Return True if none of the defending_squares can be moved to attacking_square to remove the king's check (without verifying move rules)"""
                checkmate_ = checkmate
                for defending_square in defending_squares:
                    if checkmate:
                        test_deck = deck
                        test_deck[attacking_square.i][attacking_square.j] = test_deck[
                            defending_square.i
                        ][defending_square.j]
                        test_deck[defending_square.i][defending_square.j] = 0
                        king = initial_king
                        if (
                            test_deck[attacking_square.i][attacking_square.j]
                            == KING * nextPlayer
                        ):
                            king = sp.record(i=attacking_square.i, j=attacking_square.j)
                        # Is not in check?
                        if (
                            sp.len(
                                get_movable_to_(
                                    sp.record(
                                        i=king.i,
                                        j=king.j,
                                        player=nextPlayer * -1,
                                        deck=test_deck,
                                        pawn_capturing=True,
                                    )
                                )
                            )
                            == 0
                        ):
                            checkmate_ = False
                return checkmate_

            checkmate = True

            nextPlayer = board_state.nextPlayer
            king = board_state.kings[nextPlayer]
            deck = board_state.deck

            # Are we in check?
            attacking_squares = get_movable_to(
                sp.record(
                    i=king.i,
                    j=king.j,
                    player=nextPlayer * -1,
                    deck=deck,
                    pawn_capturing=True,
                )
            )
            if sp.len(attacking_squares) == 0:
                checkmate = False
            else:
                # Can the King escape
                for x in [
                    (1, -1),
                    (1, 0),
                    (1, 1),
                    (0, 1),
                    (-1, 1),
                    (-1, 0),
                    (-1, -1),
                    (0, -1),
                ]:
                    # TODO: replace when unpair in for is possible
                    (i, j) = x
                    if checkmate:
                        move_i = king.i + i
                        move_j = king.j + j
                        destination_piece = deck.get(move_i, default={}).get(
                            move_j, default=nextPlayer * PAWN
                        )
                        # Is this destination valid?
                        if (
                            destination_piece == 0
                            or sign(destination_piece) != nextPlayer
                        ):
                            # Would the king be in check if he moves to it?
                            if (
                                sp.len(
                                    get_movable_to(
                                        sp.record(
                                            i=move_i,
                                            j=move_j,
                                            player=nextPlayer * -1,
                                            deck=deck,
                                            pawn_capturing=True,
                                        )
                                    )
                                )
                                == 0
                            ):
                                checkmate = False

                if checkmate:
                    # Can we capture the attacking square or move a piece to block the attack?
                    if sp.len(attacking_squares) == 1:
                        # There is no move except escape to protect against 2 attacking pieces
                        for attacking_square in attacking_squares:
                            # Can we capture the attacking square?
                            defending_squares = get_movable_to(
                                sp.record(
                                    i=attacking_square.i,
                                    j=attacking_square.j,
                                    player=nextPlayer * -1,
                                    deck=deck,
                                    pawn_capturing=True,
                                )
                            )

                            checkmate = not_defending(
                                (
                                    defending_squares,
                                    attacking_square,
                                    deck,
                                    king,
                                    nextPlayer,
                                    checkmate,
                                    get_movable_to,
                                )
                            )

                            if checkmate:
                                # Can we move a piece to block the attack?
                                # KNIGHT and PAWN cannot be blocked by moving a piece between them and the king
                                if (
                                    deck[attacking_square.i][attacking_square.j]
                                    != KNIGHT * nextPlayer * -1
                                ) and (
                                    deck[attacking_square.i][attacking_square.j]
                                    != PAWN * nextPlayer * -1
                                ):
                                    if attacking_square.i == king.i:
                                        # Can we put an obstructing piece in this column?
                                        for obstructing_j in range(
                                            sp.min(king.j, attacking_square.j),
                                            sp.max(king.j, attacking_square.j),
                                        ):
                                            defending_squares = get_movable_to(
                                                sp.record(
                                                    i=king.i,
                                                    j=obstructing_j,
                                                    player=nextPlayer,
                                                    deck=deck,
                                                    pawn_capturing=False,
                                                )
                                            )
                                            checkmate = not_defending(
                                                (
                                                    defending_squares,
                                                    sp.record(
                                                        i=king.i, j=obstructing_j
                                                    ),
                                                    deck,
                                                    king,
                                                    nextPlayer,
                                                    checkmate,
                                                    get_movable_to,
                                                )
                                            )

                                    else:
                                        if attacking_square.j == king.j:
                                            # Can we put an obstructing piece in this line?
                                            for obstructing_i in range(
                                                sp.min(king.i, attacking_square.i),
                                                sp.max(king.i, attacking_square.i),
                                            ):
                                                defending_squares = get_movable_to(
                                                    sp.record(
                                                        i=obstructing_i,
                                                        j=king.j,
                                                        player=nextPlayer,
                                                        deck=deck,
                                                        pawn_capturing=False,
                                                    )
                                                )
                                                checkmate = not_defending(
                                                    (
                                                        defending_squares,
                                                        sp.record(
                                                            i=obstructing_i, j=king.j
                                                        ),
                                                        deck,
                                                        king,
                                                        nextPlayer,
                                                        checkmate,
                                                        get_movable_to,
                                                    )
                                                )

                                        else:
                                            # Can we put an obstructing piece in this diagonal?
                                            d = sp.to_int(
                                                abs(king.i - attacking_square.i)
                                            )
                                            vec_i = sign(attacking_square.i - king.i)
                                            vec_j = sign(attacking_square.j - king.j)

                                            for i in range(1, d):
                                                obstructing_i = king.i + vec_i * i
                                                obstructing_j = king.j + vec_j * i
                                                defending_squares = get_movable_to(
                                                    sp.record(
                                                        i=obstructing_i,
                                                        j=obstructing_j,
                                                        player=nextPlayer,
                                                        deck=deck,
                                                        pawn_capturing=False,
                                                    )
                                                )
                                                checkmate = not_defending(
                                                    (
                                                        defending_squares,
                                                        sp.record(
                                                            i=obstructing_i,
                                                            j=obstructing_j,
                                                        ),
                                                        deck,
                                                        king,
                                                        nextPlayer,
                                                        checkmate,
                                                        get_movable_to,
                                                    )
                                                )
            return checkmate

        # entrypoints #

        @sp.entrypoint
        def giveup(self):
            """Giveup the game."""
            assert not self.data.status.is_variant.finished()
            if sp.sender == self.data.players_map[-1]:
                self.data.status = sp.variant.finished("player_1_won")
            else:
                if sp.sender == self.data.players_map[1]:
                    self.data.status = sp.variant.finished("player_2_won")
                else:
                    raise "Wrong player"

        @sp.entrypoint
        def threefold_repetition_claim(self, fullMove1, fullMove2):
            """Claim draw by 3 repeated moves by giving 2 fullMove numbers identical to the current move.

            A player may claim a draw if the same position occured three times.
            Two positions are by definition "the same" if:
                - the same types of pieces occupy the same squares
                - the same player has the move
                - the remaining castling rights are the same and the possibility to capture en passant is the same.
            The repeated positions need not occur in succession.

            The `threefold_repetition_claim` entrypoint can only be called before playing a move.
            Players can claim threefold repetition after having done a move by using the `play` entrypoint.

            Fullmove start at 1 and is incremented only after both players_map played one time.
            """
            assert not self.data.status.is_variant.finished(), "Game finished"
            assert (
                self.data.players_map[self.data.board_state.nextPlayer] == sp.sender
            ), "Wrong player"
            previousFullMove = (
                sp.as_nat(self.data.board_state.fullMove - 1)
                if self.data.board_state.nextPlayer == 1
                else self.data.board_state.fullMove
            )
            verify_repeat(
                (
                    self.data.board_state,
                    self.data.board_state.nextPlayer * -1,
                    {fullMove1, fullMove2, previousFullMove},
                )
            )
            self.data.status = sp.variant.finished("draw")

        @sp.entrypoint
        def offer_draw(self):
            """Offer / acccept a draw agrement
            A player may offer a draw at any stage.
            If the opponent accepts, the game is a draw.
            A draw offering cannot be retracted.
            A draw offering is denied by calling the `deny_draw` entrypoint  or by playing a move.
            """
            assert not self.data.status.is_variant.finished(), "Game finished"
            assert self.data.players.contains(sp.sender), "Wrong player"
            self.data.draw_offer.add(sp.sender)
            if sp.len(self.data.draw_offer) == 2:
                self.data.status = sp.variant.finished("draw")

        @sp.entrypoint
        def claim_stalemate(self):
            assert (
                sp.sender == self.data.players_map[self.data.board_state.nextPlayer]
            ), "Wrong player"
            assert self.data.status.is_variant.play()
            self.data.status = sp.variant.claim_stalemate()
            self.data.board_state.nextPlayer *= -1

        @sp.entrypoint
        def answer_stalemate(self, answer):
            sp.cast(answer, sp.variant(accept=sp.unit, refuse=t_move))
            assert (
                sp.sender == self.data.players_map[self.data.board_state.nextPlayer]
            ), "Wrong player"
            assert self.data.status.is_variant.claim_stalemate()
            with sp.match(answer):
                with sp.case.accept:
                    self.data.status = sp.variant.finished("draw")
                with sp.case.refuse as refuse_move:
                    # TODO: check if we need to update board_state with return value.
                    _ = self.move_piece(
                        sp.record(
                            board_state=self.data.board_state,
                            move=refuse_move,
                            get_movable_to=self.get_movable_to,
                        )
                    )
                    self.data.board_state.nextPlayer *= -1
                    self.data.status = sp.variant.force_play()

        @sp.entrypoint
        def play(self, move):
            """
            move: Record(f: Record(i: Nat, j: Nat), t: Record(i: Nat, j: Nat))
                f: from square
                t: destination square

            claim_repeat: Option(TPair(nat, nat))
                Perform a threefold repetition claim after the move has been done
                params: 2 other identical fullMove number

            promotion: Option(Nat):
                2: ROOK
                3: KNIGHT
                4: BISHOP
                5: QUEEN
            """
            assert (
                sp.sender == self.data.players_map[self.data.board_state.nextPlayer]
            ), "Wrong player"
            assert (
                self.data.status.is_variant.play()
                or self.data.status.is_variant.force_play()
            )
            (board_state, is_draw) = self.move_piece(
                sp.record(
                    board_state=self.data.board_state,
                    move=move,
                    get_movable_to=self.get_movable_to,
                )
            )
            new_board_state = board_state
            new_board_state.nextPlayer *= -1
            self.data.board_state = new_board_state
            if is_draw:
                self.data.status = sp.variant.finished("draw")
            self.data.draw_offer = set()

        @sp.entrypoint
        def claim_checkmate(self):
            board_state = self.data.board_state
            if self.is_checkmate(
                sp.record(board_state=board_state, get_movable_to=self.get_movable_to)
            ):
                if board_state.nextPlayer == 1:
                    self.data.status = sp.variant.finished("player_2_won")
                else:
                    self.data.status = sp.variant.finished("player_1_won")
            else:
                raise "NotCheckmate"


# Tests
if "main" in __name__:
    player1 = sp.test_account("player1")
    player2 = sp.test_account("player2")

    def build_fen(c):
        return sp.View(c, "build_fen")()

    def play(f, t, promotion=sp.none, claim_repeat=sp.none):
        return sp.record(f=f, t=t, promotion=promotion, claim_repeat=claim_repeat)

    @sp.add_test()
    def test():
        sc = sp.test_scenario("Chess - Adams Michael vs Sedgwick David", main)
        c1 = main.Chess(player1.address, player2.address)

        sc.h1(
            " Adams, Michael vs. Sedgwick, David 1-0 London: Lloyds Bank op: 1984.??.??"
        )
        sc += c1
        # Adams, Michael vs. Sedgwick, David 1-0
        # London: Lloyds Bank op: 1984.??.??
        sc.verify(
            build_fen(c1) == "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        )
        c1.play(play(f=sp.record(i=1, j=4), t=sp.record(i=3, j=4)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
        )
        c1.play(play(f=sp.record(i=6, j=4), t=sp.record(i=5, j=4)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
        )
        c1.play(play(f=sp.record(i=1, j=3), t=sp.record(i=3, j=3)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2"
        )
        c1.play(play(f=sp.record(i=6, j=3), t=sp.record(i=4, j=3)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3"
        )
        c1.play(play(f=sp.record(i=0, j=1), t=sp.record(i=1, j=3)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR b KQkq - 1 3"
        )
        c1.play(play(f=sp.record(i=7, j=6), t=sp.record(i=5, j=5)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/8/PPPN1PPP/R1BQKBNR w KQkq - 2 4"
        )
        c1.play(play(f=sp.record(i=3, j=4), t=sp.record(i=4, j=4)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "rnbqkb1r/ppp2ppp/4pn2/3pP3/3P4/8/PPPN1PPP/R1BQKBNR b KQkq - 0 4"
        )
        c1.play(play(f=sp.record(i=5, j=5), t=sp.record(i=6, j=3)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "rnbqkb1r/pppn1ppp/4p3/3pP3/3P4/8/PPPN1PPP/R1BQKBNR w KQkq - 1 5"
        )
        c1.play(play(f=sp.record(i=1, j=5), t=sp.record(i=3, j=5)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "rnbqkb1r/pppn1ppp/4p3/3pP3/3P1P2/8/PPPN2PP/R1BQKBNR b KQkq f3 0 5"
        )
        c1.play(play(f=sp.record(i=6, j=2), t=sp.record(i=4, j=2)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "rnbqkb1r/pp1n1ppp/4p3/2ppP3/3P1P2/8/PPPN2PP/R1BQKBNR w KQkq c6 0 6"
        )
        c1.play(play(f=sp.record(i=1, j=2), t=sp.record(i=2, j=2)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "rnbqkb1r/pp1n1ppp/4p3/2ppP3/3P1P2/2P5/PP1N2PP/R1BQKBNR b KQkq - 0 6"
        )
        c1.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P1P2/2P5/PP1N2PP/R1BQKBNR w KQkq - 1 7"
        )
        c1.play(play(f=sp.record(i=1, j=3), t=sp.record(i=2, j=5)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P1P2/2P2N2/PP4PP/R1BQKBNR b KQkq - 2 7"
        )
        c1.play(play(f=sp.record(i=4, j=2), t=sp.record(i=3, j=3)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "r1bqkb1r/pp1n1ppp/2n1p3/3pP3/3p1P2/2P2N2/PP4PP/R1BQKBNR w KQkq - 0 8"
        )
        c1.play(play(f=sp.record(i=2, j=2), t=sp.record(i=3, j=3)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "r1bqkb1r/pp1n1ppp/2n1p3/3pP3/3P1P2/5N2/PP4PP/R1BQKBNR b KQkq - 0 8"
        )
        c1.play(play(f=sp.record(i=6, j=5), t=sp.record(i=5, j=5)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "r1bqkb1r/pp1n2pp/2n1pp2/3pP3/3P1P2/5N2/PP4PP/R1BQKBNR w KQkq - 0 9"
        )
        c1.play(play(f=sp.record(i=0, j=5), t=sp.record(i=2, j=3)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "r1bqkb1r/pp1n2pp/2n1pp2/3pP3/3P1P2/3B1N2/PP4PP/R1BQK1NR b KQkq - 1 9"
        )
        c1.play(play(f=sp.record(i=7, j=5), t=sp.record(i=3, j=1)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "r1bqk2r/pp1n2pp/2n1pp2/3pP3/1b1P1P2/3B1N2/PP4PP/R1BQK1NR w KQkq - 2 10"
        )
        #     sc.verify(c1.data.board_state.check == True)
        c1.play(play(f=sp.record(i=0, j=2), t=sp.record(i=1, j=3)), _sender=player1)
        #     sc.verify(c1.data.board_state.check == False)
        sc.verify(
            build_fen(c1)
            == "r1bqk2r/pp1n2pp/2n1pp2/3pP3/1b1P1P2/3B1N2/PP1B2PP/R2QK1NR b KQkq - 3 10"
        )
        c1.play(play(f=sp.record(i=7, j=3), t=sp.record(i=5, j=1)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "r1b1k2r/pp1n2pp/1qn1pp2/3pP3/1b1P1P2/3B1N2/PP1B2PP/R2QK1NR w KQkq - 4 11"
        )
        c1.play(play(f=sp.record(i=0, j=6), t=sp.record(i=1, j=4)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "r1b1k2r/pp1n2pp/1qn1pp2/3pP3/1b1P1P2/3B1N2/PP1BN1PP/R2QK2R b KQkq - 5 11"
        )
        c1.play(play(f=sp.record(i=5, j=5), t=sp.record(i=4, j=4)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "r1b1k2r/pp1n2pp/1qn1p3/3pp3/1b1P1P2/3B1N2/PP1BN1PP/R2QK2R w KQkq - 0 12"
        )
        c1.play(play(f=sp.record(i=3, j=5), t=sp.record(i=4, j=4)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "r1b1k2r/pp1n2pp/1qn1p3/3pP3/1b1P4/3B1N2/PP1BN1PP/R2QK2R b KQkq - 0 12"
        )
        c1.play(
            play(f=sp.record(i=7, j=4), t=sp.record(i=7, j=6)), _sender=player2
        )  # Castle
        sc.verify(
            build_fen(c1)
            == "r1b2rk1/pp1n2pp/1qn1p3/3pP3/1b1P4/3B1N2/PP1BN1PP/R2QK2R w KQ - 1 13"
        )
        c1.play(play(f=sp.record(i=1, j=0), t=sp.record(i=2, j=0)), _sender=player1)
        c1.play(play(f=sp.record(i=3, j=1), t=sp.record(i=6, j=4)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=3), t=sp.record(i=1, j=2)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=5), t=sp.record(i=2, j=5)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=6), t=sp.record(i=2, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=2), t=sp.record(i=3, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=4), t=sp.record(i=3, j=3)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=1), t=sp.record(i=3, j=3)), _sender=player2)
        c1.play(
            play(f=sp.record(i=0, j=4), t=sp.record(i=0, j=2)), _sender=player1
        )  # O-O-O
        sc.verify(
            build_fen(c1)
            == "r1b3k1/pp1nb1pp/4p3/3pP3/3q4/P2B1P2/1PQB3P/2KR3R b - - 1 17"
        )
        c1.play(play(f=sp.record(i=6, j=3), t=sp.record(i=4, j=4)), _sender=player2)
        c1.play(
            play(f=sp.record(i=2, j=3), t=sp.record(i=6, j=7)), _sender=player1
        )  # check
        sc.verify(
            build_fen(c1) == "r1b3k1/pp2b1pB/4p3/3pn3/3q4/P4P2/1PQB3P/2KR3R b - - 0 18"
        )
        sc.verify(c1.data.board_state.check == True)
        c1.play(play(f=sp.record(i=7, j=6), t=sp.record(i=7, j=7)), _sender=player2)
        sc.verify(c1.data.board_state.check == False)
        c1.play(play(f=sp.record(i=0, j=2), t=sp.record(i=0, j=1)), _sender=player1)
        c1.play(play(f=sp.record(i=3, j=3), t=sp.record(i=3, j=7)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=3), t=sp.record(i=2, j=2)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=4), t=sp.record(i=5, j=5)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=5), t=sp.record(i=3, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=4, j=4), t=sp.record(i=3, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=2), t=sp.record(i=5, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=3, j=7), t=sp.record(i=5, j=5)), _sender=player2)
        c1.play(play(f=sp.record(i=6, j=7), t=sp.record(i=2, j=3)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=1), t=sp.record(i=4, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=2), t=sp.record(i=1, j=4)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=2), t=sp.record(i=6, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=7), t=sp.record(i=0, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=3), t=sp.record(i=7, j=4)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=3), t=sp.record(i=0, j=4)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=4), t=sp.record(i=6, j=5)), _sender=player2)
        sc.verify(
            build_fen(c1) == "r6k/p4bp1/4pq2/1p1p4/2n2P2/P2B4/1P2Q2P/1K2R1R1 w - - 6 27"
        )
        c1.play(play(f=sp.record(i=0, j=6), t=sp.record(i=2, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=0), t=sp.record(i=7, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=4), t=sp.record(i=0, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=3, j=2), t=sp.record(i=5, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=6), t=sp.record(i=6, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=3), t=sp.record(i=4, j=5)), _sender=player2)
        c1.play(play(f=sp.record(i=6, j=6), t=sp.record(i=4, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=2), t=sp.record(i=6, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=3), t=sp.record(i=4, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=4), t=sp.record(i=4, j=5)), _sender=player2)
        c1.play(
            play(f=sp.record(i=4, j=6), t=sp.record(i=4, j=7)), _sender=player1
        )  # Abandon
        sc.show(build_fen(c1))
        sc.verify(
            build_fen(c1) == "7k/p1r2b2/5q2/1p1p1p1R/5P2/P7/1P2Q2P/1K4R1 b - - 1 32"
        )
        sc.verify(c1.data.board_state.check == True)
        c1.play(play(f=sp.record(i=6, j=5), t=sp.record(i=4, j=7)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=4), t=sp.record(i=4, j=7)), _sender=player1)
        sc.show(build_fen(c1))
        c1.play(play(f=sp.record(i=5, j=5), t=sp.record(i=5, j=7)), _sender=player2)
        c1.play(play(f=sp.record(i=4, j=7), t=sp.record(i=5, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=2), t=sp.record(i=6, j=7)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=7), t=sp.record(i=7, j=5)), _sender=player1)

    @sp.add_test()
    def test():
        c1 = main.Chess(player1.address, player2.address)

        sc = sp.test_scenario("Chess - Vachier Lagrave Maxime vs Bacrot Etienne", main)
        sc.h1("Vachier Lagrave,M (2579) vs. Bacrot,E (2705) 1/2-1/2")
        sc += c1

        # Vachier Lagrave,M (2579) vs. Bacrot,E (2705) 1/2-1/2
        c1.play(play(f=sp.record(i=1, j=4), t=sp.record(i=3, j=4)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=4), t=sp.record(i=4, j=4)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=6), t=sp.record(i=2, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=5), t=sp.record(i=4, j=1)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=0), t=sp.record(i=5, j=0)), _sender=player2)
        c1.play(play(f=sp.record(i=4, j=1), t=sp.record(i=5, j=2)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=3), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=4), t=sp.record(i=0, j=6)), _sender=player1)
        sc.verify(
            build_fen(c1)
            == "r1bqkbnr/1pp2ppp/p1p5/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 5"
        )
        c1.play(play(f=sp.record(i=6, j=5), t=sp.record(i=5, j=5)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=3), t=sp.record(i=3, j=3)), _sender=player1)
        c1.play(play(f=sp.record(i=4, j=4), t=sp.record(i=3, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=5), t=sp.record(i=3, j=3)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=2), t=sp.record(i=4, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=3, j=3), t=sp.record(i=2, j=1)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=3), t=sp.record(i=0, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=5), t=sp.record(i=0, j=3)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=2), t=sp.record(i=3, j=6)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=5), t=sp.record(i=2, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=3, j=6), t=sp.record(i=6, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=1), t=sp.record(i=2, j=2)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=4), t=sp.record(i=7, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=2), t=sp.record(i=3, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=4, j=2), t=sp.record(i=3, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=1), t=sp.record(i=4, j=0)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=5), t=sp.record(i=4, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=6), t=sp.record(i=0, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=1), t=sp.record(i=4, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=0), t=sp.record(i=3, j=0)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=6), t=sp.record(i=6, j=4)), _sender=player2)
        sc.verify(
            build_fen(c1)
            == "2kr3r/2pbn1pp/p4p2/Npb5/P1p1PB2/2N2P2/1PP3PP/R2R1K2 w - - 1 16"
        )
        c1.play(play(f=sp.record(i=3, j=0), t=sp.record(i=4, j=1)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=3), t=sp.record(i=4, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=3, j=5), t=sp.record(i=1, j=3)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=7), t=sp.record(i=7, j=4)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=2), t=sp.record(i=4, j=1)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=0), t=sp.record(i=4, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=1), t=sp.record(i=2, j=1)), _sender=player1)
        c1.play(play(f=sp.record(i=3, j=2), t=sp.record(i=2, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=4, j=0), t=sp.record(i=2, j=1)), _sender=player1)
        c1.play(play(f=sp.record(i=4, j=2), t=sp.record(i=5, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=3), t=sp.record(i=2, j=2)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=3), t=sp.record(i=0, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=0), t=sp.record(i=0, j=3)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=2), t=sp.record(i=4, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=3), t=sp.record(i=5, j=3)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=1), t=sp.record(i=6, j=0)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=3), t=sp.record(i=5, j=0)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=2), t=sp.record(i=6, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=0), t=sp.record(i=5, j=4)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=1), t=sp.record(i=6, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=3, j=4), t=sp.record(i=4, j=4)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=2), t=sp.record(i=6, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=4), t=sp.record(i=5, j=0)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=4), t=sp.record(i=7, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=4, j=4), t=sp.record(i=5, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=6), t=sp.record(i=5, j=5)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=0), t=sp.record(i=5, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=2), t=sp.record(i=5, j=3)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=5), t=sp.record(i=5, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=4), t=sp.record(i=6, j=4)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=7), t=sp.record(i=4, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=3), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=2), t=sp.record(i=0, j=4)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=3), t=sp.record(i=3, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=4), t=sp.record(i=1, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=3, j=2), t=sp.record(i=2, j=4)), _sender=player2)
        c1.play(play(f=sp.record(i=1, j=5), t=sp.record(i=2, j=4)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=4), t=sp.record(i=2, j=4)), _sender=player2)
        c1.play(play(f=sp.record(i=4, j=7), t=sp.record(i=6, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=0), t=sp.record(i=5, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=6, j=7), t=sp.record(i=5, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=2), t=sp.record(i=6, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=7), t=sp.record(i=6, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=2), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=6, j=7), t=sp.record(i=5, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=2), t=sp.record(i=6, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=7), t=sp.record(i=6, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=2), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=6, j=7), t=sp.record(i=5, j=7)), _sender=player1)

        sc.verify(build_fen(c1) == "8/8/1bk4R/1pp5/8/1N2rP2/2P3PP/5K2 b - - 10 40")

    @sp.add_test()
    def test():
        c1 = main.Chess(player1.address, player2.address)

        sc = sp.test_scenario("Chess - Promotion", main)
        sc.h1("Promotion")
        sc += c1

        c1.play(play(f=sp.record(i=1, j=6), t=sp.record(i=3, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=1), t=sp.record(i=4, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=3, j=6), t=sp.record(i=4, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=4, j=1), t=sp.record(i=3, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=4, j=6), t=sp.record(i=5, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=3, j=1), t=sp.record(i=2, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=5, j=6), t=sp.record(i=6, j=7)), _sender=player1)
        c1.play(play(f=sp.record(i=2, j=1), t=sp.record(i=1, j=0)), _sender=player2)
        c1.play(
            play(f=sp.record(i=6, j=7), t=sp.record(i=7, j=6), promotion=sp.some(5)),
            _sender=player1,
        )
        c1.play(
            play(f=sp.record(i=1, j=0), t=sp.record(i=0, j=1), promotion=sp.some(3)),
            _sender=player2,
        )

        sc.show(build_fen(c1))
        sc.verify(
            build_fen(c1) == "rnbqkbQr/p1ppppp1/8/8/8/8/1PPPPP1P/RnBQKBNR w KQkq - 0 6"
        )

    @sp.add_test()
    def test():
        c1 = main.Chess(player1.address, player2.address)

        sc = sp.test_scenario("Chess - 3 times repeat", main)
        sc.h1("3 times repeat")
        sc.h2("After move")
        sc += c1

        c1.play(play(f=sp.record(i=0, j=6), t=sp.record(i=2, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=5), t=sp.record(i=0, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=2), t=sp.record(i=7, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=6), t=sp.record(i=2, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=5), t=sp.record(i=0, j=6)), _sender=player1)
        c1.play(play(f=sp.record(i=5, j=2), t=sp.record(i=7, j=1)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=6), t=sp.record(i=2, j=5)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=2, j=5), t=sp.record(i=0, j=6)), _sender=player1)
        c1.play(
            play(
                f=sp.record(i=5, j=2),
                t=sp.record(i=7, j=1),
                claim_repeat=sp.some((0, 3)),
            ),
            _sender=player2,
            _valid=False,
            _exception=sp.pair("NotSameMove", sp.record(fullMove=3)),
        )
        c1.play(
            play(
                f=sp.record(i=5, j=2),
                t=sp.record(i=7, j=1),
                claim_repeat=sp.some((0, 4)),
            ),
            _sender=player2,
        )
        sc.verify(c1.data.status == sp.variant("finished", "draw"))

        sc.h2("Previous move")
        c2 = main.Chess(player1.address, player2.address)
        sc += c2

        c2.play(play(f=sp.record(i=0, j=6), t=sp.record(i=2, j=5)), _sender=player1)
        c2.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c2.play(play(f=sp.record(i=2, j=5), t=sp.record(i=0, j=6)), _sender=player1)
        c2.play(play(f=sp.record(i=5, j=2), t=sp.record(i=7, j=1)), _sender=player2)
        c2.play(play(f=sp.record(i=0, j=6), t=sp.record(i=2, j=5)), _sender=player1)
        c2.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c2.play(play(f=sp.record(i=2, j=5), t=sp.record(i=0, j=6)), _sender=player1)
        c2.play(play(f=sp.record(i=5, j=2), t=sp.record(i=7, j=1)), _sender=player2)
        c2.play(play(f=sp.record(i=0, j=6), t=sp.record(i=2, j=5)), _sender=player1)
        c2.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c2.play(play(f=sp.record(i=2, j=5), t=sp.record(i=0, j=6)), _sender=player1)
        c2.play(play(f=sp.record(i=5, j=2), t=sp.record(i=7, j=1)), _sender=player2)
        c2.threefold_repetition_claim(
            fullMove1=0,
            fullMove2=5,
            _sender=player1,
            _valid=False,
            _exception=sp.pair("NotSameMove", sp.record(fullMove=5)),
        )
        c2.threefold_repetition_claim(fullMove1=0, fullMove2=4, _sender=player1)
        sc.verify(c2.data.status == sp.variant("finished", "draw"))

    @sp.add_test()
    def test():
        sc = sp.test_scenario("Chess - Checkmate", main)
        sc.h1("Checkmate")

        sc.h2("Scholar's mate")
        c1 = main.Chess(player1.address, player2.address)
        sc += c1

        c1.play(play(f=sp.record(i=1, j=4), t=sp.record(i=3, j=4)), _sender=player1)
        c1.play(play(f=sp.record(i=6, j=4), t=sp.record(i=4, j=4)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=5), t=sp.record(i=3, j=2)), _sender=player1)
        c1.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c1.play(play(f=sp.record(i=0, j=3), t=sp.record(i=4, j=7)), _sender=player1)
        c1.claim_checkmate(_valid=False)
        c1.play(play(f=sp.record(i=6, j=0), t=sp.record(i=4, j=0)), _sender=player2)
        c1.claim_checkmate(_valid=False)
        c1.play(play(f=sp.record(i=4, j=7), t=sp.record(i=6, j=5)), _sender=player1)
        c1.claim_checkmate()

        sc.h2("King captures the attacking piece")
        c2 = main.Chess(player1.address, player2.address)
        sc += c2

        c2.play(play(f=sp.record(i=1, j=4), t=sp.record(i=3, j=4)), _sender=player1)
        c2.play(play(f=sp.record(i=6, j=4), t=sp.record(i=4, j=4)), _sender=player2)
        c2.play(play(f=sp.record(i=0, j=3), t=sp.record(i=2, j=5)), _sender=player1)
        c2.play(play(f=sp.record(i=7, j=1), t=sp.record(i=5, j=2)), _sender=player2)
        c2.play(play(f=sp.record(i=2, j=5), t=sp.record(i=6, j=5)), _sender=player1)
        c2.claim_checkmate(_valid=False)

        sc.h2("Suffocating King")
        c3 = main.Chess(player1.address, player2.address)
        sc += c3

        c3.play(play(f=sp.record(i=0, j=1), t=sp.record(i=2, j=2)), _sender=player1)
        c3.play(play(f=sp.record(i=6, j=4), t=sp.record(i=4, j=4)), _sender=player2)
        c3.play(play(f=sp.record(i=2, j=2), t=sp.record(i=4, j=3)), _sender=player1)
        c3.play(play(f=sp.record(i=7, j=6), t=sp.record(i=6, j=4)), _sender=player2)
        c3.play(play(f=sp.record(i=1, j=4), t=sp.record(i=3, j=4)), _sender=player1)
        c3.play(play(f=sp.record(i=6, j=6), t=sp.record(i=5, j=6)), _sender=player2)
        c3.play(play(f=sp.record(i=4, j=3), t=sp.record(i=5, j=5)), _sender=player1)
        sc.show(c3.build_fen())
        c3.claim_checkmate()

        sc.h2("Obstructing column")
        c4 = main.Chess(player1.address, player2.address)
        sc += c4

        c4.play(play(f=sp.record(i=0, j=1), t=sp.record(i=2, j=2)), _sender=player1)
        c4.play(play(f=sp.record(i=6, j=4), t=sp.record(i=4, j=4)), _sender=player2)
        c4.play(play(f=sp.record(i=1, j=4), t=sp.record(i=3, j=4)), _sender=player1)
        c4.play(play(f=sp.record(i=6, j=0), t=sp.record(i=4, j=0)), _sender=player2)
        c4.play(play(f=sp.record(i=0, j=3), t=sp.record(i=4, j=7)), _sender=player1)
        c4.play(play(f=sp.record(i=4, j=0), t=sp.record(i=3, j=0)), _sender=player2)
        c4.play(play(f=sp.record(i=4, j=7), t=sp.record(i=4, j=4)), _sender=player1)
        c4.claim_checkmate(_valid=False)

        sc.h2("Obstructing diagonal")
        c5 = main.Chess(player1.address, player2.address)
        sc += c5

        c5.play(play(f=sp.record(i=1, j=4), t=sp.record(i=3, j=4)), _sender=player1)
        c5.play(play(f=sp.record(i=6, j=5), t=sp.record(i=4, j=5)), _sender=player2)
        c5.play(play(f=sp.record(i=0, j=3), t=sp.record(i=4, j=7)), _sender=player1)
        c5.claim_checkmate(_valid=False)
        c5.play(play(f=sp.record(i=6, j=6), t=sp.record(i=5, j=6)), _sender=player2)
        c5.play(play(f=sp.record(i=1, j=7), t=sp.record(i=2, j=7)), _sender=player1)
        c5.play(play(f=sp.record(i=6, j=7), t=sp.record(i=5, j=7)), _sender=player2)
        c5.play(play(f=sp.record(i=4, j=7), t=sp.record(i=5, j=6)), _sender=player1)
        c5.claim_checkmate()
        sc.verify_equal(c5.data.status, sp.variant("finished", "player_1_won"))