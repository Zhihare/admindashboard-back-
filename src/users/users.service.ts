
import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/User.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private usersModule: Model<User>) {}

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    async findUserByEmail(email: string) {
        return await this.usersModule.findOne({ email: email });
    }

    async createUser(createUserDto: CreateUserDto) {
        createUserDto.password = await this.hashPassword(createUserDto.password);
        const newUser = new this.usersModule(createUserDto);
        return await newUser.save();
    }

    async getUser() {
        return this.usersModule.find();
    }

    async getUserById(id: string) {
        return this.usersModule.findById(id);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.usersModule.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    async deleteUser(id: string) {
        return this.usersModule.findByIdAndDelete(id);
    }

    async updateUserRefreshToken(email: string, refreshToken: string, token: string) {
        return this.usersModule.findOneAndUpdate({ email }, { refreshToken , token}, { new: true });
    }

    async clearRefreshToken(email: string) {
        return this.usersModule.findOneAndUpdate({ email }, { refreshToken: '', token: '' }, {new: true });
    }

    async publicUser(email: string) {
        const user = await this.usersModule.findOne({ email: email }).select('-password').lean();
        return user;
    }
}
