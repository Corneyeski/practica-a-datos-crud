import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Alumnos } from './alumnos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Alumnos>;

@Injectable()
export class AlumnosService {

    private resourceUrl =  SERVER_API_URL + 'api/alumnos';

    constructor(private http: HttpClient) { }

    create(alumnos: Alumnos): Observable<EntityResponseType> {
        const copy = this.convert(alumnos);
        return this.http.post<Alumnos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(alumnos: Alumnos): Observable<EntityResponseType> {
        const copy = this.convert(alumnos);
        return this.http.put<Alumnos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Alumnos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Alumnos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Alumnos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Alumnos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Alumnos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Alumnos[]>): HttpResponse<Alumnos[]> {
        const jsonResponse: Alumnos[] = res.body;
        const body: Alumnos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Alumnos.
     */
    private convertItemFromServer(alumnos: Alumnos): Alumnos {
        const copy: Alumnos = Object.assign({}, alumnos);
        return copy;
    }

    /**
     * Convert a Alumnos to a JSON which can be sent to the server.
     */
    private convert(alumnos: Alumnos): Alumnos {
        const copy: Alumnos = Object.assign({}, alumnos);
        return copy;
    }
}
