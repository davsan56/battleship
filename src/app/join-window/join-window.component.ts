import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'join-window',
  templateUrl: './join-window.component.html',
  styleUrls: ['./join-window.component.scss']
})
export class JoinWindowComponent implements OnInit {

  code = ""

  constructor(public dialogRef: MatDialogRef<JoinWindowComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
