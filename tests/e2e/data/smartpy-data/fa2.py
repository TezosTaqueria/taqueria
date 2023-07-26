import smartpy as sp

# FA2 standard: https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md
# Documentation: https://smartpy.io/guides/FA2-lib/overview


@sp.module
def main():
    balance_of_args: type = sp.record(
        requests=sp.list[sp.record(owner=sp.address, token_id=sp.nat)],
        callback=sp.contract[
            sp.list[
                sp.record(
                    request=sp.record(owner=sp.address, token_id=sp.nat), balance=sp.nat
                ).layout(("request", "balance"))
            ]
        ],
    ).layout(("requests", "callback"))

    class Fa2NftMinimal(sp.Contract):
        """Minimal FA2 contract for NFTs.

        This is a minimal self contained implementation example showing how to
        implement an NFT contract following the FA2 standard in SmartPy. It is for
        illustrative purposes only. For a more flexible toolbox aimed at real world
        applications please refer to FA2_lib."
        """

        def __init__(self, administrator, metadata):
            self.data.administrator = administrator
            self.data.ledger = sp.cast(sp.big_map(), sp.big_map[sp.nat, sp.address])
            self.data.metadata = metadata
            self.data.next_token_id = sp.nat(0)
            self.data.operators = sp.cast(
                sp.big_map(),
                sp.big_map[
                    sp.record(
                        owner=sp.address,
                        operator=sp.address,
                        token_id=sp.nat,
                    ).layout(("owner", ("operator", "token_id"))),
                    sp.unit,
                ],
            )
            self.data.token_metadata = sp.cast(
                sp.big_map(),
                sp.big_map[
                    sp.nat,
                    sp.record(token_id=sp.nat, token_info=sp.map[sp.string, sp.bytes]),
                ],
            )

            # TODO: pass metadata_base as an argument
            # metadata_base["views"] = [
            #     self.all_tokens,
            #     self.get_balance,
            #     self.is_operator,
            #     self.total_supply,
            # ]
            # self.init_metadata("metadata_base", metadata_base)

        @sp.entrypoint
        def transfer(self, batch):
            """Accept a list of transfer operations.

            Each transfer operation specifies a source: `from_` and a list
            of transactions. Each transaction specifies the destination: `to_`,
            the `token_id` and the `amount` to be transferred.

            Args:
                batch: List of transfer operations.
            Raises:
                `FA2_TOKEN_UNDEFINED`, `FA2_NOT_OPERATOR`, `FA2_INSUFFICIENT_BALANCE`
            """
            for transfer in batch:
                for tx in transfer.txs:
                    sp.cast(
                        tx,
                        sp.record(
                            to_=sp.address, token_id=sp.nat, amount=sp.nat
                        ).layout(("to_", ("token_id", "amount"))),
                    )
                    assert tx.token_id < self.data.next_token_id, "FA2_TOKEN_UNDEFINED"
                    assert transfer.from_ == sp.sender or self.data.operators.contains(
                        sp.record(
                            owner=transfer.from_,
                            operator=sp.sender,
                            token_id=tx.token_id,
                        )
                    ), "FA2_NOT_OPERATOR"
                    if tx.amount > 0:
                        assert (
                            tx.amount == 1
                            and self.data.ledger[tx.token_id] == transfer.from_
                        ), "FA2_INSUFFICIENT_BALANCE"
                        self.data.ledger[tx.token_id] = tx.to_

        @sp.entrypoint
        def update_operators(self, actions):
            """Accept a list of variants to add or remove operators.

            Operators can perform transfer on behalf of the owner.
            Owner is a Tezos address which can hold tokens.

            Only the owner can change its operators.

            Args:
                actions: List of operator update actions.
            Raises:
                `FA2_NOT_OWNER`
            """
            for action in actions:
                with sp.match(action):
                    with sp.case.add_operator as operator:
                        assert operator.owner == sp.sender, "FA2_NOT_OWNER"
                        self.data.operators[operator] = ()
                    with sp.case.remove_operator as operator:
                        assert operator.owner == sp.sender, "FA2_NOT_OWNER"
                        del self.data.operators[operator]

        @sp.entrypoint
        def balance_of(self, param):
            """Send the balance of multiple account / token pairs to a callback
            address.

            transfer 0 mutez to `callback` with corresponding response.

            Args:
                callback (contract): Where to callback the answer.
                requests: List of requested balances.
            Raises:
                `FA2_TOKEN_UNDEFINED`, `FA2_CALLBACK_NOT_FOUND`
            """
            sp.cast(param, balance_of_args)
            balances = []
            for req in param.requests:
                assert req.token_id < self.data.next_token_id, "FA2_TOKEN_UNDEFINED"
                balances.push(
                    sp.record(
                        request=sp.record(owner=req.owner, token_id=req.token_id),
                        balance=(
                            1 if self.data.ledger[req.token_id] == req.owner else 0
                        ),
                    )
                )

            sp.transfer(reversed(balances), sp.mutez(0), param.callback)

        @sp.entrypoint
        def mint(self, to_, metadata):
            """(Admin only) Create a new token with an incremented id and assign
            it. to `to_`.

            Args:
                to_ (address): Receiver of the tokens.
                metadata (map of string bytes): Metadata of the token.
            Raises:
                `FA2_NOT_ADMIN`
            """
            assert sp.sender == self.data.administrator, "FA2_NOT_ADMIN"
            token_id = self.data.next_token_id
            self.data.token_metadata[token_id] = sp.record(
                token_id=token_id, token_info=metadata
            )
            self.data.ledger[token_id] = to_
            self.data.next_token_id += 1

        @sp.offchain_view
        def all_tokens(self):
            """Return the list of all the `token_id` known to the contract."""
            return sp.range(0, self.data.next_token_id)

        @sp.offchain_view
        def get_balance(self, params):
            """Return the balance of an address for the specified `token_id`."""
            sp.cast(
                params,
                sp.record(owner=sp.address, token_id=sp.nat).layout(
                    ("owner", "token_id")
                ),
            )
            assert params.token_id < self.data.next_token_id, "FA2_TOKEN_UNDEFINED"
            return 1 if self.data.ledger[params.token_id] == params.owner else 0

        @sp.offchain_view
        def total_supply(self, params):
            """Return the total number of tokens for the given `token_id` if known
            or fail if not."""
            assert params.token_id < self.data.next_token_id, "FA2_TOKEN_UNDEFINED"
            return 1

        @sp.offchain_view
        def is_operator(self, params):
            """Return whether `operator` is allowed to transfer `token_id` tokens
            owned by `owner`."""
            return self.data.operators.contains(params)

    class Fa2NftMinimalTest(Fa2NftMinimal):
        def __init__(
            self, administrator, metadata, ledger, token_metadata, next_token_id
        ):
            Fa2NftMinimal.__init__(self, administrator, metadata)

            self.data.next_token_id = next_token_id
            self.data.ledger = ledger
            self.data.token_metadata = token_metadata


