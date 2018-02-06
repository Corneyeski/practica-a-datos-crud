import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Matriculas } from './matriculas.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Matriculas>;

@Injectable()
export class MatriculasService {

    private resourceUrl =  SERVER_API_URL + 'api/matriculas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(matriculas: Matriculas): Observable<EntityResponseType> {
        const copy = this.convert(matriculas);
        return this.http.post<Matriculas>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(matriculas: Matriculas): Observable<EntityResponseType> {
        const copy = this.convert(matriculas);
        return this.http.put<Matriculas>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Matriculas>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Matriculas[]>> {
        const options = createRequestOption(req);
        return this.http.get<Matriculas[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Matriculas[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Matriculas = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Matriculas[]>): HttpResponse<Matriculas[]> {
        const jsonResponse: Matriculas[] = res.body;
        const body: Matriculas[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Matriculas.
     */
    private convertItemFromServer(matriculas: Matriculas): Matriculas {
        const copy: Matriculas = Object.assign({}, matriculas);
        copy.inicio = this.dateUtils
            .convertDateTimeFromServer(matriculas.inicio);
        return copy;
    }

    /**
     * Convert a Matriculas to a JSON which can be sent to the server.
     */
    private convert(matriculas: Matriculas): Matriculas {
        const copy: Matriculas = Object.assign({}, matriculas);

        copy.inicio = this.dateUtils.toDate(matriculas.inicio);
        return copy;
    }
}
