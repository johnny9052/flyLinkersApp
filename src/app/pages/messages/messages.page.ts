import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  public chatData: Array<any>;

  constructor(private router: Router) { }

  ngOnInit() {

    this.chatData = [{
      name: 'Jovenica',
      image: '../../assets/chat/user.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'online',
      count: '2',
      time: '2 min ago'
    }, {
      name: 'Oliver',
      image: ' ../../assets/chat/user3.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'offline',
      badge: '4',
      sendTime: '18:34',
      group: true
    }, {
      name: 'George',
      image: ' ../../assets/chat/user4.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'offline',
      count: '2',
      sendTime: '18:30',
      broadcast: true
    }, {
      name: 'Harry',
      image: ' ../../assets/chat/user1.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!',
       status: 'online',
       badge: '6',
      sendTime: '17:55'
    }, {
      name: 'Jack',
      image: ' ../../assets/chat/user.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'offline',
      sendTime: '17:55'
    }, {
      name: 'Jacob',
      image: ' ../../assets/chat/user3.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'offline',
      count: '1',
      sendTime: '17:50'
    }, {
      name: 'Noah',
      image: ' ../../assets/chat/user2.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'offline',
      sendTime: '17:40'
    }, {
      name: 'Charlie',
      image: ' ../../assets/chat/user4.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!',
       status: 'online',
      count: '6',
      badge: '8',
      sendTime: '17:40'
    }, {
      name: 'Logan',
      image: ' ../../assets/chat/user.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'offline',
      badge: '8',
      sendTime: '17:40'
    }, {
      name: 'Harrison',
      image: ' ../../assets/chat/user2.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!',
       status: 'offline',
      sendTime: '17:40'
    }, {
      name: 'Sebastian',
      image: ' ../../assets/chat/user1.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'online',
      sendTime: '17:40'
    }, {
      name: 'Zachary',
      image: ' ../../assets/chat/user4.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!', 
      status: 'offline',
      sendTime: '17:40'
    }, {
      name: 'Elijah',
      image: ' ../../assets/chat/user3.jpeg',
      // tslint:disable-next-line: max-line-length
      description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!',
      status: 'offline',
      badge: '8',
      sendTime: '17:40'
    }
    ];

  }


  viewChat(idProfile: string) {
    const data: NavigationExtras = {
      state: {
        idProfile
      }
    };

    this.router.navigate(['chat'], data);
  }

}