# metadata_base = {
#     "name": "FA2 NFT minimal",
#     "version": "1.0.0",
#     "description": "This is a minimal implementation of FA2 (TZIP-012) using SmartPy.",
#     "interfaces": ["TZIP-012", "TZIP-016"],
#     "authors": ["SmartPy <https://smartpy.io/#contact>"],
#     "homepage": "https://smartpy.io/ide?template=fa2_nft_minimal.py",
#     "source": {
#         "tools": ["SmartPy"],
#         "location": "https://gitlab.com/SmartPy/smartpy/-/raw/master/python/templates/fa2_nft_minimal.py",
#     },
#     "permissions": {
#         "operator": "owner-or-operator-transfer",
#         "receiver": "owner-no-hook",
#         "sender": "owner-no-hook",
#     },
# }

if "templates" not in __name__:

    def make_metadata(symbol, name, decimals):
        """Helper function to build metadata JSON bytes values."""
        return sp.map(
            l={
                "decimals": sp.utils.bytes_of_string("%d" % decimals),
                "name": sp.utils.bytes_of_string(name),
                "symbol": sp.utils.bytes_of_string(symbol),
            }
        )

    admin = sp.test_account("Administrator")
    alice = sp.test_account("Alice")
    tok0_md = make_metadata(name="Token Zero", decimals=1, symbol="Tok0")
    tok1_md = make_metadata(name="Token One", decimals=1, symbol="Tok1")
    tok2_md = make_metadata(name="Token Two", decimals=1, symbol="Tok2")

    @sp.add_test(name="Minimal test")
    def test():
        scenario = sp.test_scenario(main)
        c1 = main.Fa2NftMinimal(
            admin.address, sp.utils.metadata_of_url("https://example.com")
        )
        scenario += c1

    from templates import fa2_lib_testing as testing

    c1 = main.Fa2NftMinimalTest(
        administrator=admin.address,
        metadata=sp.utils.metadata_of_url("https://example.com"),
        ledger=sp.big_map({0: alice.address, 1: alice.address, 2: alice.address}),
        token_metadata=sp.big_map(
            {
                0: sp.record(token_id=0, token_info=tok0_md),
                1: sp.record(token_id=1, token_info=tok1_md),
                2: sp.record(token_id=2, token_info=tok2_md),
            }
        ),
        next_token_id=3,
    )

    kwargs = {"modules": main, "ledger_type": "NFT"}
    testing.test_core_interfaces(c1, **kwargs)
    testing.test_transfer(c1, **kwargs)
    testing.test_balance_of(c1, **kwargs)
    testing.test_owner_or_operator_transfer(c1, **kwargs)
