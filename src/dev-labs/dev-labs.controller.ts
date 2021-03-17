import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { DevLabsService } from './dev-labs.service';

@Controller()
export class DevLabsController {
  constructor(private readonly devLabsService: DevLabsService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render('index', this.devLabsService.getIndex);
  }
}
