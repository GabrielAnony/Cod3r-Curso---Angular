import { Product } from "./../product.model";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-product-delete-modal",
  templateUrl: "./product-delete-modal.component.html",
  styleUrls: ["./product-delete-modal.component.css"],
})
export class ProductDeleteModalComponent {
  item!: Product;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data;
  }
}
