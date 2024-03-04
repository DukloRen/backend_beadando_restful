import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString, Max, Min } from "class-validator";

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  public title!: string;

  @IsNotEmpty()
  @IsString()
  public author!: string;

  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(2024)
  @IsPositive()
  public publishing_year!: number;
}