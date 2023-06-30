import Home from "./components/Home";
import Game from "./components/Game";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/game',
    element: <Game />
  }
];

export default AppRoutes;
