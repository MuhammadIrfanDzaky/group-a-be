import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Name of the reviewer',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  reviewer_name: string;

  @ApiProperty({
    description: 'Review text content',
    example: 'Great product! Highly recommended.',
  })
  @IsString()
  @IsNotEmpty()
  review_text: string;
}
