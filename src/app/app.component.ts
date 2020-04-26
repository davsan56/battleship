import { ChangeDetectorRef, Component} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { GameService } from './service/game.service';
import { MatDialog } from '@angular/material/dialog';
import { JoinWindowComponent } from './join-window/join-window.component';
import { GameState } from './service/gamestate.service';
import { GameStateStatus } from './service/gamestatestatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'battleship2';

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 2}, (_, i) => `New Game`, 'Join Game');

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private gameService: GameService,
    public dialog: MatDialog,
    public gameStateService: GameState
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  newGame() {
    this.gameService.newGame();
  }

  joinGame() {
    this.openDialog()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JoinWindowComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(code => {
      if (code != undefined) {
        this.gameService.joinGame(code);
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  get gameStateStatus() { 
    return GameStateStatus;
  }
}
