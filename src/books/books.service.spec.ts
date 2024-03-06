import { BookService } from './books.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let bookService:BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    bookService = module.get<BookService>(BookService);
  });

  describe('read', () => {
    it('should return an empty by default', () => {
      const book = bookService.getAllBooks(); //act
      expect(book).toEqual([]); //assert
    });

    it('should return a single book after create', () => {
      const createdTodo = bookService.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 }); //arrange
      const book = bookService.getSpecificBookByID(createdTodo.id); //act
      expect(book).toEqual({ id: expect.any(String), text: 'test' }); //assert
    });

    it('should return undefined if id is unknown', () => {
      const book = bookService.getSpecificBookByID('42'); //act
      expect(book).toBeUndefined(); //assert
    });
  });

  describe('create', () => {
    it('should return a single book after create', () => {
      bookService.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 }); //act
      expect(bookService.getAllBooks()).toEqual([
        { id: expect.any(String), text: 'test' },
      ]); //assert
    });
  });

  describe('update', () => {
    it('should return the updated book with getSpecificBookByID after update', () => {
      const book = bookService.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 }); //arrange
      bookService.updateBook(book.id, { title: 'test_t2', author: 'test_a2', publishing_year: 2002 }); //act
      expect(bookService.getSpecificBookByID(book.id)).toEqual({
        id: book.id,
        text: 'after update',
      }); //assert
    });

    it('should return the updated book after update', () => {
      const book = bookService.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 }); //arrange
      const updatedTodo = bookService.updateBook(book.id, { title: 'test_t2', author: 'test_a2', publishing_year: 2002 }); //act
      expect(updatedTodo).toEqual({
        id: book.id,
        text: 'after update',
      }); //assert
    });

    it('should return a NotFoundException after update', () => {
      expect(() => {
        bookService.updateBook('42', { title: 'test_t2', author: 'test_a2', publishing_year: 2002 });
      }).toThrow(NotFoundException);
    });
  });
});