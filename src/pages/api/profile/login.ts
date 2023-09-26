import type {NextApiRequest, NextApiResponse} from 'next'
import {sign} from 'jsonwebtoken';
import {ENV} from '@/configs/env/env';
import {LoginResponse, ResponseData} from "@/shared/types/server";
import {users} from "@/mockData/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<LoginResponse>>
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
