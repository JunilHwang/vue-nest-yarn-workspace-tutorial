import { Injectable } from "@nestjs/common";
import { User } from 'domain/types'

@Injectable()
export class UserService {
  getUser (): User {
    return {
      idx: 1,
      name: 'junil',
      id: 'JunilHwang',
      email: 'tjsdlf4261@naver.com'
    }
  }
}