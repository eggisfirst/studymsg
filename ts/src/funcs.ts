import { Deck, NormalCard, Joker } from "./types";
import { Color, Mark } from "./enums";

export function createCard(): Deck {
  const deck: Deck = []
  const marks = Object.values(Mark)
  const color = Object.values(Color)
  for(const m of marks) {
    for(const c of color) {
      const card:NormalCard = {
        color: c,
        mark: m,
        getString() {
          return this.color + this.mark
        }
      }
      deck.push(card)
    }
  }
  let joker:Joker = {
    type:"small",
    getString() {
      return "jo"
    }
  }
  deck.push(joker)
  joker = {
    type:"big",
    getString() {
      return "Jo"
    }
  }
  deck.push(joker)
  return deck
}

export function printDeck(deck:Deck) {
  deck.forEach(item => {
    let str:string;
    str = item.getString()
    console.log(str)
  })
}