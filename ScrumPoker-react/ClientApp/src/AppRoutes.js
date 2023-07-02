import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";
import LoadingScreen from "./components/LoadingScreen";

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
    element: <GameScreen />
  }
];

export default AppRoutes;
