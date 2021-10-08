import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTractDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Post()
  create(@Body() dto: CreateTractDto) {
    return this.trackService.create(dto);
  }
  @Get()
  getAll() {
    return 'WORK';
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getOne() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delete() {}
}
