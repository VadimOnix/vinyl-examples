import {Inter} from 'next/font/google'
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {AuthService} from "@/shared/services/authService/authService";
import {WithHydrationProps} from "@/shared/modules/widget/hydrateInjector";
import {getServerSideToDoListProps} from "@/domains/toDo/widgets/toDoList/DI/getServerSideToDoListProps";
import {AuthButton, HydrationHomePageWidgetsData, ToDoList, withPageHydration} from '@/injectMaps/home/map'

const inter = Inter({subsets: ['latin']})


function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {hydrationData} = props
  console.info("It's original page hydration data! 🤓\nThis object was injected into all widgets from page Map", hydrationData)

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <AuthButton/>
      <ToDoList/>
    </main>
  )
}

export const getServerSideProps = (async (context) => {
  const authService = new AuthService();
  const token = authService.getToken(context)

  const [toDoList] = await Promise.all([
    getServerSideToDoListProps(token, context),
  ])

  return {
    props: {
      hydrationData: {
        toDoList
      }
    }
  }
}) satisfies GetServerSideProps<WithHydrationProps<HydrationHomePageWidgetsData>>


export const HomePage = withPageHydration(Home)

export default HomePage
