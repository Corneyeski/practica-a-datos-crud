import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MatriculasComponent } from './matriculas.component';
import { MatriculasDetailComponent } from './matriculas-detail.component';
import { MatriculasPopupComponent } from './matriculas-dialog.component';
import { MatriculasDeletePopupComponent } from './matriculas-delete-dialog.component';

export const matriculasRoute: Routes = [
    {
        path: 'matriculas',
        component: MatriculasComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Matriculas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'matriculas/:id',
        component: MatriculasDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Matriculas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const matriculasPopupRoute: Routes = [
    {
        path: 'matriculas-new',
        component: MatriculasPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Matriculas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'matriculas/:id/edit',
        component: MatriculasPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Matriculas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'matriculas/:id/delete',
        component: MatriculasDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Matriculas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
