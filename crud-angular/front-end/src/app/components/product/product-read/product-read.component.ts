import { Product } from "./../product.model";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ProductDeleteModalComponent } from "../product-delete-modal/product-delete-modal.component";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ["id", "item", "valor", "action"];

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products;
    });
  }

  navigateToProductCreate(): void {
    this.router.navigate(["products/create"]);
  }

  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDeleteModalComponent, {
      width: "550px",
      //data: { message: "Tem certeza que deseja excluir o item? " },
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(product).subscribe(() => {
          this.productService.showMsg("Produto Excluido com Sucesso!");
          this.ngOnInit();
        });
      }
    });
  }
}
