import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { LibraryState } from '../../store/library.state';
import { Observable } from 'rxjs';
import { Book } from '../../store/library.types';

@Component({
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.scss']
})
export class BorrowedBooksComponent {

  @Select(LibraryState.borrowedBooks)
  borrowedBooks$!: Observable<Book[]>

}
