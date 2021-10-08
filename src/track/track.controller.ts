import { Controller, Get } from '@nestjs/common';

@Controller('/tracks')
export class TrackController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  create() {}
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
