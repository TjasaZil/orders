import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  template: `<div class="label-input-positioning">
    <label [for]="controlName">{{ label }}</label>
    <input
      [id]="controlName"
      [type]="type"
      placeholder=""
      [formControl]="control"
      [class.error]="control?.invalid && control?.touched"
    />
    <div *ngIf="control?.invalid && control?.touched" class="error-message">
      {{ errorMessage }}
    </div>
  </div> `,
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent {
  @Input() control: any;
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() type: string = 'text';
  @Input() errorMessage!: string;
}
