import { BookService } from './books.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    bookService = module.get<BookService>(BookService);
  });

  describe('read', () => {
    it('should return the initial data by default', () => {
      const books = bookService.getAllBooks();//act
      expect(books).toEqual([
        {
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
        }]);//assert
    });

    it('should return undefined if id is unknown', () => {
      expect(() => {bookService.getSpecificBookByID('12');}).toThrow(NotFoundException); //assert
    });
  });




  describe('create', () => {
    it('should return a single book after create', () => {
      const book = bookService.postBook({ title: 'test_t', author: 'author_a', publishing_year: 2000, }); //act
      expect(bookService.getSpecificBookByID(book.id)).toEqual({
        id: expect.any(String),
        title: 'test_t',
        author: 'author_a',
        publishing_year: 2000,
      }); //assert
    });
  });

  it('should return the single book created', () => {
    const createdBook = bookService.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 });//arrange
    const book = bookService.getSpecificBookByID(createdBook.id);//act
    expect(book).toEqual({ id: expect.any(String), title: 'test_t', author: 'test_a', publishing_year: 2000 });//assert
  });




  describe('update', () => {
    it('should return the updated book with getSpecificBookByID after update', () => {
      const book = bookService.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 }); //arrange
      bookService.updateBook(book.id, { title: 'test_t2', author: 'test_a2', publishing_year: 2002 }); //act
      expect(bookService.getSpecificBookByID(book.id)).toEqual(
        {id: book.id, title: 'test_t2', author: 'test_a2', publishing_year: 2002}); //assert
    });

    it('should return the updated book after update', () => {
      const book = bookService.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 }); //arrange
      const updatedBook = bookService.updateBook(book.id, { title: 'test_t2', author: 'test_a2', publishing_year: 2002 }); //act
      expect(updatedBook).toEqual({id: book.id, title: 'test_t2', author: 'test_a2', publishing_year: 2002 }); //assert
    });

    it('should return a NotFoundException after update', () => {
      expect(() => {
        bookService.updateBook('12', { title: 'test_t2', author: 'test_a2', publishing_year: 2002 });
      }).toThrow(NotFoundException);
    });
  });




  describe('delete', () => {
    it('should delete an existing book', () => {
      bookService.postBook({
        title: 'a',
        author: 'a',
        publishing_year: 2001,
      });
      const bookToDelete = bookService.postBook({
        title: 'b',
        author: 'b',
        publishing_year: 2002,
      });
      bookService.postBook({
        title: 'c',
        author: 'c',
        publishing_year: 2003,
      }); //arrange

      bookService.deleteBook(bookToDelete.id); //act

      expect(bookService.getAllBooks()).not.toContain({
        id: expect.any(String),
        title: 'b',
        author: 'b',
        publishing_year: 2002,
      }); //assert
    });

    it('should return a NotFoundException after delete', () => {
      expect(() => {
        bookService.deleteBook('12');
      }).toThrow(NotFoundException); //assert
    });
  });
});