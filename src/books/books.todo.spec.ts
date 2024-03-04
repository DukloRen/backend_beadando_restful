import { BookController } from './books.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './books.service';
import { BookDTO } from './books.dto';


describe('BookController', ()=>{
  let controller: BookController;

  beforeEach(async () => {
    const mockBookService = {
      getSpecificBookByID: (id: string) => {
        if (id === '5') {
          return { text: 'test' };
        }
      },
      getAllBooks: () => [{ text: 'test' }],
      postBook: (bookDto: BookDTO) => ({ id: '5', ...bookDto }),
      updateBook: (bookDto: BookDTO) => ({ id: '5', ...bookDto })
    };
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
    const book = controller.getAllBooks(); //act
    expect(book).toEqual([{ text: 'test' }]);
  });

  it('should return the single book returned by BookService.getSpecificBookByID()', () => {
    const book = controller.getSpecificBookByID('5'); //act
    expect(book).toEqual({ text: 'test' });
  });

  it('should return the single newly created book returned by BookService.postBook()', () => {
    const book = controller.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 });
    expect(book).toEqual({ id: '5', title: 'test_t', author: 'test_a', publishing_year: 2000 });
  });

  it('should return the updated todo returned by todoService.updateTodo()', () => {
    const todo = controller.postBook({ title: 'test_t', author: 'test_a', publishing_year: 2000 }); //arrange
    controller.updateBook('5',{ title: 'test_t2', author: 'test_a2', publishing_year: 2002 }); //act
    expect(controller.getSpecificBookByID(todo.id)).toEqual({
      id: '5',
      title: 'test_t2',
      author: 'test_a2',
      publishing_year: 2002
    });
  });
});