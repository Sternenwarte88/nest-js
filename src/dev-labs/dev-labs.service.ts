import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class DevLabsService {
  getIndex(res: Response) {
    return res.render('index', {
      pageTitle: 'Dev-Labs',
      path: './',
      cssName: 'index',
      blogLink: 'https://www.blog.coding-experience.de',
      mainLink: 'https://www.coding-experience.de',
    });
  }
}
