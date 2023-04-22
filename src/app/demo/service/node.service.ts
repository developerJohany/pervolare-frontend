import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class NodeService {

    constructor(private http: HttpClient) { }


    createCategory(data: any): Observable<any>{
      return this.http.post(environment.endpoint+'/categories', data);
    }

    listCategory() {
      return this.http.get<any>(environment.endpoint+'/categories')
          .toPromise()
          .then(res => res );
    }

    show(id: any): Observable<any>{
      return this.http.get(environment.endpoint+'/categories/' + id);
    }

    update(id: any, data = {}): Observable<any>{
      return this.http.put(environment.endpoint+'/categories/' + id, data);
    }

    delete(id: any): Observable<any>{
      return this.http.delete(environment.endpoint+'/categories/' + id);
    }


}
