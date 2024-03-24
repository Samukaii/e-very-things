import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { snakeCaseInterceptor } from "./core/interceptors/snake-case.interceptor";
import { camelCaseResponseInterceptor } from "./core/interceptors/camel-case-response.interceptor";
import { provideEnvironmentNgxMask } from "ngx-mask";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
		provideClientHydration(),
		provideAnimationsAsync(),
		provideEnvironmentNgxMask(),
		provideHttpClient(
			withInterceptors([snakeCaseInterceptor, camelCaseResponseInterceptor]),
			withFetch()
		),
	],
};
