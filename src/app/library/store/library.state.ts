import { Injectable, inject } from "@angular/core";
import { Action, Select, Selector, State, StateContext } from "@ngxs/store";
import { Book, LibraryModel } from "./library.types";
import { BorrowBook, ErrorLoadBooks, LoadBooks, SetLoadingBooks, SuccessLoadBooks } from "./library.actions";

import { produce } from 'immer';
import { BooksService } from "../services/books.service";
import { EMPTY, NEVER, catchError, mergeMap, tap } from "rxjs";

const initialState = {
  books: [],
  borrowedBooks: [],
  loadingBooks: false
} satisfies LibraryModel;

@State<LibraryModel>({
  name: 'library',
  defaults: initialState
})
@Injectable()
export class LibraryState {

  booksService = inject(BooksService);

  @Selector()
  static books(state: LibraryModel) {
    return state.books;
  }

  @Selector()
  static borrowedBooks(state: LibraryModel) {
    return state.books.filter(book => state.borrowedBooks.some(borrowedBook => book.link === borrowedBook));
  }


  @Action(LoadBooks)
  loadBooks(ctx: StateContext<LibraryModel>) {  

    ctx.dispatch(new SetLoadingBooks(true))
    
    return this.booksService.getBooks().pipe(
      mergeMap(books =>
        ctx.dispatch(new SuccessLoadBooks(books))
      ),
      catchError(error => ctx.dispatch(new ErrorLoadBooks(error))),
      tap(() => ctx.dispatch(new SetLoadingBooks(false)))
    )
  }

  @Action(SetLoadingBooks)
  setLoadingBooks(ctx: StateContext<LibraryModel>, action: SetLoadingBooks) {
    return ctx.patchState({
      loadingBooks: action.loading
    })
  }

  @Action(SuccessLoadBooks)
  successLoadBooks(ctx: StateContext<LibraryModel>, action: SuccessLoadBooks) {
    return ctx.setState(produce((draft) => {
      draft.books = action.books;
      delete draft.errorLoadingBooks
    }))
  }

  @Action(ErrorLoadBooks)
  errorLoadBooks(ctx: StateContext<LibraryModel>, action: ErrorLoadBooks) {
    console.error("Error while fetching books", action);
    return ctx.patchState({
      errorLoadingBooks: action.error
    })
  }

  @Action(BorrowBook)
  borrowBook(ctx: StateContext<LibraryModel>, action: BorrowBook) {
    return ctx.setState(state => ({
      ...state,
      borrowedBoks: [...state.borrowedBooks, action.bookId]
    }))
  }

}