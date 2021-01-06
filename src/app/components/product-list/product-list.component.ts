import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component-grid.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  //currentCategoryName:string;
  searchMode: boolean;

  constructor(private ProductService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }





  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handelSearchProducts();
    }
    else {

      this.handelListProducts();
    }

  }


  handelSearchProducts() {

    const theKeyWord:string=this.route.snapshot.paramMap.get('keyword');

    this.ProductService.searchProducts(theKeyWord).subscribe(
      data=>{
        this.products=data;
      }
    )
   
  }


  handelListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      // this.currentCategoryName=this.route.snapshot.paramMap.get('name');
    }
    else {
      this.currentCategoryId = 1;
      //this.currentCategoryName='Books';
    }
    this.ProductService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )

  }

}
