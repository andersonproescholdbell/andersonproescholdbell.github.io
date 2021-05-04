class Turing {
    constructor() {
        this.currentState = 0;
        this.tapeIndex = 0;
        this.tape = ["s", "e"];
        this.states = {};
        this.transitions = {};
        this.interval = undefined;
    }

    addState(num, start, accepting) {
        if (start) {
            this.currentState = num;
        }
        this.states[num] = accepting;
    }

    addTransition(start, end, on, write, move) {
        if (this.transitions[start] == undefined) {
            this.transitions[start] = {};
        } 
        this.transitions[start][on] = {'write': write, 'move': move, 'end': end};
    }

    setTape(s) {
        for (var i = 0; i < s.length; i++) {
            this.tape.splice(i+1, 0, s[i]);
        }
    }

    transition(c) { 
        var t = this.transitions[this.currentState][c];
        this.write(t.write);
        this.currentState = t.end;

        var out = "";
        for (var i = 0; i < this.tape.length; i++) {
            if (i == this.tapeIndex) {
                out += "[" + this.tape[i] + "]";
            } else {
                out += this.tape[i];
            }
        }
        document.getElementById("output").value = out;

        var move = t.move;
        if (move == "L") {
            this.moveLeft();
        } else if (move == "R") {
            this.moveRight();
        } else if (move == "H") {
            return "done";
        }

        return this.tape[this.tapeIndex];
    }

    async start(ms) {
        var c = this.transition("s");
        return await new Promise((resolve) => {
            this.interval = setInterval(() => {
                if (c == "done") {
                    resolve('done');
                    this.stop();
                } else {
                    c = this.transition(c);
                }
            }, ms);
        })
    }

    stop() {
        clearInterval(this.interval);
    }

    end() {
        return this.states[this.currentState];
    }

    moveLeft() {
        this.tapeIndex--;
    }

    moveRight() {
        this.tapeIndex++;
    }

    write(c) {
        this.tape[this.tapeIndex] = c;
    }
}

async function run() {
    var tm = new Turing();

    const states = (document.getElementById("states").value + '').split('\n');
    const transitions = (document.getElementById("transitions").value + '').split('\n');
    const delay = parseInt(document.getElementById("delay").value);
    const input = document.getElementById("input").value;

    document.getElementById("output").cols = (input.length > 14) ? (input.length+5) : 14;

    for (var i = 1; i < states.length; i++) {
        var thisLine = states[i].split(' ');
        var start, accepting;
        if (thisLine[1] == "true") {
            start = true;
        } else {
            start = false;
        }
        if (thisLine[2] == "true") {
            accepting = true;
        } else {
            accepting = false;
        }
        tm.addState(parseInt(thisLine[0]), start, accepting);
    }

    for (var i = 1; i < transitions.length; i++) {
        var thisLine = transitions[i].split(' ');
        tm.addTransition(parseInt(thisLine[0]), parseInt(thisLine[1]), thisLine[2], thisLine[3], thisLine[4]);
    }

    tm.setTape(input);

    await tm.start(delay).then(() => {
        if (tm.end()) {
            document.getElementById("output").value += "\nThe Turing Machine ended in an ACCEPT state on input " + input;
        } else {
            document.getElementById("output").value += "\nThe Turing Machine ended in a REJECT state on input " + input;
        }
        document.getElementById("output").cols = document.getElementById("output").value.split('\n')[1].length;
    });
}

function resizeInput() {
    document.getElementById("input").size = (document.getElementById("input").value.length > 14) ? (document.getElementById("input").value.length+5) : 14;
}

function load() {
    document.getElementById("states").value =
`Number Start Accepting
0 true false
1 false false
2 false false
3 false false
4 false false
5 false false
6 false false
7 false false
8 false true`;

    document.getElementById("transitions").value = 
`Start End Read Write Move
0 1 s s R
1 1 x x R
1 1 1 1 R
1 2 0 x L
1 5 e e L
2 2 0 0 L
2 2 x x L
2 2 1 1 L
2 3 s s R
3 3 x x R
3 3 0 0 R
3 4 1 x L
3 5 e e L
4 4 x x L
4 4 0 0 L
4 4 1 1 L
4 1 s s R
5 5 x x L
5 5 0 0 L
5 5 1 1 L
5 6 s s R
6 6 x x R
6 7 0 0 H
6 7 e e H
6 8 1 1 H`
}