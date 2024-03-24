import { Button } from "../button/models/button";
import { snackbarServiceSpecUtils } from "./snackbar.service.spec-utils";

describe('SnackbarService', () => {
	describe('#open', () => {
		it('snackbarConfig.data should contain the message provided', async () => {
			const {service, snackbar} = snackbarServiceSpecUtils();

			service.open("some-message");
			const data = snackbar.getConfig()?.data as any;

			expect(data?.message).toBe("some-message")
		});

		it('snackbarConfig.duration should be duration provided', async () => {
			const {service, snackbar} = snackbarServiceSpecUtils();

			service.open("", {
				duration: 5000,
			});

			const config = snackbar.getConfig();

			expect(config?.duration).toBe(5000)
		});

		it('snackbarConfig.panelClass should be "snackbar-success"', async () => {
			const {service, snackbar} = snackbarServiceSpecUtils();

			service.open("", {
				type: 'success',
			});

			const config = snackbar.getConfig();

			expect(config?.panelClass).toBe("snackbar-success");
		});

		it('snackbarConfig.panelClass should be "snackbar-error"', async () => {
			const {service, snackbar} = snackbarServiceSpecUtils();

			service.open("", {
				type: 'error',
			});

			const config = snackbar.getConfig();

			expect(config?.panelClass).toBe("snackbar-error");
		});


		it('snackbarConfig.data should contain action provided', async () => {
			const {service, snackbar} = snackbarServiceSpecUtils();

			const action = {
				text: "some-text",
				theme: "raised"
			} as Button;

			service.open("", {
				action
			});

			const data = snackbar.getConfig()?.data as any;

			expect(data?.action).toBe(action);
		});
	});

});
