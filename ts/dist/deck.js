Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
class Deck {
    constructor(cards) {
        this.cards = [];
        if (cards) {
            this.cards = cards;
        }
        else {
            this.init();
        }
    }
    init() {
        const marks = Object.values(enums_1.Mark);
        const color = Object.values(enums_1.Color);
        for (const m of marks) {
            for (const c of color) {
                this.cards.push({
                    color: c,
                    mark: m,
                    getString() {
                        return this.color + this.mark;
                    }
                });
            }
        }
        let joker = {
            type: "small",
            getString() {
                return "jo";
            }
        };
        this.cards.push(joker);
        joker = {
            type: "big",
            getString() {
                return "Jo";
            }
        };
        this.cards.push(joker);
    }
    print() {
        this.cards.forEach(item => {
            let str;
            str = item.getString();
            console.log(str);
        });
    }
    shuffle() {
        for (let i = 0; i < this.cards.length; i++) {
            const targetIndex = this.getRandom(0, this.cards.length);
            const temp = this.cards[i];
            this.cards[i] = this.cards[targetIndex];
            this.cards[targetIndex] = temp;
        }
    }
    publish() {
        let player1, player2, player3, left;
        player1 = this.takeCards(17);
        player2 = this.takeCards(17);
        player3 = this.takeCards(17);
        left = new Deck(this.cards);
        return { player1, player2, player3, left };
    }
    takeCards(n) {
        const cards = [];
        for (let i = 0; i < n; i++) {
            cards.push(this.cards.shift());
        }
        return new Deck(cards);
    }
    getRandom(min, max) {
        const dec = max - min;
        return Math.floor(Math.random() * dec + min);
    }
}
exports.Deck = Deck;
