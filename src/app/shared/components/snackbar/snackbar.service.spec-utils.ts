import { TestBed } from "@angular/core/testing";
import { provideMockWithValues } from "@testing-library/angular/jest-utils";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarService } from "./snackbar.service";

export const snackbarServiceSpecUtils = () => {
	TestBed.configureTestingModule({
		providers: [provideMockWithValues(MatSnackBar, {
			openFromComponent: () => ({} as any),
		})]
	});

	const instance = TestBed.inject(MatSnackBar);
	const openFromComponent = jest.spyOn(instance, 'openFromComponent');

	return {
		service: TestBed.inject(SnackbarService),
		snackbar: {
			instance,
			openFromComponent,
			getConfig: () => openFromComponent.mock.lastCall?.[1]
		}
	}
}
