import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  reviewer_name: string;

  @IsString()
  @IsNotEmpty()
  review_text: string;
}
