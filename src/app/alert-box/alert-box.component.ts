import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent {
  constructor( 
    public dialogRef: MdDialogRef<AlertBoxComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) 
    
    {
    console.log(data); // the value passed as input
  }

}
