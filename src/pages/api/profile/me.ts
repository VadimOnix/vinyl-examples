import type {NextApiRequest, NextApiResponse} from 'next'
import type {ResponseData, User} from './login'
import {users} from './login'
import {verify} from 'jsonwebtoken'
import {ENV} from "@/configs/env/env";

type MeResponse = Omit<User, 'password'>

export type TokenPayload = {
  id: number,
  iat: number,
  exp: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<MeResponse>>
) {
  try {
    switch (req.method) {
      case 'GET': {
        try {
          const token = req.cookies?.token

          if (!token) {
            return res.status(403).json({errors: [{message: 'Not authorized'}]})
          }
          const decoded = verify(token, ENV('JWT_SECRET')) as TokenPayload

          const user = users.find(user => user.id === decoded.id)

          if (!user) {
            return res.status(403).json({errors: [{message: 'Not authorized'}]})
          }
          return res.status(200).json({
            data: {
              id: user.id,
              login: user.login,
            }
          })
        } catch (error) {
          return res.status(403).json({errors: [{message: 'Not authorized'}]})
        }
      }
      default: {
        return res.status(405).json({errors: [{message: 'Method not allowed'}]})
      }
    }
  } catch (error) {
    return res.status(500).json({errors: [{message: 'Internal server error'}]})
  }
}
