
export interface Book {
  author:    string;
  country:   string;
  imageLink: string;
  language:  string;
  link:      string;
  pages:     number;
  title:     string;
  year:      number;
}

export interface LibraryModel {
  books: Book[];
  borrowedBooks: Array<Book['link']>;
  loadingBooks: boolean;
  errorLoadingBooks?: Error;
}
