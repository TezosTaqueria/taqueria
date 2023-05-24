// Copyright 2019-2022 Smart Chain Arena LLC.

function copyMichelson(x) {
    var range = document.createRange();
    var children = x.parentNode.parentNode.childNodes;
    children.forEach(function (child) {
        if (child.nodeType != Node.TEXT_NODE) {
            if (child.className.includes('michelson')) {
                range.selectNode(child);
                console.log(child);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
            }
        }
    });
}

function copyMichelsonTextArea(x) {
    document.getElementById(x).select();
    document.execCommand('copy');
}

function openTabLazy(evt, id, global_id) {
    var i, tabcontent, tablinks;

    tabcontent = evt.currentTarget.parentNode.parentNode.childNodes;
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].className == 'tabcontent') tabcontent[i].style.display = 'none';
    }
    tablinks = evt.currentTarget.parentNode.childNodes;
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].nodeType != Node.TEXT_NODE) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
    }
    tablinks = evt.currentTarget.parentNode.parentNode.childNodes;
    k = 0;
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].nodeType != Node.TEXT_NODE) {
            if (id + 1 == k) {
                tablinks[i].style.display = 'block';
                lazy_tab = window.smartmlCtx.call_exn_handler('lazy_tab', id, global_id);
                if (lazy_tab) tablinks[i].innerHTML = lazy_tab;
            }
            k += 1;
        }
    }

    evt.currentTarget.className += ' active';
}

function openTab(evt, name) {
    var i, tabcontent, tablinks;

    tabcontent = evt.currentTarget.parentNode.parentNode.childNodes;
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].className == 'tabcontent') tabcontent[i].style.display = 'none';
    }
    tablinks = evt.currentTarget.parentNode.childNodes;
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].nodeType != Node.TEXT_NODE) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
    }
    tablinks = evt.currentTarget.parentNode.parentNode.childNodes;
    k = 0;
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].nodeType != Node.TEXT_NODE) {
            if (name + 1 == k) tablinks[i].style.display = 'block';
            k += 1;
        }
    }

    evt.currentTarget.className += ' active';
}

function initDefaultButtons() {
    var defaults = document.getElementsByName('button_default');
    var i;
    for (i = 0; i < defaults.length; i++) {
        defaults[i].click();
    }
}

function ppInvocationResult(result) {
    var returnMessage = '';
    var originatedContract = '';
    var hasError = false;
    try {
        console.log('Results:');
        console.log(result);
        if (result.hasOwnProperty('results')) {
            result = result['results'];
        }
        if (result.hasOwnProperty('response')) {
            result = JSON.parse(result['response']);
        }
        if (result.hasOwnProperty('errors')) {
            return result.errors;
        }
        if (Array.isArray(result) && result.length == 1) {
            result = result[0];
        }
        if (result.hasOwnProperty('contents')) {
            var contents = result['contents'];
            contents.forEach(function (content) {
                var metadata = content.metadata;
                var operation_result = metadata.operation_result;
                var status = operation_result['status'];
                returnMessage += 'Status: ' + status + '\n';
                if (status == 'failed' || status == 'backtracked') {
                    hasError = true;
                    operation_result.errors.forEach(function (error) {
                        returnMessage += '\nError: ' + error.id;
                        if (error['id'].endsWith('script_rejected')) {
                            try {
                                returnMessage += '\n   ' + error['with'].string;
                            } catch (__error) {
                                console.log(error);
                            }
                        }
                        if (error['id'].endsWith('invalid_contract_notation')) {
                            try {
                                returnMessage += '\n   ' + error['notation'];
                            } catch (__error) {
                                console.log(error);
                            }
                        }
                        if (error['id'].endsWith('storage_exhausted.operation')) {
                            returnMessage += '  \n   (please increase storage limit)';
                        }
                    });
                }
                try {
                    operation_result.originated_contracts.forEach(function (originated) {
                        originatedContract = originated;
                        returnMessage += '  \n\nOriginatedContract: ' + originated;
                    });
                } catch (__error) {
                    hasError = true;
                }
            });
        } else if (result.hasOwnProperty('kind') && result.hasOwnProperty('id')) {
            hasError = true;
            returnMessage += 'Error: ' + result['id'];
        }
    } catch (error) {
        console.log(error);
        hasError = true;
        returnMessage += '\n(Error while parsing result)';
    }

    returnMessage += '\n\n\nDetails:\n\n' + JSON.stringify(result, null, 2);
    return { message: returnMessage, contract: originatedContract, hasError: hasError };
}

class SmartmlCtx {
    constructor() {}
    call(f, ...rest) {
        try {
            return exports[f](...rest);
        } catch (error) {
            var result = 0;
            try {
                result = this.call('stringOfException', true, error);
            } catch (_error) {
                throw error;
            }
            if (typeof window.toException === 'function' && !window.location.pathname.includes('ts-ide'))
                throw toException(result);
            else throw result;
        }
    }
    call_exn(f, ...rest) {
        return exports[f](...rest);
    }
    call_exn_handler(f, ...rest) {
        try {
            return exports[f](...rest);
        } catch (error) {
            try {
                var result = '';
                try {
                    result = this.call('stringOfException', false, error);
                } catch (_error) {
                    showErrorPre(error);
                }
                console.log(result);
                showErrorPre(result);
            } catch (_error) {
                showErrorPre(error);
            }
        }
    }
}

