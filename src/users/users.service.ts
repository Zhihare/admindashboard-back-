import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/User.schema';
import { UsersModule } from './users.module';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private usersModule: Model<User>) { }

  

    async hashPassward  (password: string) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    async findUserByEmail(email: string) {
    return await this.usersModule.findOne({ email: email });
    }

    async createUser(CreateUserDto: CreateUserDto) {
        CreateUserDto.password = await this.hashPassward(CreateUserDto.password);
        const newUser = await new this.usersModule(CreateUserDto);
        return await newUser.save();
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

    
   async publicUser(email: string) {
    const user = await this.usersModule.findOne({ email: email }).select('-password');
    
    console.log('User found:', user);
    
    return user;
}
}
