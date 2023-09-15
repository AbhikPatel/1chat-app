import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../shared/communication/communication.service';
import { ConversationUsers } from '../models/chat.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html'
})
export class ChatHeaderComponent implements OnInit {
  /** This Properties store receiversConversation object  */
  public receiversConversation: ConversationUsers;
  /** variable to display the current window on messages */
  public currentWindow: boolean;
  constructor(private _communicationService: CommunicationService,
    private _router: Router) {
    this.currentWindow = true;
  }
  ngOnInit(): void {
    this._communicationService.ConversationUser$.subscribe((ConversationUsers: ConversationUsers) => {
      this.receiversConversation = ConversationUsers;
    })
    this._communicationService.tabData.subscribe((dataTab: boolean) => this.currentWindow = dataTab)
  }
  /**
   * 
   * @param data 
   * @description This method show current window
   */
  public onWindow(data: boolean): void {
    this.currentWindow = data;
   
  }
  /**
   * 
   * @name navigationConversation 
   * @description This method navigate conversation
   */
  public navigationConversation() {
    localStorage.removeItem('TabData')
    this._router.navigate(['chat', this.receiversConversation.chatId]);
  }
  /**
     * 
     * @name navigationConversation 
     * @description This method navigate eod
     */
  public navigationEod() {
    this._router.navigate(['chat', this.receiversConversation.chatId, 'eod']);
    localStorage.setItem('TabData', 'true');
  }

}
