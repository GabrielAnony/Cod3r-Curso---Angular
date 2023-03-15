import { Product } from "./../product.model";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ProductDeleteModalComponent } from "../product-delete-modal/product-delete-modal.component";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  form: FormGroup;

  products: Product[] = [];
  displayedColumns: string[] = ["id", "item", "valor", "action"];

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [""],
      item: [""],
    });
  }

  ngOnInit(): void {}

  navigateToProductCreate(): void {
    this.router.navigate(["products/create"]);
  }

  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDeleteModalComponent, {
      width: "550px",
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(product).subscribe(() => {
          this.productService.showMsg("Produto Excluido com Sucesso!");
          this.readConsult();
        });
      }
    });
  }

  readConsult() {
    this.productService.buscarProduto(this.form.value).subscribe((products) => {
      this.products = products;
    });
  }

  limparCampos() {
    this.form.reset();
  }
}
