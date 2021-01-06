import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
 


  private baseUrl='http://localhost:9990/api/products';

  private categoryUrl= 'http://localhost:9990/api/product-category';


  constructor(private httpClient:HttpClient) { }


  getProduct(theProductId: number):Observable<Product>{
    
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  private getProducts(searchurl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchurl).pipe(map(response => response._embedded.products));
  }
  
  //get product list service for all

  getProductList(theCategoryId:Number):Observable<Product[]>{
  
  const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    
  return this.getProducts(searchUrl);
  }

  //get product list service for all by keyword 

  searchProducts(theKeyWord: string):Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByNameContaing?name=${theKeyWord}`;

    return this.getProducts(searchUrl);
    
  }

  getProductListByNAME(theCategoryName:String):Observable<Product[]>{

    
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryName}`;
  
      return this.getProducts(searchUrl);
    }

 

    //get product list service for all get by category

  getProductCategories():Observable<ProductCategory[]>{


    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(map(response=>response._embedded.productCategory)
    );


    
  }
}

interface GetResponseProducts{
  _embedded:{
    products:Product[];
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
