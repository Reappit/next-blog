import userRepository from '@/repository/user-repository';
import { UserDto } from '@/dto/user';

const userService = {
  async getUserByEmail(email: string) {
    const user = await userRepository.getUserByEmail(email);
    return UserDto.parse(user);
  },
};

export default userService;
