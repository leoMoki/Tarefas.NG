import { Tarefa } from './../models/tarefa.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TarefasService {

constructor(private http: HttpClient) { }


GetAll(): Promise<Tarefa[]> {
  let headers = new HttpHeaders({'Content-Type': 'application/json' });
  let result: Promise<Tarefa[]> = this.http.get<Tarefa[]>("http://localhost:55898/Tarefas/GetAll", { headers: headers })
  .toPromise();
  return result;
}

GetOne(idTarefa: string): Promise<Tarefa> {
  let headers = new HttpHeaders({'Content-Type': 'application/json' });
  let result: Promise<Tarefa> = this.http.get<Tarefa>("http://localhost:55898/Tarefas/GetOne?idTarefa=" + idTarefa, { headers: headers }).toPromise();
  return result;
}

Insert(tarefa: Tarefa): Promise<Tarefa> {
  let headers = new HttpHeaders({'Content-Type': 'application/json' });
  let result: Promise<Tarefa> = this.http.post<Tarefa>("http://localhost:55898/Tarefas/Insert", JSON.stringify(tarefa), { headers: headers }).toPromise();
  return result;
}

Update(tarefa: Tarefa): Promise<Tarefa> {
  let headers = new HttpHeaders({'Content-Type': 'application/json' });
  let result: Promise<Tarefa> = this.http.put<Tarefa>("http://localhost:55898/Tarefas/Update", JSON.stringify(tarefa), { headers: headers }).toPromise();
  return result;
}

Delete(idTarefa: string): Promise<Tarefa> {
  let headers = new HttpHeaders({'Content-Type': 'application/json' });
  let result: Promise<Tarefa> = this.http.get<Tarefa>("http://localhost:55898/Tarefas/Delete/?idTarefa=" + idTarefa, { headers: headers }).toPromise();
  return result;
}


}
