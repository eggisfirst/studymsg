Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
function createCard() {
    const deck = [];
    const marks = Object.values(enums_1.Mark);
    const color = Object.values(enums_1.Color);
    for (const m of marks) {
        for (const c of color) {
            const card = {
                color: c,
                mark: m,
                getString() {
                    return this.color + this.mark;
                }
            };
            deck.push(card);
        }
    }
    let joker = {
        type: "small",
        getString() {
            return "jo";
        }
    };
    deck.push(joker);
    joker = {
        type: "big",
        getString() {
            return "Jo";
        }
    };
    deck.push(joker);
    return deck;
}
exports.createCard = createCard;
function printDeck(deck) {
    deck.forEach(item => {
        let str;
        str = item.getString();
        console.log(str);
    });
}
exports.printDeck = printDeck;