class SmartmlJS {
    constructor(contract) {
        this.ctx = new SmartmlCtx();
        this.time = 0;
        if (contract != null) {
            //console.log(contract);
            //console.log(contract.exp);
            this.contract = this.ctx.call('importContract', contract.exp());
        }
    }

    smartpy() {
        return this.ctx.call('string_of_contract', this.contract);
    }
    string_of_value(s) {
        return this.ctx.call('string_of_value', s);
    }
    html(self) {
        return this.ctx.call('htmlContract', this.contract);
    }
    fullHtml() {
        var def = 'Stripped';
        var onlyDefault = false;
        return this.ctx.call('fullHtmlContract', def, onlyDefault, this.contract);
    }
    messageEffects(result) {
        return this.ctx.call('messageEffects', result);
    }
    messageHtml(result) {
        return this.ctx.call('messageHtml', result);
    }
    messageErrors(result) {
        return this.ctx.call('messageErrors', result);
    }
    messageContract(message) {
        return this.ctx.call('messageContract', message);
    }
    listLength(l) {
        return this.ctx.call('List.length', l);
    }
    listNth(l, n) {
        return this.ctx.call('List.nth', l, n);
    }
    list_to_ocaml(l) {
        result = this.ctx.call('list.[]');
        for (var x in reversed(l)) {
            result = this.ctx.call('list.append', x, result);
        }
        return result;
    }
    list(l) {
        r = range(0, this.listLength(l));
        return r.map((i) => this.listNth(l, i));
    }
    ocamlString(s) {
        return this.ctx.call('string', s);
    }
    of_ocamlString(s) {
        return this.ctx.call('of_ocamlString', s);
    }
    pair(l1, l2) {
        return this.ctx.call('pair', l1, l2);
    }
    list_empty(self) {
        return this.ctx.call('list.[]');
    }
    list_unit(x) {
        return this.ctx.call('list.unit', x);
    }
    list_concat(l1, l2) {
        return this.ctx.call('list.concat', l1, l2);
    }
    importValue(value) {
        if (isinstance(value, str)) return this.importSimpleValue('string', value);
        if (isinstance(value, int)) return this.importSimpleValue('int', str(value));
        if (isinstance(value, Record)) return this.ctx.call('importValue', value.export());
        if (isinstance(value, SpExpr)) return this.ctx.call('importValue', value.export());
        throw 'Unsupported type for value ${value}';
    }
    importSimpleValue(t, s) {
        return this.ctx.call('importSimpleValue', t, s);
    }
    getVariableType(name) {
        return SmartmlType(this.ctx.call('getVariableType', this.contract, name));
    }
    setTime(time) {
        this.time = time;
        return 'Setting time to [%s].<br>' % time;
    }
    //     execMessage(message, sender = "", **kargs){
    //         kargs_values = [(name, this.importValue(x)) for (name, x) in sorted(kargs.items())]
    //         kargs_values_pp = [(name, this.string_of_value(x)) for (name, x) in kargs_values]
    //         kargs_ml = this.list_empty()
    //         for (name, value) in kargs_values:
    //             kargs_ml = this.list_concat(kargs_ml, this.list_unit(this.pair(this.ocamlString(name), value)))
    //         result = this.ctx.call("execMessage", sender, this.time, this.contract, message, kargs_ml)
    //         errors = this.messageErrors(result)
    //         errors = [this.of_ocamlString(x) for x in this.list(errors)]
    //         effects = this.messageEffects(result)
    //         effects = [this.of_ocamlString(x) for x in this.list(effects)]
    //         if len(errors) == 0:
    //             this.contract = this.messageContract(result)
    //                 return ExecMessage(this.messageHtml(result), errors, effects);
    //                 }
    ppMich(mich, indent) {
        return this.ctx.call('mich.pp', indent, mich);
    }
    ppMichStorage(mich, indent = '') {
        return this.ctx.call('mich.ppStorage', indent, mich);
    }
    ppMichStorageHtml(storage, t) {
        return this.ctx.call('mich.htmlStorage', storage, t);
    }
    ppMichInfos(address, balance, counter, manager, spendable) {
        return this.ctx.call('mich.htmlInfos', address, balance, counter, manager, spendable);
    }
    ppMichStorageType(storageType) {
        return this.ctx.call('mich.htmlType', storageType);
    }
    parseMich(code) {
        if (isinstance(code, str)) return this.ctx.call('mich.string', code);
        if (hasattr(code, 'int')) return this.ctx.call('mich.int', code.int);
        if (hasattr(code, 'string')) return this.ctx.call('mich.string', code.string);
        if (!hasattr(code, 'prim')) {
            //#alert(str(code) + " " + str(dir(code)))
            seq = code.map((c) => this.parseMich(c));
            seq = this.list_to_ocaml(seq);
            return this.ctx.call('mich.sequence', seq);
        }
        if (hasattr(code, 'args')) args = code.args.map((arg) => this.parseMich(arg));
        else args = [];
        argsML = this.list_to_ocaml(args);
        if (hasattr(code, 'annots')) {
            annots = code.annots;
            window.console.log(annots);
        } else {
            annots = [];
        }
        annots = this.list_to_ocaml(annots.map((x) => this.ocamlString(x)));
        return this.ctx.call('mich.primitive', code.prim, annots, argsML);
    }
    static hashString(s) {
        return hashed(window.smartmlCtx.call('hashString', s));
    }
}

smartmlCtx = new SmartmlCtx();
in_browser = true;
function buildSmartlmJS(x) {
    return new SmartmlJS(x);
}
