import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable,
	MatTableDataSource
} from "@angular/material/table";
import { CallPipe } from "../../pipes/call.pipe";

import { TableColumn } from "./models/table-column";
import { TableCellComponent } from "./cell/table-cell.component";
import { MatIcon } from "@angular/material/icon";
import { Identifiable } from "../../models/identifiable";

@Component({
  selector: 'app-table',
  standalone: true,
	imports: [
		MatHeaderRow,
		MatRow,
		MatHeaderRowDef,
		MatRowDef,
		MatCellDef,
		MatCell,
		MatHeaderCell,
		MatColumnDef,
		MatTable,
		MatHeaderCellDef,
		CallPipe,
		TableCellComponent,
		MatIcon
	],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T extends Identifiable> {
	data = input.required<T[]>();
	columns = input.required<TableColumn<T>[]>();
	@Output() rowClick = new EventEmitter<T>()

	dataSource = computed(() => new MatTableDataSource(this.data()));

	displayedColumns = computed(() => this.columns().map(column => column.position));

	getCell(column: TableColumn<T>, item: T) {
		return column.cell(item);
	}
}

