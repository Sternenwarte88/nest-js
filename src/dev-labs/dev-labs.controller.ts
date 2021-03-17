import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DevLabsService } from './dev-labs.service';

@Controller()
export class DevLabsController {
  constructor(private readonly devLabsService: DevLabsService) {}

  @Get()
  root(@Res() res: Response) {
    return this.devLabsService.getIndex(res);
  }
}
