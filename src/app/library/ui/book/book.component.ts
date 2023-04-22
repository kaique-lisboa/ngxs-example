import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Book, LibraryModel } from '../../store/library.types';
import { Select, Store } from '@ngxs/store';
import { BorrowBook, LoadBooks } from '../../store/library.actions';
import { LibraryState } from '../../store/library.state';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  store = inject(Store)

  @Input({ required: true })
  book!: Book

  isBookBorrowed$ = this.store
    .select((state: { library: LibraryModel }) => state.library.borrowedBooks)
    .pipe(
      map(books => books.includes(this.book.link))
    )


  borrow() {
    this.store.dispatch(new BorrowBook(this.book.link))
  }

}
