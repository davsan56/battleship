import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { GameState } from '../service/gamestate.service';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  message = "Hit New Game to get a room code or Join Game to enter a room code"

  constructor(private gameService: GameService, public gameState: GameState) { }

  ngOnInit() {
    this.gameService.messageChange.subscribe(value => {
      this.message = value;
    });
  }
}
