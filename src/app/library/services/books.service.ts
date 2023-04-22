import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../store/library.types';
import { delay } from 'rxjs';

@Injectable()
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Array<Book>>('/assets/books.json').pipe(delay(2000))
  }
}
