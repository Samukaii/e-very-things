import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from "rxjs";

export type Generic = Record<string, any>;

const toCamelCase = (str: string): string => {
	return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const convertToCamelCase = (body: any): any => {
	if (Array.isArray(body)) {
		return body.map(convertToCamelCase);
	} else if (body && typeof body === 'object') {
		const camelCaseObj: Generic = {};
		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const camelKey = toCamelCase(key);
				camelCaseObj[camelKey] = convertToCamelCase(body[key]);
			}
		}
		return camelCaseObj;
	}
	return body;
};

export const camelCaseResponseInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(map((event: HttpEvent<any>) => {
		if (event instanceof HttpResponse) {
			event = event.clone({body: convertToCamelCase(event.body)});
		}
		return event;
	}));
};
