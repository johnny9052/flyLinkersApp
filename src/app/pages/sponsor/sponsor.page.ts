import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from '../../util/blockAccess';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.page.html',
  styleUrls: ['./sponsor.page.scss'],
})
export class SponsorPage implements OnInit {

  constructor(private blockAccess: BlockAccessService,
              private translate: TranslateService) { }

  ngOnInit() {
  }

}
