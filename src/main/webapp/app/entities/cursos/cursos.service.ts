import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Cursos } from './cursos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Cursos>;

@Injectable()
export class CursosService {

    private resourceUrl =  SERVER_API_URL + 'api/cursos';

    constructor(private http: HttpClient) { }

    create(cursos: Cursos): Observable<EntityResponseType> {
        const copy = this.convert(cursos);
        return this.http.post<Cursos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cursos: Cursos): Observable<EntityResponseType> {
        const copy = this.convert(cursos);
        return this.http.put<Cursos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Cursos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Cursos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Cursos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Cursos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Cursos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Cursos[]>): HttpResponse<Cursos[]> {
        const jsonResponse: Cursos[] = res.body;
        const body: Cursos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Cursos.
     */
    private convertItemFromServer(cursos: Cursos): Cursos {
        const copy: Cursos = Object.assign({}, cursos);
        return copy;
    }

    /**
     * Convert a Cursos to a JSON which can be sent to the server.
     */
    private convert(cursos: Cursos): Cursos {
        const copy: Cursos = Object.assign({}, cursos);
        return copy;
    }
}
