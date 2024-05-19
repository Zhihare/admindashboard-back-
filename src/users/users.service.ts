import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/User.schema';
import { UsersModule } from './users.module';
import Module from 'module';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private usersModule: Model<User>) { }

    createUser(CreateUserDto: CreateUserDto) {
        const newUser = new this.usersModule(CreateUserDto);
        return newUser.save();
    }

    getUser() {
        return this.usersModule.find();
    }

    getUserById(id: string) {
        return this.usersModule.findById(id)
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.usersModule.findByIdAndUpdate(id, updateUserDto, {new: true})
    }

    deleteUser(id: string) {
        return this.usersModule.findByIdAndDelete(id);
    }
}
