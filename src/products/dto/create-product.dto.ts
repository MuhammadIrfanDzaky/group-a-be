import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'image_url must be a valid URL' })
  image_url?: string;
}
