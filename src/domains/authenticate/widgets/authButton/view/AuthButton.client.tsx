'use client';

import {useViewController} from "@/domains/authenticate/widgets/authButton/DI/DI";
import {useCallback} from "react";
import {observer} from "mobx-react-lite";

const AuthButtonClientComponent = () => {
  const viewController = useViewController();
  const {isAuthenticated} = viewController
  const handleClick = useCallback(() => viewController.clickOnAuthButton(), [viewController])
  return (
    <button onClick={handleClick} disabled={isAuthenticated}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isAuthenticated ? 'bg-green-500 hover:bg-green-700 cursor-not-allowed' : ''}`}>
      {isAuthenticated ? 'You are login successfully 🥳' : "Let's go get auth token 🚀"}
    </button>
  );
}

export const AuthButtonClient = observer(AuthButtonClientComponent)
