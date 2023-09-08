import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { ChatService } from '../chat.service';
import { Subject, takeUntil } from 'rxjs';
import { ConversationUsers } from '../models/chat.model';
import { CommunicationService } from '../shared/communication/communication.service';

@Component({
  selector: 'app-create-group-form-container',
  templateUrl: './create-group-form-container.component.html'
})
export class CreateGroupFormContainerComponent  implements OnInit{
 /** This property is used to core Overlay services get all the user details  */
  @Input() public set getAllUsers(v: any[]) {
    if (v)
      this._getAllUsers = v;
  }
  public get getAllUsers(): any[] {
    return this._getAllUsers;
  }
  /**This properties are used for getter setter */
  private _getAllUsers: User[];
  
  constructor(private _chatService: ChatService,
    private _communicationService: CommunicationService,) {
    this._getAllUsers = [];
  }
  ngOnInit(): void {
    // this.joinGroupChatById();
  }
 /**
   * @name getNewGroupDetails
   * @param data 
   * @description This method will request a post api for creating a new group chat
   */
 public getNewGroupDetails(groupDetails): void {
  this._chatService.postNewGroup(groupDetails).subscribe((data:any)=>{
    if(data){
      this.joinGroupChatById();
      // this._communicationService.setNewGroupConversation(data.data.doc)
    }
  

  })
}
  /**
   * @name joinGroupChatById
   * @description This method will emit the id in the socket of all the users to join the room 
   */
  private joinGroupChatById(): void {
    this._chatService.getConversationUser().subscribe((users:any) => {
       this._communicationService.setNewGroupConversation(users)
      var groupIds: string[] = [];
      users.map((data: ConversationUsers) => {
        if (data.chat_type === 'group')
          groupIds.push(data.chatId)
      })
      this._chatService.emit('group:join', groupIds);
    })
  }
}
