import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:9990/api/products?size=100';


  constructor(private httpClient:HttpClient) { }

  getProductList(theCategoryId:Number):Observable<Product[]>{

    
  const searchurl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchurl).pipe(map(response=>response._embedded.products)
    );
  }
}

interface GetResponse{
  _embedded:{
    products:Product[];
  }
}
