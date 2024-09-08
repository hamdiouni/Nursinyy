import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  Products:any;
constructor(private service:ProductsService) {}
ngOnInit(){
this.service.fetchProducts().subscribe(
  (data)=>{
    this.Products=data;
console.log(data);
  },
  (err)=>{
   
    console.log(err)
  }
);
}

}
