import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { BookService } from "./books.service";
import { BookDTO } from "./books.dto";

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(){
    return this.bookService.getAllBooks();
  }

  @Get('/:id')
  getSpecificBookByID(@Param('id') id: string){
    const book = this.bookService.getSpecificBookByID(id);
    if(!book){
      throw new NotFoundException();
    }
    return book;
  }

  @Post()
  postBook(@Body() bookDTO: BookDTO) {
    return this.bookService.postBook(bookDTO);
  }

  @Delete('/:id')
  deleteMessage(@Param('id') id: string) {
    const book = this.bookService.getSpecificBookByID(id);
    if (!book){
      throw new NotFoundException()
    }else {
      this.bookService.deleteBook(id)
    }
  }

  @Put('/:id')
  bookUpdate(@Param('id') id: string, @Body() body: BookDTO){
    const book = this.bookService.getSpecificBookByID(id);
    if(!book){
      throw new NotFoundException()
    }
    this.bookService.bookUpdate(id, body);
  }
}