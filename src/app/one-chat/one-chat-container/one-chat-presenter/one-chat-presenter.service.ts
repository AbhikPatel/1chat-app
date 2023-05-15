import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormatTime } from 'src/app/core/utilities/formatTime';
import { NewUser } from 'src/app/shared/models/user.model';
import { Alive, Conversation, ConversationUser, CreateChat, Group, GroupDetails, Member, MessageRead, NewMessage, Typing } from '../../models/chat.model';

@Injectable()

export class OneChatPresenterService {

  /** This property is used to transfer the details of all the users */
  private allUsers: Subject<NewUser[]>;
  public allUsers$: Observable<NewUser[]>;

  /** This property is used to transfer the details of only the conversation users */
  private onlyConversationUsers: Subject<ConversationUser[]>;
  public onlyConversationUsers$: Observable<ConversationUser[]>;

  /** This property is used to transfer the data of the new chat */
  private chatData: Subject<NewMessage>;
  public chatData$: Observable<NewMessage>;
  /** This property is used to transfer the data of the edit Chat */
  private editChat: Subject<NewMessage>;
  public editChat$: Observable<NewMessage>;
  /** This property is used to transfer the array of chats */
  private chatArray: Subject<NewMessage[]>;
  public chatArray$: Observable<NewMessage[]>;

  /** This property is used to transfer the details of the receiver */
  private receiverData: Subject<NewUser>;
  public receiverData$: Observable<NewUser>;

  /** This property is used to transfer the object of new chat */
  private startNewChat: Subject<CreateChat>;
  public startNewChat$: Observable<CreateChat>;

  /** This property is used to transfer the details of the new conversation user */
  private newConversationUser: Subject<ConversationUser>;
  public newConversationUser$: Observable<ConversationUser>;

  /** This property is used to transfer the details of the sender */
  private senderDetails: Subject<NewUser>;
  public senderDetails$: Observable<NewUser>;

  /** This property is used to create typing event */
  private typingData: Subject<Typing>;
  public typingData$: Observable<Typing>;

  /** This property is used to transfer group chats conversation */
  private groupChatDetails: Subject<GroupDetails>;
  public groupChatDetails$: Observable<GroupDetails>;

  /** This property is used to transfer group chat details */
  private groupChatConversation: Subject<Group[]>;
  public groupChatConversation$: Observable<Group[]>;

  /** This property is used to transfer group chat details */
  private notificationCount: Subject<any>;
  public notificationCount$: Observable<any>;

  /** This property is used to store all the users */
  public users: NewUser[];
  /** This property is used to store array of chats */
  public chats: NewMessage[];
  /** This property is used to store the state of new chat */
  public newChatState: boolean;
  /** This property is used to store the user ID */
  public userId: string | null;
  /** This property is used to store role of the user */
  public role: string | null;
  /** This property is used to store receiver ID */
  public receiverId: string;
  /** This property is used to store chat ID */
  public chatId: string;
  /** This property is used to store the updated chat */
  public updatedChat: string;
  /** This property is used to store the all the chat Id in an array */
  public allChatIds: string[];
  /** This property is used to store the details of the user */
  public userDetails: NewUser | undefined;
  /** This property is used to store the details of all the leads */
  public onlyLeads: NewUser[];
  /** This property is used to store the details online  users */
  public onlineUsers: string[];
  /** This variable will store the type of the current chat */
  public chatType: string;
  /** This property is used to store the details of conversation users */
  public conversationUser: ConversationUser[];
  /** This property is used to store the details of group conversation users */
  public groupConversation: Group[];
  public editMessage: string;


