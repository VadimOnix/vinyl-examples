import {Inter} from 'next/font/google'
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {AuthService} from "@/shared/services/authService/authService";
import {createHydrateInjector, WithHydrationProps} from "@/shared/modules/widget/hydrateInjector";
import {AuthButtonWidget} from "@/domains/authenticate/widgets/authButton/view/AuthButtonWidget";
import {AuthButtonHydrationData} from "@/domains/authenticate/widgets/authButton/types/types";

const inter = Inter({subsets: ['latin']})

type HydrationHomePageWidgetsData = {
  authButton: AuthButtonHydrationData
}
const {withPageHydration, withWidgetHydration} = createHydrateInjector<HydrationHomePageWidgetsData>()
// const AuthButtonOnPage = withWidgetHydration(AuthButtonWidget)

function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <AuthButtonWidget/>
    </main>
  )
}

export const getServerSideProps = (async (context) => {

  const authService = new AuthService();
  const token = authService.getToken(context)

  return {
    props: {
      anyProp: 'qwerty',
      hydrationData: {
        authButton: null,
        toDoList: {
          toDos: ['123', '456']
        }
      }
    }
  }
}) satisfies GetServerSideProps<WithHydrationProps<HydrationHomePageWidgetsData>>


export const HomePage = withPageHydration(Home)

export default Home
