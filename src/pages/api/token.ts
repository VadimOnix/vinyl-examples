// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
  token: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query)
  const {token} = req.query
  res.setHeader("set-cookie", `token=${token}; path=/; samesite=lax; httponly;`)
  res.status(200).json({token: String(token)})
}
