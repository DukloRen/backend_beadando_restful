import { BookController } from './books.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './books.service';
import { BookDTO } from './books.dto';


describe('BookController', ()=>{
  let controller: BookController;
  let mockBookService: BookService;

  beforeEach(async () => {
    mockBookService = {} as BookService;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should return the list of books returned by BookService.getAllBooks()', () => {
    mockBookService.getAllBooks = () => {
      return [{ id: '12', title: 'test', author: 'test', publishing_year: 2000 }];
    }; //arrange
    const books = controller.getAllBooks();//act
    expect(books).toEqual([
      { id: '12', title: 'test', author: 'test', publishing_year: 2000 },]);//assert
  });

  it('should return a single book with the given id returned by BookService.getSpecificBookByID()', () => {
    mockBookService.getSpecificBookByID = (id: string) => {
      if (id === '12') {
        return { id: '12', title: 'test', author: 'test', publishing_year: 2000 };
      }
    };//arrange
    const book = controller.getSpecificBookByID('12');//act
    expect(book).toEqual({id: '12', title: 'test', author: 'test', publishing_year: 2000});
  });

  it('should return the single newly created book returned by BookService.postBook()', () => {
    mockBookService.postBook = (input: BookDTO) => ({ id: '12', ...input }); //arrange
    const book = controller.postBook({ title: 'test', author: 'test', publishing_year: 2000});//act
    expect(book).toEqual({id: '12', title: 'test', author: 'test', publishing_year: 2000});//assert
  });

  it('should return the single updated book returned by BookService.updateBook()', () => {
    mockBookService.updateBook = (id: string, input: BookDTO) => {
      return { id, ...input };
    };//arrange
    const book = controller.updateBook('12', {title: 'title2', author: 'author2', publishing_year: 2002});//act
    expect(book).toEqual({id:'12', title: 'title2', author: 'author2', publishing_year: 2002});//assert
  });

  it('should call BookService.deleteBook()', () => {
    mockBookService.deleteBook = jest.fn();//arrange
    controller.deleteBook('12');//act
    expect(mockBookService.deleteBook).toHaveBeenCalledWith('12');//assert
  });
});