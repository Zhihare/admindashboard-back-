import { Body, Controller, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Post()
        @UsePipes(new ValidationPipe())
        
        createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }

    @Get()
    getUsers() {
        return this.userService.getUser()
    }
    
    @Get(':id')
    async getUsersById(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('User not found', 404);
        const findUser = await this.userService.getUserById(id);
        if (!findUser) throw new HttpException('User not found', 404);
        return findUser;
    }

    @Patch(':id')
        @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID', 400);
        const updateUser = await this.userService.updateUser(id, updateUserDto);
        if (!updateUser) throw new HttpException('User not found', 404);
        return updateUser;
    }
    
    @Delete(':id')
    async deleteUser(@Param('id') id: string) { 
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID', 400);
        const deleteUser = await this.userService.deleteUser(id);
        if (!deleteUser) throw new HttpException('User not found', 404);
        return new HttpException(`User deleted`, 200);

    }


}
