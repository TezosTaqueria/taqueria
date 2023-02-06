# TAQ-DEMO README

This directory contains a script `taq-demo.sh` which showcases Taqueria functionality in a sane, predictable, repeatable, and idempotent fashion. It takes care of many small details like copying files, and ensures that all pre-requisites are met, which might normally trip up an "ad hoc" demo. It endeavors to appear as a simple runner. The idea is to focus on core functionality, and for details like copying files and checking versions of stuff to fade into the background.

Principle: Everything created/modified during the demo is left intact. It is on *startup* that the working/demo directories are blown away. This way you have a record of what happened, but start fresh and idempotently each time.

## The Demoizer

`taq-demo.sh` is a client of the generic `demo-izer.sh` script, which may become its own repo. The `demo-izer.sh` script is the *driver*, while `taq-demo.sh` provides the *`steps`*.

The `demo-izer.sh` script defines various *Actions* that can be taken:

* `o`k: execute the command (alias: <space>, <enter>)
* `p`revious: bring the previous step back
* `s`kip: skip this step
* `c`ommand: display a (pseudo-) prompt and `eval` what is given, for ad-hoc commands
* `q`uit: stop/exit the demo, here and now
* `h`elp: display these Actions

(Note that `r`epeat has been *temporarily elided* until it works perfectly)

## Private versus Public Methods

The `demo-izer` has the notion of "public" and "private" methods:

* *private* methods are executed "silently" and are denoted by using a `_` prefix
* *public* methods `echo` their commands to the *driver* and the user chooses the `action` to take

You need to be careful about which actions you skip, as some actions will naturally be pre-requisites to demonstrating functionality.

### Private Method Idempotency

Private methods should be idempotent, such that the `previous` and (future) `repeat` commands can be re-executed without problems. Be aware this might mandate that you check some given state first.

# Auto-Mode

The `demo-izer.sh` script hooks `AUTO_DEMO_MODE`, an exported variable which if set to `true` in a client script will cause all the `steps` to be executed sequentially automagically. This can be useful for stress testing, or validating changes, in an `e2e` fashion.

# TODO

* `p`revious functionality currently does not "skip back" over *private* methods
It would be better if `p`revious did so, because private methods are supposed to be "implementation details"

* The last character from the previous selection is currently "remembered"
It would be better if the input were just read and executed, i.e. a small fix to just execute after the given Action is taken.

# HOW TO RUN IT

* Source the file with `source ./taq-demo.sh` and run with `demo`

Please read the source code of `taq-demo.sh` to learn further.
