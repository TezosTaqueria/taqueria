import smartpy as sp

@sp.module
def main():
    class Adder(sp.Contract):
        def __init__(self):
            self.data.sum = 0

        @sp.entrypoint
        def add(self, x):
            self.data.sum += x

@sp.add_test(name="my first test")
def test():
    s = sp.test_scenario(main)
    a = main.Adder()
    s += a

    a.add(2)
    a.add(3)