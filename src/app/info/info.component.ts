import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  code = ""

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.messageChange.subscribe(value => {
      console.log("new message recieved")
      this.code = value
    });
  }
}
