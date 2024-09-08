import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduits',
  templateUrl: './addproduits.component.html',
  styleUrls: ['./addproduits.component.css']
})
export class AddproduitsComponent {
  fg = new FormGroup({
    Libelle: new FormControl(''),
    Desc: new FormControl('')
  })
  constructor(private s: ProductsService, private router: Router) { }
  AddProduct() {
    
    this.s.addProduct(this.fg.value).subscribe(
      ()=>{
      this.router.navigate(['list'])
    },
    )
  }
}
