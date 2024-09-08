import { Component } from '@angular/core';
import { ComponentService } from '../service/component.service';
import { composant } from '../composant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent {
  newComponent: composant = {
    id1: '',
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    quantity: 0,
    reviews: [] as { rating: string }[]

  };

  constructor(private componentService: ComponentService, private router: Router) { }

  onSubmit() {
    // Ajoutez le nouveau composant en appelant le service
    this.componentService.addComponent(this.newComponent).subscribe(
      (response) => {
        console.log('Component added successfully:', response);
        this.router.navigate(['/listadmin']); // Utilisez la méthode navigate du service Router

        // Réinitialisez le formulaire après l'ajout du composant
        this.newComponent = {

          id1: '',
          id: 0,
          name: '',
          description: '',
          price: 0,
          image: '',
          quantity: 0,
          reviews: [] as { rating: string }[]

        };
      },
      (error) => {
        console.error('Error adding component:', error);
      }
    );
  }
}
