import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateTractDto } from './dto/create-track.dto';
import { UpdateTractDto } from './dto/update-track.dto';
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
    return this.trackService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }
  @Put()
  update(@Body() dto: UpdateTractDto) {
    return this.trackService.update(dto);
  }
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }
}
