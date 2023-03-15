import { Product } from "./product.model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  private readonly baseUrl = "produtos/";

  showMsg(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: Product): Observable<Product> {
    const url = `${this.baseUrl}` + "novoProduto";
    return this.http.post<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHundler(e))
    );
  }

  errorHundler(e: any): Observable<any> {
    this.showMsg("Ocorreu um erro!", true);
    return EMPTY;
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  readConsult(product: Product): Observable<Product[]> {
    let url = this.baseUrl + "buscarProduto";
    if (product) {
      url += `?nomeProduto=${product.item}`;
    }
    return this.http.get<Product[]>(url);
  }

  buscarProduto(read: Product): Observable<Product[]> {
    const url = `${this.baseUrl}buscarProduto`;
    let params = new HttpParams();
    if (read.id) {
      params = params.append("id", read.id);
    }
    if (read.item) {
      params = params.append("nomeProduto", read.item);
    }
    return this.http.get<Product[]>(url, { params: params }).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 404) {
          this.showMsg("Produto não encontrado! Refaça sua pesquisa.", true);
        } else {
          this.showMsg("Ocorreu um erro inesperado", true);
        }
        return of([]);
      })
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}` + "produto/" + `${id}`;
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}` + "editProduto/" + `${product.id}`;
    return this.http.put<Product>(url, product);
  }

  delete(product: Product): Observable<Product> {
    const url = `${this.baseUrl}` + "excluirProduto/" + `${product.id}`;
    return this.http.delete<Product>(url);
  }
}
