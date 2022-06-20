import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { NavigateRequestAction, NavigateSuccessAction } from '../actions/route.actions';
import { RoutePath } from '../app-utils';
import { RouteModel } from '../models/helper/route.model';

@Injectable()
export class RouteEffects {
   readonly noticeNavigation$ = createEffect(() => this.router.events.pipe(
    filter((event): event is RoutesRecognized => event instanceof RoutesRecognized),
    map(({urlAfterRedirects}) => this.parseUrl(urlAfterRedirects)),
    filter((route): route is RouteModel => route != null),
    map(route => new NavigateRequestAction(route))
  ));

   readonly storeRoute$ = createEffect(() => this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(({urlAfterRedirects}) => this.parseUrl(urlAfterRedirects)),
    filter((route): route is RouteModel => route != null),
    map(route => new NavigateSuccessAction(route))
  ));

  constructor(private readonly router: Router) { }

  private parseUrl(url: string): RouteModel | null {
    const {children} = this.router.parseUrl(url).root;
    if (!('primary' in children)) {
      return null;
    }

    const [view, id] = children['primary'].segments
      .map(({path}) => path) as [RoutePath, string?];
    return {view, id};
  }
}
