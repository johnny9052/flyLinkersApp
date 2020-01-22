import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Events, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('content', { static: false }) content: IonContent;
  @ViewChild('chat_input', { static: false }) messageInput: ElementRef;
  User = 'Me';
  toUser = 'driver';
  inpText: any;
  editorMsg = '';
  showEmojiPicker = false;
  msgList: Array<{
    userId: any,
    userName: any,
    userAvatar: any,
    time: any,
    message: any,
    upertext: any;
  }>;
  public count = 0;
  public arr = [
    {
      messageId: '1',
      userId: '140000198202211138',
      userName: 'Luff',
      userImgUrl: './assets/user.jpg',
      toUserId: '210000198410281948',
      toUserName: 'Hancock',
      userAvatar: './assets/to-user.jpg',
      time: 1488349800000,
      message: 'Hola! como estas?',
      status: 'success'

    },
    {
      messageId: '2',
      userId: '210000198410281948',
      userName: 'Hancock',
      userImgUrl: './assets/to-user.jpg',
      toUserId: '140000198202211138',
      toUserName: 'Luff',
      userAvatar: './assets/user.jpg',
      time: 1491034800000,
      message: 'Todo se encuentra muy bien por aqui',
      status: 'success'
    },
    {
      messageId: '3',
      userId: '140000198202211138',
      userName: 'Luff',
      userImgUrl: './assets/user.jpg',
      toUserId: '210000198410281948',
      toUserName: 'Hancock',
      userAvatar: './assets/to-user.jpg',
      time: 1491034920000,
      message: 'Cuando nos vamos a ver?',
      status: 'success'
    },
    {
      messageId: '4',
      userId: '210000198410281948',
      userName: 'Hancock',
      userImgUrl: './assets/to-user.jpg',
      toUserId: '140000198202211138',
      toUserName: 'Luff',
      userAvatar: './assets/user.jpg',
      time: 1491036720000,
      message: 'Tenemos que coordinar horarios',
      status: 'success'
    },
    {
      messageId: '5',
      userId: '210000198410281948',
      userName: 'Hancock',
      userImgUrl: './assets/to-user.jpg',
      toUserId: '140000198202211138',
      toUserName: 'Luff',
      userAvatar: './assets/user.jpg',
      time: 1491108720000,
      message: 'Vi las fotos de tu nuevo carro, estas geniales!!!',
      status: 'success'
    },
    {
      messageId: '6',
      userId: '140000198202211138',
      userName: 'Luff',
      userImgUrl: './assets/user.jpg',
      toUserId: '210000198410281948',
      toUserName: 'Hancock',
      userAvatar: './assets/to-user.jpg',
      time: 1491231120000,
      message: 'Y eso que deberias verlo en otros colores',
      status: 'success'
    }
  ];


  constructor(private events: Events, ) {
    this.msgList = [
      {
        userId: this.User,
        userName: this.User,
        userAvatar: 'assets/driver.jpeg',
        time: '12:01 pm',
        message: 'Que alegria saludarte!',
        upertext: 'Hello'
      },
      {
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: 'assets/user.jpeg',
        time: '12:01 pm',
        message: 'Tiempo sin saber de ti',
        upertext: 'Hii'
      },
      {
        userId: this.User,
        userName: this.User,
        userAvatar: 'assets/driver.jpeg',
        time: '12:01 pm',
        message: 'Nos podemos reunir?',
        upertext: 'How r u '
      },
      {
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: 'assets/user.jpeg',
        time: '12:01 pm',
        message: 'Si tienes toda la razon',
        upertext: 'good'
      },
      {
        userId: this.User,
        userName: this.User,
        userAvatar: 'assets/driver.jpeg',
        time: '12:01 pm',
        message: 'Concuerdo contigo',
        upertext: 'How r u '
      },
      {
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: 'assets/user.jpeg',
        time: '12:01 pm',
        message: 'Si claro!',
        upertext: 'good'
      },
      {
        userId: this.User,
        userName: this.User,
        userAvatar: 'assets/driver.jpeg',
        time: '12:01 pm',
        // tslint:disable-next-line: max-line-length
        message: 'Si',
        upertext: 'How r u '
      },
      {
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: 'assets/user.jpeg',
        time: '12:01 pm',
        message: 'Si claro, voy a buscarlos',
        upertext: 'good'
      },
    ];

  }

  ngOnInit() {
  }

  scrollToBottom() {
    this.content.scrollToBottom(100);
  }

  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    console.log('scrollBottom');
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
    console.log('scrollBottom2');
  }

  logScrollStart() {
    console.log('logScrollStart');
    document.getElementById('chat-parent');
  }

  logScrolling(event) {
    console.log('event', event);
  }



  sendMsg() {
    let otherUser;
    if (this.count === 0) {
      otherUser = this.arr[0].message;
      this.count++;
    } else if (this.count === this.arr.length) {
      this.count = 0;
      otherUser = this.arr[this.count].message;
    } else {
      otherUser = this.arr[this.count].message;
      this.count++;
    }

    this.msgList.push({
      userId: this.User,
      userName: this.User,
      userAvatar: 'assets/user.jpeg',
      time: '12:01 pm',
      message: this.inpText,
      upertext: this.inpText
    });
    this.msgList.push({
      userId: this.toUser,
      userName: this.toUser,
      userAvatar: 'assets/user.jpeg',
      time: '12:01 pm',
      message: otherUser,
      upertext: otherUser
    });
    this.inpText = '';
    console.log('scrollBottom');
    setTimeout(() => {
      this.scrollToBottom();
    }, 10);
  }

}
