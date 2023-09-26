import type {NextApiRequest, NextApiResponse} from 'next'
import {verify} from "jsonwebtoken";
import {ENV} from "@/configs/env/env";
import {ResponseData, ToDo, TokenPayload} from "@/shared/types/server";
import {toDos} from "@/mockData/db";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<ToDo[]>>
) {
  try {
    switch (req.method) {
      case 'GET': {
        const token = req.cookies?.token
        if (!token) {
          return res.status(403).json({errors: [{message: 'Not authorized'}]})
        }
        const decoded = verify(token, ENV('JWT_SECRET')) as TokenPayload

        const foundToDos = toDos.filter(toDo => toDo.userId === decoded.id)

        return res.status(200).json({
          data: foundToDos
        })
      }
      default: {
        return res.status(405).json({errors: [{message: 'Method not allowed'}]})
      }
    }
  } catch (error) {
    return res.status(500).json({errors: [{message: 'Internal server error'}]})
  }
}
