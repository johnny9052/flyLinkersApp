import { Component, OnInit } from '@angular/core';
import { BlockAccessService } from '../../util/blockAccess';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.page.html',
  styleUrls: ['./detail-post.page.scss'],
})
export class DetailPostPage implements OnInit {

  constructor(private blockAccess: BlockAccessService) { }

  ngOnInit() {
  }

}
