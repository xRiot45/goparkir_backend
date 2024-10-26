import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly entityManager: EntityManager) {}
  async register(request: any): Promise<User> {
    const { email, username, password, role } = request;

    // Cek apakah email atau username sudah ada
    const existingUser = await this.entityManager.findOne(User, {
      where: [{ email }, { username }],
    });
    if (existingUser) {
      throw new BadRequestException('Email or Username already exists');
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.entityManager.create(User, {
      email,
      username,
      password: hashedPassword,
      role: role || 'user',
    });

    return this.entityManager.save(user);
  }

  async login(request: any) {
    const { email, password } = request;
    const user = await this.entityManager.findOne(User, {
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Email or Password is incorrect');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Email or Password is incorrect');
    }
    return user;
  }

  async findAllUsers() {
    return this.entityManager.find(User);
  }

  async findUserById(id: string) {
    return this.entityManager.findOne(User, {
      where: { id },
    });
  }
}
