import type {NextApiRequest, NextApiResponse} from 'next'
import {TokenPayload} from "@/pages/api/profile/me";
import {verify} from "jsonwebtoken";
import {ENV} from "@/configs/env/env";
import {ResponseData} from "@/pages/api/profile/login";

export type ToDo = {
  id: number
  title: string
  description: string
  completed: boolean
  userId: number
}

export const toDos: ToDo[] = [
  {"id": 1, "title": "Buy Groceries", "description": "Milk, Eggs, Bread", "completed": false, "userId": 1},
  {"id": 2, "title": "Finish Report", "description": "Due by Friday", "completed": false, "userId": 2},
  {"id": 3, "title": "Call Mom", "description": "Wish her Happy Birthday", "completed": false, "userId": 3},
  {"id": 4, "title": "Exercise", "description": "Go for a run", "completed": false, "userId": 4},
  {"id": 5, "title": "Read a Book", "description": "Start 'The Great Gatsby'", "completed": false, "userId": 5},
  {"id": 6, "title": "Clean the Garage", "description": "Organize tools", "completed": false, "userId": 6},
  {"id": 7, "title": "Pay Bills", "description": "Electricity, Water, Internet", "completed": false, "userId": 7},
  {"id": 8, "title": "Plan Vacation", "description": "Research destinations", "completed": false, "userId": 8},
  {"id": 9, "title": "Fix Leaky Faucet", "description": "Buy plumbing supplies", "completed": false, "userId": 9},
  {
    "id": 10,
    "title": "Write Blog Post",
    "description": "Topic: Artificial Intelligence",
    "completed": false,
    "userId": 10
  },
  {
    "id": 11,
    "title": "Finish Presentation",
    "description": "Slides for client meeting",
    "completed": false,
    "userId": 1
  },
  {"id": 12, "title": "Call John", "description": "Discuss project updates", "completed": false, "userId": 2},
  {"id": 13, "title": "Yoga Class", "description": "6:00 PM at the gym", "completed": false, "userId": 3},
  {"id": 14, "title": "Buy Birthday Gift", "description": "For sister's birthday", "completed": false, "userId": 4},
  {"id": 15, "title": "Learn Guitar", "description": "Practice chords", "completed": false, "userId": 5},
  {"id": 16, "title": "Organize Photos", "description": "Create albums", "completed": false, "userId": 6},
  {"id": 17, "title": "Schedule Dentist Appointment", "description": "Checkups due", "completed": false, "userId": 7},
  {"id": 18, "title": "Book Flight Tickets", "description": "For summer vacation", "completed": false, "userId": 8},
  {"id": 19, "title": "Fix Bike", "description": "Flat tire", "completed": false, "userId": 9},
  {"id": 20, "title": "Write Code", "description": "Feature implementation", "completed": false, "userId": 10},
  {"id": 21, "title": "Submit Expense Report", "description": "Last month's expenses", "completed": false, "userId": 1},
  {
    "id": 22,
    "title": "Meeting with Marketing Team",
    "description": "Discuss campaign strategy",
    "completed": false,
    "userId": 2
  },
  {
    "id": 23,
    "title": "Meditation Session",
    "description": "30 minutes in the morning",
    "completed": false,
    "userId": 3
  },
  {"id": 24, "title": "Buy Art Supplies", "description": "Canvas, Paints", "completed": false, "userId": 4},
  {"id": 25, "title": "Learn French", "description": "Study for 1 hour", "completed": false, "userId": 5},
  {"id": 26, "title": "Clean out the Attic", "description": "Donate old items", "completed": false, "userId": 6},
  {
    "id": 27,
    "title": "Renew Magazine Subscription",
    "description": "Expires next month",
    "completed": false,
    "userId": 7
  },
  {"id": 28, "title": "Plan Date Night", "description": "Dinner and a movie", "completed": false, "userId": 8},
  {"id": 29, "title": "Fix Leaky Roof", "description": "Call a contractor", "completed": false, "userId": 9},
  {"id": 30, "title": "Debug Code", "description": "Identify and fix bugs", "completed": false, "userId": 10},
  {
    "id": 31,
    "title": "Prepare Presentation",
    "description": "Slides for team meeting",
    "completed": false,
    "userId": 1
  },
  {"id": 32, "title": "Client Call", "description": "Discuss project requirements", "completed": false, "userId": 2},
  {"id": 33, "title": "Gardening", "description": "Plant new flowers", "completed": false, "userId": 3},
  {"id": 34, "title": "Buy a Gift for Dad", "description": "Father's Day coming up", "completed": false, "userId": 4},
  {"id": 35, "title": "Practice Piano", "description": "Learn a new song", "completed": false, "userId": 5},
  {"id": 36, "title": "Sort Bookshelf", "description": "Organize by genre", "completed": false, "userId": 6},
  {"id": 37, "title": "Schedule Vet Appointment", "description": "For the cat", "completed": false, "userId": 7},
  {"id": 38, "title": "Research Hiking Trails", "description": "Plan weekend hike", "completed": false, "userId": 8},
  {"id": 39, "title": "Oil Change for Car", "description": "Due at 50,000 miles", "completed": false, "userId": 9},
  {"id": 40, "title": "Code Review", "description": "Team review session", "completed": false, "userId": 10},
  {
    "id": 41,
    "title": "Update Project Documentation",
    "description": "Add recent changes",
    "completed": false,
    "userId": 1
  },
  {"id": 42, "title": "Team Meeting", "description": "Discuss sprint goals", "completed": false, "userId": 2},
  {"id": 43, "title": "Morning Walk", "description": "30 minutes around the park", "completed": false, "userId": 3},
  {"id": 44, "title": "Buy New Running Shoes", "description": "Old ones are worn out", "completed": false, "userId": 4},
  {"id": 45, "title": "Practice Drawing", "description": "Sketch a landscape", "completed": false, "userId": 5},
  {
    "id": 46,
    "title": "Clean out the Basement",
    "description": "Declutter storage area",
    "completed": false,
    "userId": 6
  },
  {"id": 47, "title": "Renew Gym Membership", "description": "Expires next week", "completed": false, "userId": 7},
  {
    "id": 48,
    "title": "Cook a Special Dinner",
    "description": "Celebrating anniversary",
    "completed": false,
    "userId": 8
  },
  {
    "id": 49,
    "title": "Install New Light Fixtures",
    "description": "Living room and kitchen",
    "completed": false,
    "userId": 9
  },
  {"id": 50, "title": "Implement Login Page", "description": "For website project", "completed": false, "userId": 10}
]

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
