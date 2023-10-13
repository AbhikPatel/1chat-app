import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConversationUsers } from '../../models/chat.model';
import { EditEodTasks, EodSubmission, Task } from '../../models/eod.model';

@Injectable()
export class CommunicationService {
  /** This variable Observable New conversationDetails to set header */
  public ConversationUser$: Observable<ConversationUsers>;
  /** This variable Observable   NewGroupConversation store */
  public NewGroupConversation$: Observable<ConversationUsers>;
  /**  This variable Observable   Task Response store * */
  public taskResponse$: Observable<Task>;
  /**  This variable Observable  editTaskResponse store * */
  public editTaskResponse$: Observable<EditEodTasks>;
  /**  This variable Observable  senEodData store * */
  public senEodData$: Observable<EodSubmission>;
  /**  This variable Observable setLastMessageInConversation store * */
  public setLastMessageInConversation$: Observable<any>;
  /**  This variable Observable chatTabGetMessages store * */
  public chatTabGetMessages$: Observable<boolean>;
  /** This variable Subject New conversationDetails to set header * */
  private ConversationUser: Subject<ConversationUsers>;
  /** This variable Subject NewGroupConversation store  * */
  private NewGroupConversation: Subject<ConversationUsers>;
  /** This variable Subject  Task Response store  * */
  private taskResponse: Subject<Task>;
  /** This variable Subject  editTaskResponse store  * */
  private editTaskResponse: Subject<EditEodTasks>;
  /** This variable Subject  senEodData store  * */
  private senEodData: Subject<EodSubmission>;
  /** This variable Subject  to store tabData boolean  * */
  public tabData: Subject<boolean>;
  public tabDataApi: Subject<boolean>;
  /** This variable Subject  to store selectedTabData * */
  public selectedTabData: Subject<boolean>;
  /** This variable Subject  to deleteEodID  * */
  public deleteEodId: Subject<number>;
  /** This variable Subject  to store receiverId  * */
  public receiverId: Subject<string>;
  /**  This variable Subject setLastMessageInConversation store * */
  private setLastMessageInConversation: Subject<any>;
  /**  This variable Subject setLastMessageInConversation store * */
  public chatTabGetMessages: Subject<boolean>;
  /**  This variable Subject currentConversationUser store * */
  public currentConversationUser: Subject<ConversationUsers>;

  constructor() {
    this.ConversationUser$ = new Observable();
    this.NewGroupConversation$ = new Observable();
    this.taskResponse$ = new Observable();
    this.editTaskResponse$ = new Observable();
    this.chatTabGetMessages$ = new Observable();

    this.editTaskResponse$ = new Observable();
    this.senEodData$ = new Observable();
    this.setLastMessageInConversation$ = new Observable();
    this.ConversationUser = new Subject();
    this.tabData = new Subject();
    this.selectedTabData = new Subject();
    this.NewGroupConversation = new Subject();
    this.taskResponse = new Subject();
    this.editTaskResponse = new Subject();
    this.tabDataApi = new Subject();
    this.deleteEodId = new Subject();
    this.senEodData = new Subject();
    this.chatTabGetMessages = new Subject();
    this.setLastMessageInConversation = new Subject();
    this.currentConversationUser = new Subject();

    this.ConversationUser$ = this.ConversationUser.asObservable();
    this.NewGroupConversation$ = this.NewGroupConversation.asObservable();
    this.taskResponse$ = this.taskResponse.asObservable();
    this.editTaskResponse$ = this.editTaskResponse.asObservable();
    this.senEodData$ = this.senEodData.asObservable();
    this.senEodData$ = this.senEodData.asObservable();
    this.setLastMessageInConversation$ = this.setLastMessageInConversation.asObservable();
    // this.chatTabGetMessages$ = this.chatTabGetMessages.asObservable();

  }
  /**
   *@name setHeaderDetails
   * @param ConversationUser 
   * @description This method next conversation user
   */
  public setHeaderDetails(ConversationUser: ConversationUsers) {
    this.ConversationUser.next(ConversationUser);
  }
  /**
   *@name setNewGroupConversation
   * @param ConversationUser 
   * @description This method next NewGroupConversation  
   */
  public setNewGroupConversation(NewGroupConversation: ConversationUsers) {
    this.NewGroupConversation.next(NewGroupConversation);
  }
  /**
   *@name postTaskReportsResponses
   * @param taskResponse 
   * @description This method next postTaskReportsResponses  
   */
  public postTaskReportsResponses(taskResponse: Task) {
    this.taskResponse.next(taskResponse);
  }
  /**
   *@name postTaskReportsResponses
   * @param taskResponse 
   * @description This method next postTaskReportsResponses  
   */
  public editTaskResponses(editTaskResponse: EditEodTasks) {
    this.editTaskResponse.next(editTaskResponse);
  }
  /**
   *@name postTaskReportsResponses
   * @param taskResponse 
   * @description This method next postTaskReportsResponses  
   */
  public sendEodData(sendEodData: EodSubmission) {
    this.senEodData.next(sendEodData);
  }
  /**
   *@name postTaskReportsResponses
   * @param taskResponse 
   * @description This method next setLastMessageInConversationData  
   */
  public chatTabGetMessagesData(chatTabGetMessages: boolean) {
    this.chatTabGetMessages.next(chatTabGetMessages);
  }
  /**
   *@name postTaskReportsResponses
   * @param taskResponse 
   * @description This method next setLastMessageInConversationData  
   */
  public setLastMessageInConversationData(setLastMessageInConversation: any) {
    this.setLastMessageInConversation.next(setLastMessageInConversation);
  }
}
