import type {NextApiRequest, NextApiResponse} from 'next'
import {sign} from 'jsonwebtoken';
import {ENV} from '@/configs/env/env';

export type User = {
  id: number,
  login: string,
  password: string
}

type UserResponse = {
  token: string
}

export type ResponseData<T> = {
  data?: T,
  errors?: {
    message: string
  }[]
}

export const users: User[] = [
  {"id": 1, "login": "john_doe", "password": "password123"},
  {"id": 2, "login": "jane_doe", "password": "letmein"},
  {"id": 3, "login": "sam_smith", "password": "p@ssw0rd"},
  {"id": 4, "login": "mary_jones", "password": "qwerty"},
  {"id": 5, "login": "chris_brown", "password": "abc123"},
  {"id": 6, "login": "lisa_taylor", "password": "securepass"},
  {"id": 7, "login": "michael_clark", "password": "password456"},
  {"id": 8, "login": "susan_williams", "password": "letmeinnow"},
  {"id": 9, "login": "kevin_anderson", "password": "myp@ssword"},
  {"id": 10, "login": "emily_jackson", "password": "password789"}
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<UserResponse>>
) {
  switch (req.method) {
    case 'POST': {
      const {login, password} = req.body

      const userFound = users.find(user => user.login === login && user.password === password)

      if (!userFound) {
        return res.status(404).json({errors: [{message: 'User not found'}]})
      }

      const token = sign(
        {id: userFound.id},
        ENV('JWT_SECRET'),
        {expiresIn: '1d'}
      )
      res.setHeader('set-cookie', `token=${token}; path=/; samesite=lax; httponly;`)
      return res.status(200).json({data: {token}})
    }
    default: {
      return res.status(405).json({errors: [{message: 'Method not allowed'}]})
    }
  }
}
