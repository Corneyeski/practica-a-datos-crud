import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosDetailComponent } from './alumnos-detail.component';
import { AlumnosPopupComponent } from './alumnos-dialog.component';
import { AlumnosDeletePopupComponent } from './alumnos-delete-dialog.component';

export const alumnosRoute: Routes = [
    {
        path: 'alumnos',
        component: AlumnosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Alumnos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'alumnos/:id',
        component: AlumnosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Alumnos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alumnosPopupRoute: Routes = [
    {
        path: 'alumnos-new',
        component: AlumnosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Alumnos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alumnos/:id/edit',
        component: AlumnosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Alumnos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alumnos/:id/delete',
        component: AlumnosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Alumnos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
