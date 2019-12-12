import { Card, Joker } from './types';
import { Mark, Color } from './enums';

interface PublishResult {
  player1: Deck,
  player2: Deck,
  player3: Deck,
  left: Deck,
}

export class Deck {
  private cards: Card [] = []

  constructor( cards?: Card[]) {
    if(cards) {
      this.cards = cards
    }else {
      this.init()
    }
  }

  private init() {
    const marks = Object.values(Mark)
    const color = Object.values(Color)
    for(const m of marks) {
      for(const c of color) {
         this.cards.push({
          color: c,
          mark: m,
          getString() {
            return this.color + this.mark
          }
        } as Card)
      }
    }
    let joker:Joker = {
      type:"small",
      getString() {
        return "jo"
      }
    }
    this.cards.push(joker)
    joker = {
      type:"big",
      getString() {
        return "Jo"
      }
    }
    this.cards.push(joker)
  }

  print() {
    this.cards.forEach(item => {
      let str:string;
      str = item.getString()
      console.log(str)
    })
  }

  shuffle() { //洗牌
    for (let i = 0; i < this.cards.length; i++) {
      const targetIndex = this.getRandom(0, this.cards.length);
      const temp = this.cards[i]
      this.cards[i] = this.cards[targetIndex]
      this.cards[targetIndex] = temp

    }
  }

  //发牌，返回4个数组，斗地主。17 17 17 3
  publish(): PublishResult {
   let player1: Deck, player2: Deck, player3: Deck, left: Deck
    player1 = this.takeCards(17)
    player2 = this.takeCards(17)
    player3 = this.takeCards(17)
    // left = this.takeCards(3)
    left = new Deck(this.cards)


    return {player1,player2,player3,left}
  }

  private takeCards(n: number): Deck {
    const cards: Card[] = [];
    for(let i = 0; i < n; i++) {
      cards.push(this.cards.shift() as Card)
    }
    return new Deck(cards)
  }

  //无法取到最大值
  private getRandom(min: number, max: number) {
    const dec = max - min
    return Math.floor(Math.random() * dec + min)
  }
}