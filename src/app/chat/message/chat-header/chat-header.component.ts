import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html'
})
export class ChatHeaderComponent implements OnInit {
  public extraData: any;
  constructor(private route: ActivatedRoute){

  }
  ngOnInit(): void {
  // const navigation = this.route.snapshot.routerState.root;
  
  }


}
