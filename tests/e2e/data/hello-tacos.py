# HelloTaco - Example for Taqueria

import smartpy as sp

class HelloTacos(sp.Contract):

    def __init__(self):
        self.init_type(t = sp.TRecord(tacos = sp.TNat))
        self.init(tacos = 100)

    @sp.entry_point
    def buy(self, tacos_to_buy):
        sp.set_type(tacos_to_buy, sp.TNat)
        sp.if self.data.tacos < tacos_to_buy:
            sp.failwith("NOT_ENOUGH_TACOS")
        sp.else:
            self.data.tacos = sp.as_nat(self.data.tacos - tacos_to_buy)

if "templates" not in __name__:
    @sp.add_test(name = "HelloTacos")
    def test():
        helloTaco = HelloTacos()
        scenario = sp.test_scenario()
        scenario.h1("HelloTacos")
        scenario += helloTaco
        helloTaco.buy(1)
        scenario.verify(helloTaco.data.tacos == 99)

    sp.add_compilation_target("HelloTacos_comp", HelloTacos())