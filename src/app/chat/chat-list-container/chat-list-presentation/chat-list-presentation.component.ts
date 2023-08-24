import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-chat-list-presentation-ui',
  templateUrl: './chat-list-presentation.component.html'
})
export class ChatListPresentationComponent implements OnInit {
  /** This element is for toggle search */
  @ViewChild('toggle') public toggle: ElementRef;
  /** This variable will store the data of the current tab */
  public tabData: boolean;
  constructor() {
    this.tabData = true;
  }

  ngOnInit(): void {
  }
  /**
* @name onSearchUser
* @description This method is used to show Aside bar
*/
  public openAsideBar(boolean: boolean) {
    this.toggle.nativeElement.checked ? this.toggle.nativeElement.checked = false : this.toggle.nativeElement.checked = true
  }

  /**
   * @name closeAsideBar
   * @description This method close aside bar click on single user in list of user
   */
  public closeAsideBar(boolean: boolean) {
    this.toggle.nativeElement.checked = boolean
  }

  /**
   * @name onTabSwitch
   * @param data 
   * @description This method is used to show the chats which depend on the data
   */
  public onTabSwitch(data: boolean): void {
    this.tabData = data;
  }
}
