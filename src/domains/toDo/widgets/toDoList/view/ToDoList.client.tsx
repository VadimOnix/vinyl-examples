'use client';

import {useViewController} from "@/domains/toDo/widgets/toDoList/DI/DI";
import {observer} from "mobx-react-lite";
import {Title} from "@/domains/toDo/widgets/toDoList/view/components/Title/Title";
import {Item} from "./components/Item/Item";
import {Input} from "./components/Input/Input";
import {Spinner} from "@/shared/components/Spinner/Spinner";

export const ToDoListComponent = () => {
  const vc = useViewController()
  const {toDos, isFetching, isAbleToDoList} = vc

  const renderItems = (toDos ?? []).map(toDo => (
    <Item
      key={`${toDo.id}${toDo.title}${toDo.description}`}
      toDo={toDo}
    />
  ))

  return (
    <div className="flex flex-grow items-center justify-center h-full pt-3 pb-3">
      <div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg w-96 text-gray-200">
        <Title/>
        {isFetching ? <Spinner/> : renderItems}
        {isAbleToDoList ? <Input/> : null}
      </div>
    </div>
  )
}

export const ToDoList = observer(ToDoListComponent)
