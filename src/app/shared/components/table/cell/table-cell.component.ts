import { Component, input } from '@angular/core';
import { TableCell } from "../models/table-cell";
import { ButtonComponent } from "../../button/button.component";

@Component({
  selector: 'app-table-cell',
  standalone: true,
	imports: [
		ButtonComponent
	],
  templateUrl: './table-cell.component.html',
  styleUrl: './table-cell.component.scss'
})
export class TableCellComponent {
	cell = input.required<TableCell>();
	identifier = input.required<string>();
}
