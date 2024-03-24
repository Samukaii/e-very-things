import { TableCell } from "./table-cell";

export interface TableColumn<T> {
	position: string;
	name: string;
	cell: (item: T) => TableCell;
}
