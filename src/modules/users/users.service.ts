import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
        password: hashSync(createUserDto.password, 10),
      },
    });
    if (findUser) {
      throw new ConflictException('User already exists.');
    }
    const user = new User();
    Object.assign(user, {
      ...createUserDto,
    });
    await this.prisma.user.create({
      data: { ...user },
    });
    return plainToInstance(User, user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return plainToInstance(User, users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not Found.');
    }
    return plainToInstance(User, user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not Found.');
    }
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return plainToInstance(User, updateUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not Found.');
    }
    await this.prisma.user.delete({ where: { id } });
  }

  async getUserWithContacts(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { contacts: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
