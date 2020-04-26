import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs'
import { GameState } from './gamestate.service';
import { GameStateStatus } from './gamestatestatus.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  message = ""
  messageChange: Subject<string> = new Subject<string>();

  constructor(private socket: Socket, private gameState: GameState) {
    this.messageChange.subscribe((value) => {
      this.message = value
    })
  }

  toggleSidebarVisibility(message: string) {
    this.messageChange.next(message)
  }

  newGame() {
    this.socket.emit('newGame', {});
    this.socket.on("new", (message) => {
      this.messageChange.next(message["message"]);
    });
    this.socket.on("start", (message) => {
      this.gameState.gameStartedChange.next(GameStateStatus.PICKING);
      this.messageChange.next(message["message"]);
    });
  }

  joinGame(code: string) {
    this.socket.emit("join", {code: code});
    this.socket.on("room full", (message) => {
      this.messageChange.next(message["message"]);
    });
    this.socket.on("invalid game id", (message) => {
      this.messageChange.next(message["message"]);
    });
    this.socket.on("start", (message) => {
      this.gameState.gameStartedChange.next(GameStateStatus.PICKING);
      this.messageChange.next(message["message"]);
    });
  }

  getMessage() {
    return this.message;
  }
}