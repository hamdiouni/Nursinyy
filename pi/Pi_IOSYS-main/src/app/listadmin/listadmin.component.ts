import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../service/component.service';
import { composant } from '../composant';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listadmin',
  templateUrl: './listadmin.component.html',
  styleUrls: ['./listadmin.component.css']
})
export class ListadminComponent implements OnInit {
  components!: composant[];

  constructor(private componentService: ComponentService) { }

  ngOnInit(): void {
    this.getComponents();
  }

  getComponents(): void {
    this.componentService.getComponents().subscribe(components => this.components = components);
  }

  updateComponent(component: composant): void {
    this.componentService.updateComponent(component).subscribe(updatedComponent => {
      console.log('Component updated successfully:', updatedComponent);
      // Actualiser la liste des composants après la mise à jour
      const index = this.components.findIndex(c => c.id === updatedComponent.id);
      if (index !== -1) {
        this.components[index] = updatedComponent;
      }
    }, error => {
      console.error('Error updating component:', error);
    });
  }

  deleteComponent(name: string): void {
    // Demander confirmation avant de supprimer
    if (confirm('Are you sure you want to delete this component?')) {
      this.componentService.deleteComponent(name).subscribe(() => {
        // Actualiser la liste des composants après la suppression
        this.components = this.components.filter(c => c.name !== name);
        console.log('Component deleted successfully.');
      }, error => {
        console.error('Error deleting component:', error);
      });
    }
  }
}
