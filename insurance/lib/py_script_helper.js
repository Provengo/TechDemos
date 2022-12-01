function PythonPrinter(sf) { 
    let curIndent=0;
    const indents = {};
    indents[0]="";
    function makeIndent() {
        if ( curIndent==0 || indents[curIndent] ) return indents[curIndent];
        let str = "";
        for ( let i=0; i<curIndent; i++ ){
            str = str + "    ";
        }
        indents[curIndent] = str;
        return indents[curIndent];
    }

    function indented(fn) {
        curIndent++;
        fn(this);
        curIndent--;
        return this;
    }

    return {
        indent:  ()    => {curIndent++; return this;},
        outdent: ()    => {curIndent--; return this;},
        print:   (row) => {sf.append(makeIndent() + 'print("' + row.replace("\"", "\\\"") + '")'); return this;},
        prepend: (row) => {sf.prepend(makeIndent() + row); return this;},
        append:  (row) => {sf.append(makeIndent() + row); return this;}
    };
}
