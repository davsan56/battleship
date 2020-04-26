import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { GameStateStatus } from './gamestatestatus.service'; 

@Injectable({
  providedIn: 'root'
})
export class GameState {
  gameState = GameStateStatus.NONE
  gameStartedChange: Subject<GameStateStatus> = new Subject<GameStateStatus>();

  constructor(private socket: Socket) {
    this.gameStartedChange.subscribe((value) => {
      this.gameState = value
    })
  }
}