import HomeScreen from "./components/HomeScreen/HomeScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

const AppRoutes = [
  {
    index: true,
    element: <HomeScreen />
  },
  {
    path: "/loading",
    element: <LoadingScreen/>
  },
  {
    path: '/game',
    element: <GameScreen/>
  }
];

export default AppRoutes;
