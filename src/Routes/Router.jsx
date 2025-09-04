import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import SchedulePage from "../components/Schedule/SchedulePage";
import BudgetPage from "../components/Budget/BudgetPage";
import QuizPage from "../components/Quiz/QuizPage";
import StudyPlannerPage from "../components/Study/StudyPlannerPage";
import ProgressDashboard from "../components/Progress/ProgressDashboard";
import Login from "../components/Sign/Login";
import Register from "../components/Sign/Register";

export let router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "schedule",
        element:<SchedulePage></SchedulePage>,
      },
      {
        path: "budget",
        element:<BudgetPage></BudgetPage>,
      },
      {
        path: "qna",
        element:<QuizPage></QuizPage>
      },
      {
        path: "study-plan",
        element: <StudyPlannerPage></StudyPlannerPage>
      },
      {
        path: "progress",
        element:<ProgressDashboard></ProgressDashboard>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      },
    ],
  },
]);
