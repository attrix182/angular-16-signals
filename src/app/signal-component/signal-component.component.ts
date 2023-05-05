import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface ItemModel {
  name: string;
  check: boolean;
}
@Component({
  selector: 'app-signal-component',
  templateUrl: './signal-component.component.html',
  styleUrls: ['./signal-component.component.css'],
})
export class SignalComponentComponent {
  items = signal<ItemModel[]>([]);
  form: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      check: new FormControl(''),
    });
  }

  addItem() {
    this.items.update((value) => value + this.form.value);
  }
}
