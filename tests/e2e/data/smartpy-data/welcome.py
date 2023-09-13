import smartpy as sp

# This is the SmartPy editor.
# You can experiment with SmartPy by loading a template.
# (in the Commands menu above this editor)
#
# A typical SmartPy program has the following form:


# A SmartPy module
@sp.module
def main():
    # A class of contracts
    class MyContract(sp.Contract):
        def __init__(self, myParameter1, myParameter2):
            self.data.myParameter1 = myParameter1
            self.data.myParameter2 = myParameter2

        # An entrypoint, i.e., a message receiver
        # (contracts react to messages)
        @sp.entrypoint
        def myEntryPoint(self, params):
            assert self.data.myParameter1 <= 123
            self.data.myParameter1 += params


# Tests
@sp.add_test()
def test():
    # We define a test scenario, together with some outputs and checks
    # The scenario takes the module as a parameter
    scenario = sp.test_scenario("Welcome", main)
    scenario.h1("Welcome")

    # We first define a contract and add it to the scenario
    c1 = main.MyContract(12, 123)
    scenario += c1

    # And call some of its entrypoints
    c1.myEntryPoint(12)
    c1.myEntryPoint(13)
    c1.myEntryPoint(14)
    c1.myEntryPoint(50)
    c1.myEntryPoint(50)
    c1.myEntryPoint(50, _valid=False)  # this is expected to fail
    # Finally, we check its final storage
    scenario.verify(c1.data.myParameter1 == 151)

    # We can define another contract using the current state of c1
    c2 = main.MyContract(1, c1.data.myParameter1)
    scenario += c2