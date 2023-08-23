import { PartialType } from '@nestjs/swagger';
import { CreateUrlCheckDto } from './create-url-check.dto';

export class UpdateUrlCheckDto extends PartialType(CreateUrlCheckDto) {}
