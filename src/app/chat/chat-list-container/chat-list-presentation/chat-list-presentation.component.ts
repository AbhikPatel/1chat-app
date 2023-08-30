import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-chat-list-presentation-ui',
  templateUrl: './chat-list-presentation.component.html'
})
export class ChatListPresentationComponent implements OnInit {
  /** This element is for toggle search */
  @ViewChild('toggle') public toggle: ElementRef;
  /** This variable will store the data of the current tab */
  public tabData: boolean;

  public conversationUser: any
  constructor(private _commonService: CommonService,
    private _activatedRoute: ActivatedRoute) {
    this.tabData = true;
  }
  ngOnInit(): void {
    // get user object uisng activateRoute
    this._activatedRoute.queryParamMap.subscribe((params: any) => {
      this.conversationUser = JSON.parse(params.get('data'))

      console.log(this.conversationUser);

    })
  }
  /**
* @name onSearchUser
* @description This method is used to show Aside bar
*/
  public openAsideBar() {
    this.toggle.nativeElement.checked ? this.toggle.nativeElement.checked = false : this.toggle.nativeElement.checked = true;
    const data = this.toggle.nativeElement.checked;
    this._commonService.userApiCall.next(data)
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
