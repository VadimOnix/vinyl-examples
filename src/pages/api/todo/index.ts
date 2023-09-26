import type {NextApiRequest, NextApiResponse} from 'next'
import {verify} from "jsonwebtoken";
import {ENV} from "@/configs/env/env";
import {ResponseData, ToDo, TokenPayload} from "@/shared/types/server";
import {toDos} from "@/mockData/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<ToDo>>
) {
  try {
    switch (req.method) {
      case 'POST': {
        const token = req.cookies?.token
        if (!token) {
          return res.status(403).json({errors: [{message: 'Not authorized'}]})
        }
        const decoded = verify(token, ENV('JWT_SECRET')) as TokenPayload

        const newToDo = req.body
        const errors = []
        // validate fields
        if (!newToDo.title) {
          errors.push({message: 'Title is required'})
        }
        if (!newToDo.description) {
          errors.push({message: 'Description is required'})
        }
        if (newToDo.completed === undefined) {
          errors.push({message: 'Completed is required'})
        }
        if (errors.length > 0) {
          return res.status(400).json({errors})
        }

        newToDo.userId = decoded.id
        const maxId = toDos.reduce((maxId, toDo) => Math.max(maxId, toDo.id), 0)
        newToDo.id = maxId + 1

        toDos.push(newToDo)

        return res.status(200).json({
          data: newToDo
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
