import { Component, OnInit } from '@angular/core';
import { BlockAccessService } from '../../util/blockAccess';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})

export class ViewPostComponent implements OnInit {

  constructor(private blockAccess: BlockAccessService) { }

  ngOnInit() {
  }

}
