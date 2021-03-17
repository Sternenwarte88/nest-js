import { Injectable } from '@nestjs/common';

@Injectable()
export class DevLabsService {
  getIndex = {
    pageTitle: 'Dev-Labs',
    path: './',
    cssName: 'index',
    blogLink: 'https://www.blog.coding-experience.de',
    mainLink: 'https://www.coding-experience.de',
  };
}