  constructor(
    private _formatter: FormatTime
  ) {
    this.allUsers = new Subject();
    this.allUsers$ = new Observable();
    this.allUsers$ = this.allUsers.asObservable();

    this.onlyConversationUsers = new Subject();
    this.onlyConversationUsers$ = new Observable();
    this.onlyConversationUsers$ = this.onlyConversationUsers.asObservable();

    this.chatData = new Subject();
    this.chatData$ = new Observable();
    this.chatData$ = this.chatData.asObservable();

    this.chatArray = new Subject();
    this.chatArray$ = new Observable();
    this.chatArray$ = this.chatArray.asObservable();

    this.receiverData = new Subject();
    this.receiverData$ = new Observable();
    this.receiverData$ = this.receiverData.asObservable();

    this.startNewChat = new Subject();
    this.startNewChat$ = new Observable();
    this.startNewChat$ = this.startNewChat.asObservable();

    this.newConversationUser = new Subject();
    this.newConversationUser$ = new Observable();
    this.newConversationUser$ = this.newConversationUser.asObservable();

    this.senderDetails = new Subject();
    this.senderDetails$ = new Observable();
    this.senderDetails$ = this.senderDetails.asObservable();

    this.typingData = new Subject();
    this.typingData$ = new Observable();
    this.typingData$ = this.typingData.asObservable();

    this.groupChatDetails = new Subject();
    this.groupChatDetails$ = new Observable();
    this.groupChatDetails$ = this.groupChatDetails.asObservable();

    this.groupChatConversation = new Subject();
    this.groupChatConversation$ = new Observable();
    this.groupChatConversation$ = this.groupChatConversation.asObservable();

    this.notificationCount = new Subject();
    this.notificationCount$ = new Observable();
    this.notificationCount$ = this.notificationCount.asObservable();

    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');

    this.receiverId = '';
    this.chatId = '';
    this.updatedChat = '';
    this.chats = [];
    this.users = [];
    this.allChatIds = [];
    this.onlyLeads = [];
    this.conversationUser = [];
    this.groupConversation = [];
    this.newChatState = false;
    this.userDetails = {} as NewUser;
  }
  /**
   * @name removeUserData
   * @param chat 
   * @description This method is use to filter the data and get only conversation user and also only chat Ids
   */
  public removeUserData(conversationUsers: Conversation[]): void {
    this.allChatIds = conversationUsers.map((user: Conversation) => user._id);
    conversationUsers.forEach((chatData: Conversation) => {
      if (chatData.chat_type === 'dm') {
        let id: string = chatData._id
        let member: Member = chatData.members.find((user: Member) => user._id !== this.userId)
        let obj = {
          message: chatData.lastMessage ? chatData.lastMessage.content.text : '-',
          time: this._formatter.Formatter(chatData.lastMessage ? new Date(chatData.lastMessage.time) : new Date()),
          timestamp: chatData.lastMessage ? new Date(chatData.lastMessage.time) : new Date(),
          notificationCount: chatData.lastMessage ? ((chatData.lastMessage.is_read === false && chatData.lastMessage.sender !== this.userId) ? 1 : 0) : 0,
          full_name: member.first_name + ' ' + member.last_name,
          chatId: id,
          type: chatData.chat_type
        }
        this.conversationUser.push(Object.assign(member, obj))
      } else {
        if(chatData.lastMessage){
          var sender:NewUser | undefined  = this.users.find((data: NewUser) => data._id === chatData.lastMessage.sender);
        }
        
        let obj = {
          chatId: chatData._id,
          photo: 'default.jpeg',
          title: chatData.title,
          message: chatData.lastMessage ? chatData.lastMessage.content.text : '-',
          notificationCount: 0,
          time: this._formatter.Formatter(new Date()),
          type: 'group',
          lastUser: 'Unknown',
        }
        let memberArr: Member[] = chatData.members.map((user: Member) => {
          user.full_name = user.first_name + ' ' + user.last_name
          return user
        });
        this.groupConversation.push(Object.assign(obj, { members: memberArr }))
      }
    });
    const sortbyTime = (a, b) => {
      const timestampA = a.timestamp.getTime();
      const timestampB = b.timestamp.getTime();
      return timestampB - timestampA;
    };
    this.onlyConversationUsers.next(this.conversationUser.sort(sortbyTime));
    this.groupChatConversation.next(this.groupConversation.sort(sortbyTime));
    this.countNotification();
  }

  /**
   * @name removeOwner
   * @param user 
   * @description This method will remove the owner from the array of users
   */
  public removeOwner(user: NewUser[]): void {
    this.users = user;
    this.onlyLeads = user.filter((items: NewUser) => items.role === 'lead' || items.role === 'mentor');
    let filteredUsers = this.users.filter((items: NewUser) => items._id !== this.userId);
    this.role === 'intern' ? this.allUsers.next(this.onlyLeads) : this.allUsers.next(filteredUsers);
    let sender = this.users.find((items: NewUser) => items._id === this.userId);
    this.senderDetails.next(sender);
  }

