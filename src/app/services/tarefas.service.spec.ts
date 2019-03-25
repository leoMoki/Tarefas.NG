/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TarefasService } from './tarefas.service';

describe('Service: Tarefas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarefasService]
    });
  });

  it('should ...', inject([TarefasService], (service: TarefasService) => {
    expect(service).toBeTruthy();
  }));
});
