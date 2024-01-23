import { Component, Input, OnInit } from '@angular/core';
import { ToasterData } from 'src/app/models/toaster/toaster';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  @Input() toasterData!: ToasterData;

  constructor() {}

  ngOnInit(): void {}

  getIconPath(): string {
    switch (this.toasterData.type) {
      case 'added':
        return '../../../assets/icons/green-check.svg';
      case 'edited':
        return '../../../assets/icons/yellow-check.svg';
      case 'deleted':
        return '../../../assets/icons/red-check.svg';
      default:
        return '';
    }
  }
}
