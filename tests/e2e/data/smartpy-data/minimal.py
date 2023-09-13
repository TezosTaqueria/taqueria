import smartpy as sp


@sp.module
def main():
    class MyContract(sp.Contract):
        def __init__(self):
            pass

        @sp.entrypoint
        def entrypoint_1(self):
            pass


@sp.add_test()
def test():
    scenario = sp.test_scenario("Minimal", main)
    scenario.h1("Minimal")
    c1 = main.MyContract()
    scenario += c1