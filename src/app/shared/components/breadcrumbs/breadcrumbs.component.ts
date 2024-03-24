import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { filter, map, tap } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

type Breadcrumb = { label: string; url: string };

@Component({
	selector: 'app-breadcrumbs',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet, RouterLink, RouterLinkActive, MatButton, MatIcon
	],
	templateUrl: './breadcrumbs.component.html',
	styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent implements OnInit {
	router = inject(Router);
	route = inject(ActivatedRoute);
	destroyRef = inject(DestroyRef);
	breadcrumbs = signal<Breadcrumb[]>([]);

	ngOnInit() {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			map(() => this.route.root),
			tap(route => this.updateBreadcrumbs(route)),
			takeUntilDestroyed(this.destroyRef),
		).subscribe()
	}

	private updateBreadcrumbs(route: ActivatedRoute) {
		const all: Breadcrumb[] = [];
		let currentRoute: ActivatedRoute | null = route;

		while (currentRoute.firstChild) {
			currentRoute = currentRoute.firstChild;

			const label = currentRoute.snapshot.data?.['breadcrumb'];
			const url = currentRoute.snapshot.url.map(segment => segment.path).join('/')

			if(label && url) all.push({label, url});
		}

		this.breadcrumbs.set(all);
	}
}
