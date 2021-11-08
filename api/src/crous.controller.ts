import { 
  Controller,
  Get,
  Delete,
  Body,
  HttpCode,
  Param,
  Post,
  Query,

} from '@nestjs/common';
import { CrousService } from './crous.service';
import { Crous } from './crous';
import { CrousDto} from './crousDto';

@Controller('/crous')
export class CrousController {
  constructor(private readonly crousService: CrousService) {}

  @Get()
  public getAllCrous(@Query('type') type: string): Crous[] {
    return !!type
    ? this.crousService.getCrousByType(type)
    : this.crousService.getAllCrous();
  }

  @Post()
  public createCrous(@Body() crousToCreate: CrousDto): Crous {
    this.crousService.addCrous(crousToCreate);
    return this.crousService.getCrous(crousToCreate.title);
  }

  @Get(':title')
  public getCrousWithId(@Param('title') title: string): Crous {
    return this.crousService.getCrous(title);
  }

  @Delete(':id')
  public deleteCrous(@Param('id') id: string): void {
    return this.crousService.deleteCrous(id);
  }

  @Post('search')
  @HttpCode(200)
  public searchByIdAndType(@Body() query: { term: string}): Crous[] {
    return this.crousService.searchByIdAndType(query.term);
  }
}
