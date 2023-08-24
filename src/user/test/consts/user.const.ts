import { User } from 'src/user/entities/user.entity';

export const userStub = (): Partial<User> => {
  return {
    email: 'test@example.com',
    password: 'parola123',
  };
};
