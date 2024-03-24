import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Generic } from "../../shared/models/generic";

const toSnakeCase = (str: string): string => {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

const snakeCaseKeys = (obj: any) => {
	const snakeCaseObj: Generic = {};
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const snakeKey = toSnakeCase(key);
			snakeCaseObj[snakeKey] = obj[key];
		}
	}
	return snakeCaseObj;
}

const convertToSnakeCase = (request: HttpRequest<any>): HttpRequest<any> => {
	if (request.body && typeof request.body === 'object') {
		const snakeCaseBody = snakeCaseKeys(request.body);
		return request.clone({body: snakeCaseBody});
	}
	return request;
}

export const snakeCaseInterceptor: HttpInterceptorFn = (req, next) => {
	const snaked = convertToSnakeCase(req);

	return next(snaked);
};
