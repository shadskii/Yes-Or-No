import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import {
  Direction,
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';
import { CardService } from '../card.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-cardstack',
  templateUrl: './cardstack.component.html',
  styleUrls: ['./cardstack.component.css']
})
export class CardstackComponent implements AfterViewInit {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  cards: Array<any>;
  stackConfig: StackConfig;
  swipedRight: number = 0;
  swipedLeft: number = 0;

  constructor(private cardService: CardService) {
    this.cardService.getCards().subscribe(res => this.cards = res);
    this.stackConfig = {
      allowedDirections: [
        Direction.LEFT,
        Direction.RIGHT
      ],
      throwOutConfidence: (offsetX: number, offsetY: number, targetElement: HTMLElement) => {
        const xConfidence = Math.min(Math.abs(offsetX) / targetElement.offsetWidth, 1);
        const yConfidence = Math.min(Math.abs(offsetY) / targetElement.offsetHeight, 1);

        return Math.max(xConfidence, yConfidence);
      },
      minThrowOutDistance: 50
    };
  }

  ngAfterViewInit() {
    this.swingStack.throwoutleft.subscribe(
      (event: ThrowEvent) => {
        event.target.remove();
        this.swipedLeft++;
      });

    this.swingStack.throwoutright.subscribe(
      (event: ThrowEvent) => {
        event.target.remove();
        this.swipedRight++;
      });
  }
}