  /**
   * @name getMessage
   * @param message 
   * @description This method is use to create the object of the new message and send it to server
   */
  public getMessage(message: string): void {
    if (this.userId) {
      if (this.newChatState) {
        let newChat: CreateChat = {
          owner: this.userId,
          chat_type: 'dm',
          title: 'dm',
          members: [
            this.userId,
            this.receiverId
          ]
        }
        this.startNewChat.next(newChat);
        this.chats = [];
        this.newChatState = false;
        this.updatedChat = message;
      } else {
        let currentTime = new Date()
        let chatObj: NewMessage = {
          _id: '',
          replied_to:'',
          is_read: false,
          is_edit: false,
          chat: this.chatId,
          sender: this.userId,
          receiver: this.chatType === 'group' ? this.chatId : this.receiverId,
          time: currentTime,
          type: 'text',
          is_sender: true,
          convertedTime: this._formatter.Formatter(currentTime),
          content: {
            text: message
          },
          chat_type: this.chatType
        }
        this.chatData.next(chatObj)
        this.chats.push(chatObj)
        this.getChatArray(this.chats);
        if (this.chatType === 'dm') {
          let id = this.conversationUser.findIndex((user: ConversationUser) => user.chatId === this.chatId);
          this.conversationUser[id].message = message;
          this.conversationUser[id].time = this._formatter.Formatter(currentTime);
          this.conversationUser.unshift(this.conversationUser.splice(id, 1)[0]);
          this.onlyConversationUsers.next(this.conversationUser);
          this.countNotification();
        } else {
          let id = this.groupConversation.findIndex((user: Group) => user.chatId === this.chatId);
          this.groupConversation[id].message = message;
          this.groupConversation[id].time = this._formatter.Formatter(currentTime);
          let fullName = this.users.find((data: NewUser) => data._id === this.userId).full_name
          this.groupConversation[id].lastUser = fullName;
          this.groupConversation.unshift(this.groupConversation.splice(id, 1)[0]);
          this.groupChatConversation.next(this.groupConversation);
          this.countNotification();
        }
      }
    }
  }

  /**
   * @name getChatArray
   * @param chat
   * @description This method will store the chat in chats variable and pass it
   */
  public getChatArray(chat: NewMessage[]): void {
    this.chats = chat;
    this.chatArray.next(chat);
  }

  /**
   * @name addNewChat
   * @param newChat 
   * @description This method is use to add new conversation user
  */
  public addNewChat(newChat: NewMessage): void {
    const isGroupChat = this.groupConversation.find((user: Group) => user.chatId === newChat.chat);
    const isChatId = this.allChatIds.find((id: string) => id === newChat.chat);
    if (this.receiverId === newChat.sender && newChat.chat_type === 'dm') {
      this.chats.push(newChat);
      this.getChatArray(this.chats);
    }
    if (newChat.chat === this.chatId && newChat.chat_type === 'group') {
      this.chats.push(newChat);
      this.getChatArray(this.chats);
    }
    if (isGroupChat) {
      let userId: number = this.groupConversation.findIndex((items: Group) => items.chatId === newChat.chat);
      let user: string = this.users.find((data: NewUser) => data._id === newChat.sender).full_name;
      this.groupConversation[userId].message = newChat.content.text;
      this.groupConversation[userId].time = newChat.convertedTime;
      this.groupConversation[userId].lastUser = user;
      if (newChat.chat !== this.chatId)
        this.groupConversation[userId].notificationCount = this.groupConversation[userId].notificationCount + 1
      this.countNotification();
      this.groupChatConversation.next(this.groupConversation)

    } else {
      if (!isChatId) {
        this.userDetails = this.users.find((items: NewUser) => items._id === newChat.sender);

        if (this.userDetails) {
          let obj: ConversationUser = {
            _id: this.userDetails._id,
            first_name: this.userDetails.first_name,
            last_name: this.userDetails.last_name,
            photo: this.userDetails.photo,
            full_name: this.userDetails.full_name,
            chatId: newChat.chat,
            time: this._formatter.Formatter(new Date()),
            message: newChat.content.text,
            notificationCount: 1,
            role: this.userDetails.role
          }

          if (this.conversationUser.length === 0)
            this.chatId = newChat.chat;

          this.newConversationUser.next(obj);
          this.allChatIds.push(newChat.chat);
          this.countNotification();
          this.onlyConversationUsers.next(this.conversationUser);
        }
      } else {
        let userId: number = this.conversationUser.findIndex((items: ConversationUser) => items.chatId === newChat.chat);
        this.conversationUser[userId].message = newChat.content.text;
        this.conversationUser[userId].time = newChat.convertedTime;
        if (newChat.sender !== this.receiverId)
          this.conversationUser[userId].notificationCount === 0 ? this.conversationUser[userId].notificationCount = 1 : this.conversationUser[userId].notificationCount++;
        this.conversationUser.unshift(this.conversationUser.splice(userId, 1)[0]);
        this.countNotification();
        this.onlyConversationUsers.next(this.conversationUser);
      }
    }
  }
  /**
   * @name getReceiverId
   * @param id 
   * @description This method is use to get the details of the receiver from Id
  */
  public getReceiverId(id: string): void {
    if (this.chatType === 'dm') {
      this.receiverId = id;
      let receiver: NewUser | undefined = this.users.find((items: NewUser) => items._id === this.receiverId);
      if (receiver)
        this.receiverData.next(receiver);
    } else {
      let groupData: Group = this.groupConversation.find((user: Group) => user.chatId === this.chatId);
      let groupObj: GroupDetails = {
        chatId: groupData.chatId,
        members: groupData.members,
        title: groupData.title,
        photo: groupData.photo,
      }
      this.groupChatDetails.next(groupObj)
    }
    if (this.newChatState)
      this.chatArray.next([]);

  }

