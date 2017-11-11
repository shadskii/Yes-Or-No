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
      minThrowOutDistance: 100
    };
  }

  ngAfterViewInit() {
    console.log(this.swingStack);
    console.log(this.swingCards);
    // we can get the underlying stack
    // which has methods - createCard, destroyCard, getCard etc
    console.log(this.swingStack.stack);

    // and the cards
    // every card has methods - destroy, throwIn, throwOut etc
    this.swingCards.forEach((c) => console.log(c.getCard()));

    // this is how you can manually hook up to the
    // events instead of providing the event method in the template
    this.swingStack.throwoutleft.subscribe(
      (event: ThrowEvent) => event.target.remove());

    this.swingStack.throwoutright.subscribe(
      (event: ThrowEvent) => event.target.remove());
  }

  // This method is called by hooking up the event
  // on the HTML element - see the template above
  onThrowOut(event: ThrowEvent) {
    console.log('Hook from the template', event.throwDirection);
    if (event.throwDirection === Direction.RIGHT) {
      this.swipedRight++;
    } else if (event.throwDirection === Direction.LEFT) {
      this.swipedLeft++;
    }
  }
}
