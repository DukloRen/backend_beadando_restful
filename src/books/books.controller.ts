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
  deleteBook(@Param('id') id: string) {
    const book = this.bookService.getSpecificBookByID(id);
    if (!book){
      throw new NotFoundException()
    }else {
      this.bookService.deleteBook(id)
    }
  }

  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() body: BookDTO) {
    return this.bookService.updateBook(id, body);
  }
}