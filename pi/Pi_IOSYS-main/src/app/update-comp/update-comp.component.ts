import { Component, OnInit, Input } from '@angular/core';
import { ComponentService } from '../service/component.service';
import { composant } from '../composant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-comp',
  templateUrl: './update-comp.component.html',
  styleUrls: ['./update-comp.component.css']
})
export class UpdateCompComponent implements OnInit {
  @Input() component!: composant;

  componentForm!: FormGroup;
  updatedComponent: composant = {
    id: 0,
    id1: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    quantity: 0,
    reviews: []
  };

  oldComponent: composant = {
    id: 0,
    id1: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    quantity: 0,
    reviews: []
  };

  constructor(private componentService: ComponentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.componentForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    this.updatedComponent = { ...this.component };
    this.oldComponent = { ...this.component };
  }

  get name() {
    return this.componentForm.get('name');
  }

  get description() {
    return this.componentForm.get('description');
  }

  get price() {
    return this.componentForm.get('price');
  }

  get image() {
    return this.componentForm.get('image');
  }

  get quantity() {
    return this.componentForm.get('quantity');
  }

  updateComponent() {
    if (this.componentForm.valid) {
      this.updatedComponent.name = this.name?.value;
      this.updatedComponent.description = this.description?.value;
      this.updatedComponent.price = this.price?.value;
      this.updatedComponent.image = this.image?.value;
      this.updatedComponent.quantity = this.quantity?.value;

      this.componentService.updateComponent(this.updatedComponent).subscribe(updatedComponent => {
        console.log("Component updated successfully:", updatedComponent);
      });
    }
  }
}
