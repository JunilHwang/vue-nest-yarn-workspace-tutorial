import {Controller, Get} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from 'domain/types'

@Controller('/api/user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Get()
  getUser (): User {
    return this.userService.getUser()
  }
}