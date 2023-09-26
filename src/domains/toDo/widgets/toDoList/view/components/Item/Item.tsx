import {observer} from "mobx-react-lite";
import {ItemProps} from "./types";
import {useViewController} from "@/domains/toDo/widgets/toDoList/DI/DI";
import {ChangeEvent} from 'react'

const ItemComponent = (props: ItemProps) => {
  const {toDo} = props
  const vc = useViewController()

  const taskId = `task_${toDo.id}`

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    vc.clickOnCheckButton(toDo.id)
  }

  return (
    <div className="mb-2">
      <input className="hidden" type="checkbox" id={taskId} checked={toDo.completed} onChange={handleToggle}/>
      <label className="flex items-center h-16 px-2 rounded cursor-pointer hover:bg-gray-900" htmlFor={taskId}>
        <span
          className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
          <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
               fill="currentColor">
            <path fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"/>
          </svg>
        </span>
        <div className="flex flex-col gap-1">
          <span className="ml-4 text-sm font-bold">{toDo.title}</span>
          <span className="ml-4 text-sm text-gray-400">{toDo.description}</span>
        </div>
      </label>
    </div>
  )
}

export const Item = observer(ItemComponent)
