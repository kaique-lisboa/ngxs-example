import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { LibraryIndexComponent } from './feature/index/library-index.component';
import { BookComponent } from './ui/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { LibraryState } from './store/library.state';
import { BooksService } from './services/books.service';
import { BorrowedBooksComponent } from './feature/borrowed-books/borrowed-books.component';

const routes= [
  {
    path: '',
    component: LibraryIndexComponent
  },
  {
    path: 'borrowed',
    component: BorrowedBooksComponent
  }
] satisfies Route[]

@NgModule({
  providers: [
    BooksService
  ],
  declarations: [
    LibraryIndexComponent,
    HeaderComponent,
    BookComponent,
    BorrowedBooksComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([ LibraryState ])
  ]
})
export class LibraryModule { }
