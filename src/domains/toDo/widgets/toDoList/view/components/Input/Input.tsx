import {observer} from "mobx-react-lite";
import {useViewController} from "@/domains/toDo/widgets/toDoList/DI/DI";
import {ChangeEvent, useCallback} from "react";

const InputComponent = () => {
  const vc = useViewController()
  const {inputDescriptionValue, inputTitleValue} = vc
  const handleClickOnAddButton = useCallback(() => {
    vc.clickOnAddButton()
  }, [vc])

  const handleClickOnResetButton = useCallback(() => {
    vc.clickOnResetButton()
  }, [vc])

  const handleChangeInputTitleValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    vc.changeInputTitleValue(event.target.value)
  }, [vc])

  const handleChangeInputDescriptionValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    vc.changeInputDescriptionValue(event.target.value)
  }, [vc])

  return (
    <div className="flex items-center w-full h-16 px-2 mt-2 text-sm font-medium rounded">
      <button onClick={handleClickOnAddButton} className={"text-2xl hover:text-blue-500 ml-0.5"}>
        +
      </button>
      <div>
        <input className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium" type="text"
               placeholder="Title"
               onChange={handleChangeInputTitleValue}
               value={inputTitleValue}
        />
        <input className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium" type="text"
               placeholder="description"
               onChange={handleChangeInputDescriptionValue}
               value={inputDescriptionValue}
        />
      </div>
      <div>
        <button onClick={handleClickOnResetButton} className={"text-2xl hover:text-red-500"}>
          x
        </button>
      </div>
    </div>
  )
}

export const Input = observer(InputComponent)
