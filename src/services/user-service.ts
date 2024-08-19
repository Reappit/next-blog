import { UserDto } from '@/dto/user';
import userRepository from '@/repository/user-repository';

const userService = {
  async getUserByEmail(email: string) {
    const user = await userRepository.getUserByEmail(email);
    return UserDto.parse(user);
  },
};

export default userService;
