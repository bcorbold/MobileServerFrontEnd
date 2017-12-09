import { Component, OnInit } from '@angular/core';

import * as Cookies from 'js-cookie';

@Component({
  selector: 'ms-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  ngOnInit() {
    console.log(Cookies.get('ms-session-key'));
  }

}
