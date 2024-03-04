import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { BookController } from "./books.controller";

@Module({
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}