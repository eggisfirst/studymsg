import { Color, Mark } from "./enums";

export type Deck = Card[]
// type Color = "❤"| "♦️" | "♠️" | "♣️"
// export type NormalCard = {
//   color: Color
//   mark: Mark
// }

export interface Card {     //卡牌
  getString(): string
}

export interface NormalCard extends Card {    //普通卡牌
  color: Color
  mark: Mark
}

export interface Joker extends Card{    //大小王
  type: "big" | "small"
} 