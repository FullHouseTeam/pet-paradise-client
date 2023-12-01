import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  globalVariable: string = '';

  getGlobalVariable(): string {
    return this.globalVariable;
  }

  setGlobalVariable(value: string): void {
    this.globalVariable = value;
  }
}
