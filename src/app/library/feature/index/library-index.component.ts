import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadBooks } from '../../store/library.actions';
import { LibraryState } from '../../store/library.state';
import { Observable } from 'rxjs';
import { Book, LibraryModel } from '../../store/library.types';

@Component({
  templateUrl: './library-index.component.html',
  styleUrls: ['./library-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryIndexComponent {

  @Select(LibraryState.books)
  books$!: Observable<Array<Book>>
  
  @Select((state: { library: LibraryModel }) => state.library.loadingBooks)
  loadingBooks$!: Observable<boolean>

  @Select((state: { library: LibraryModel }) => state.library.errorLoadingBooks)
  errorLoadingBooks$!: Observable<boolean>

  store = inject(Store)

  loadBooks() {
    this.store.dispatch(new LoadBooks());
  }

}
