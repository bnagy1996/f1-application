import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/services/user/user-detail.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(public userService: UserDetailService) { }

  ngOnInit(): void {
  }

}