  /**
   * @name updatedChatObj
   * @description This method is use to update the chat object
  */
  public updatedChatObj(id: string): void {
    this.chatId = id;
    this.getMessage(this.updatedChat);
    let index = this.conversationUser.findIndex((user: ConversationUser) => user.chatId === '');
    this.conversationUser[index].chatId = id;
    this.allChatIds.push(id);
    this.updatedChat = '';
  }

  /**
   * @name createTypingData
   * @param id 
   * @description This method is use to create obj for typing event
  */
  public createTypingData(id: string): void {
    let obj: Typing = {
      receiver: this.chatType === 'dm' ? this.receiverId : this.chatId,
      sender: id,
      isGroup: this.chatType === 'dm' ? false : true
    }
    this.typingData.next(obj)
  }

  /**
   * @name updateChatArray
   * @param data 
   * @description This method will update the chat array
  */
  public updateChatArray(data: MessageRead): void {
    if (this.chatId === data.chatId) {
      this.chats.map((message: NewMessage) => message.is_read = true)
      this.getChatArray(this.chats)
    }
  }

  /**
   * @name countNotification
   * @description This method will update the notification count of both the chat and group chat
  */
  private countNotification(): void {
    const obj = {
      group: this.groupConversation.filter((user: Group) => user.notificationCount > 0).length,
      chat: this.conversationUser.filter((user: ConversationUser) => user.notificationCount > 0).length,
    }
    this.notificationCount.next(obj)
  }

  /**
   * @name getOnlineUsers
   * @description This method will get all the online users ID
   */
  public getOnlineUsers(user: Alive[]): void {
    this.onlineUsers = user.map((data: Alive) => data.userId)
  }
  /**
   * 
   * @param newMessage 
   * @description This method Using edit message with out page Refresh and receiver ConversationUser list update last message 
  */
  public editMessageChat(newMessage: NewMessage) :void{
    if (this.chatType === 'dm') {
      const chatsFilterData: any = this.chats.filter((data: NewMessage) => data.receiver === newMessage.receiver);
    if (chatsFilterData[chatsFilterData.length - 1]._id === newMessage._id) {
      let userId: number = this.conversationUser.findIndex((items: ConversationUser) => items.chatId === newMessage.chat);
      this.conversationUser[userId].message = newMessage.content.text;
      this.onlyConversationUsers.next(this.conversationUser);
    }
    // splice Message 
    const index = this.chats.findIndex((chats: NewMessage) => chats._id === newMessage._id);
    this.chats.splice(index, 1, newMessage);
    }
 
  }

  /**
   * @param editMessage 
   * @description This Method Update edit Message 
   */
  public getEditMessage(editMessage: string):void {
    if (this.chatType === 'dm') {
      let id = this.conversationUser.findIndex((user: ConversationUser) => user.chatId === this.chatId);
      this.conversationUser[id].message = editMessage;
    }
  }

  public getReplyMessage(replyObj:NewMessage):void{
    console.log(replyObj);
    this.chats.push(replyObj)
  }
}
