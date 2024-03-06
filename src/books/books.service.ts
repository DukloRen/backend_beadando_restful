import { Injectable, NotFoundException } from '@nestjs/common';
import { Books } from "./books.model";
import { BookDTO } from "./books.dto";

@Injectable()
export class BookService {
  private readonly books: Books[] = [{
    id: '1',
    title: 'Mesterségem a halál',
    author: 'Robert Merle',
    publishing_year: 1952
  },{
    id: '2',
    title: 'Nyugaton a helyzet változatlan',
    author: 'Erich Maria Remarque',
    publishing_year: 1929
  },
    {
      id: '3',
      title: 'A Pokol Hajnala',
      author: 'T. A. Tyler',
      publishing_year: 2003
    },
    {
      id: '4',
      title: 'Két nap az élet',
      author: 'Robert Merle',
      publishing_year: 1949
    },
    {
      id: '5',
      title: 'Pokoljárás',
      author: 'Sven Hassel',
      publishing_year: 2006
    }]

  public getAllBooks() : Books[] {
    return this.books;
  }

  public getSpecificBookByID(id: string) {
    const book = this.books.find((book ) => book.id === id);
    if (!book) {
      throw new NotFoundException();//404
    } else {
      return book;
    }

  }

  public postBook(bookDTO: BookDTO) {
    const newBook: Books = {
      id: Math.random().toString(),
      ...bookDTO,
    };
    this.books.push(newBook);
    return newBook;
  }

  public deleteBook(id: string){
    const index = this.books.findIndex((book)=>book.id === id)
    if (index === -1){
      throw new NotFoundException();//404
    }
    this.books.splice(index,1);
  }

  public updateBook(id: string, input: BookDTO){
    const book = this.getSpecificBookByID(id);
    if (!book) {
      throw new NotFoundException();
    }
    Object.assign(book, input);
    return book;
  }
}