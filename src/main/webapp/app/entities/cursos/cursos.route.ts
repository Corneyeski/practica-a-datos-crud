import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CursosComponent } from './cursos.component';
import { CursosDetailComponent } from './cursos-detail.component';
import { CursosPopupComponent } from './cursos-dialog.component';
import { CursosDeletePopupComponent } from './cursos-delete-dialog.component';

export const cursosRoute: Routes = [
    {
        path: 'cursos',
        component: CursosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cursos/:id',
        component: CursosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cursosPopupRoute: Routes = [
    {
        path: 'cursos-new',
        component: CursosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cursos/:id/edit',
        component: CursosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cursos/:id/delete',
        component: CursosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
