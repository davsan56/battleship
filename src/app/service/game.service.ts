import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  message = ""
  messageChange: Subject<string> = new Subject<string>();

  constructor(private socket: Socket) {
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
      console.log("new message from server")
      console.log(message)
      this.messageChange.next(message["name"])
    })
  }

  joinGame(code: string) {
    console.log("trying to join game with code", code);
  }

  getMessage() {
    return this.message;
  }
}