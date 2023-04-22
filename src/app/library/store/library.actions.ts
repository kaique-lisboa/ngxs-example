import { ActionType } from "@ngxs/store";
import { Book } from "./library.types";

export class LoadBooks  {
  static readonly type = '[Library] Load books';
}

export class SetLoadingBooks  {
  static readonly type = '[Library] Set loading books';

  constructor(public loading: boolean) { }
}

export class SuccessLoadBooks  {
  static readonly type = '[Library] Success Loading books';

  constructor(public books: Book[]) { }
}

export class ErrorLoadBooks  {
  static readonly type = '[Library] Error Loading books';

  constructor(public error: Error) { }
}

export class BorrowBook {
  static readonly type = '[Library] Borrow a book';

  constructor(public bookId: Book['link']) { }
}