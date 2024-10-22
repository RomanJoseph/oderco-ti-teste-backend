import { Category } from '@prisma/client';
import { v4 } from 'uuid';

export const CategoryFixture = (): Category => {
  return {
    id: v4(),
    name: 'Category',
    createdAt: new Date(),
  };
};
