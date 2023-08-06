import HomeScreen from "./components/HomeScreen/HomeScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import JoinScreen from "./components/JoinScreen/JoinScreen";

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
  },
  {
    path: '/join',
    element: <JoinScreen/>
  }
];

export default AppRoutes;
