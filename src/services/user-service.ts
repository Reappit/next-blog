import userRepository from '@/repository/user-repository';
import { UserDto } from '@/dto/user';

const userService = {
  async getUserByUsername(username: string) {
    const user = await userRepository.getUserByUsername(username);
    return UserDto.parse(user);
  },
};

export default userService;
