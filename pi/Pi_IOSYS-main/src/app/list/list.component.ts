import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../service/component.service';
import { composant } from '../composant';
import { CartService } from '../service/cart.service';
import { DataService } from '../service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  component!: composant;
  rating!: string;
  componentName!: string;
  components: composant[] = [];
  visibleComponents: composant[] = [];
  filteredComponents: composant[] = [];

  selectedComponent: composant | null = null;
  currentPage = 1;
  itemsPerPage = 8;
  searchTerm = '';
  componentReviews$!: Observable<any>; // Tableau d'observables pour stocker les avis des composants
  components$!: Observable<any>; // Observable pour stocker les composants

  userReviews$!: Observable<any>;

  constructor(
    private componentService: ComponentService,
    private cartService: CartService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.componentService.getComponents().subscribe((data: composant[]) => {
      this.components = data;
      this.setPage(this.currentPage);
      this.getUserReviews(); // Appel pour récupérer les avis des utilisateurs
    });
  }

  setPage(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.components.length);
    this.visibleComponents = this.components.slice(startIndex, endIndex);
    this.currentPage = page;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.components.length / this.itemsPerPage);
  }

  addToCart(component: composant) {
    this.cartService.addToCart(component);
    alert('Composant ajouté au panier !');
  }

  selectComponent(component: composant) {
    this.selectedComponent = component;
  }

  searchComponents() {
    this.filteredComponents = this.components.filter(component =>
      component.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.visibleComponents = this.filteredComponents;
  }

  loadComponents() {
    this.componentService.getComponents().subscribe((data: composant[]) => {
      this.components = data;
      this.setPage(this.currentPage);
    });
  }

  addReview(rating: string, componentName: string) {
    this.dataService.sendUserReview(rating, componentName)
      .subscribe(
        (data: any) => {
          console.log('Review added successfully:', data);
          this.loadComponents();
        },
        (error: any) => {
          console.error('Error adding review:', error);
        }
      );

    if (this.selectedComponent) {
      this.selectedComponent.reviews.push({ rating: this.rating });
      this.updateComponent(this.selectedComponent);
    }
  }


  setRating(component: composant, rating: string) {
    if (!component.reviews) {
      component.reviews = [];
    }
    component.reviews.push({ rating: rating });
  }

  // Mettre à jour le composant avec le nouvel avis
  updateComponent(component: composant) {
    this.componentService.updateComponent(component).subscribe(() => {
      // Mettre à jour la liste des composants après la modification
      this.loadComponents();
    });
  }

  // Récupérer les avis des utilisateurs
  getUserReviews() {
    this.userReviews$ = this.dataService.getUserReviews();
  }
  // Composant Angular
  loadComponentReviews(componentName: string) {
    this.componentReviews$ = this.dataService.getUserReviewsForComponent(componentName);
  }

  // Dans la méthode loadComponents() ou tout autre endroit approprié où vous chargez les composants
  loadComponents1() {
    this.loadComponents();
    this.components$.subscribe(components => {
      for (let component of components) {
        this.loadComponentReviews(component.name);
      }
    });
  }

}
