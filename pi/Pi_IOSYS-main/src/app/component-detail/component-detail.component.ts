import { Component, Input, OnInit } from '@angular/core';
import { composant } from '../composant';
import { CartService } from '../service/cart.service';
import { ComponentService } from '../service/component.service';
import { DataService } from '../service/data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent implements OnInit {
  @Input()
  component!: composant;
  userReviews$: Observable<any> | undefined; // Observable pour stocker les avis des utilisateurs

  constructor(private cartService: CartService, private componentService: ComponentService,
    private dataService: DataService
  ) { }
  ngOnInit(): void {
    this.componentService.getComponentById("name").subscribe((data: any) => {
      this.component = data;
      this.getUserReviews(); // Appelez la méthode pour récupérer les avis des utilisateurs
    });
  }

  addToCart() {
    this.cartService.addToCart(this.component);
    alert('Panier mis à jour !');

  }
  // Récupérer les avis des utilisateurs
  getUserReviews() {
    this.userReviews$ = this.dataService.getUserReviews();
  }
}
