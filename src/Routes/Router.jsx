import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import SchedulePage from "../components/Schedule/SchedulePage";
import BudgetPage from "../components/Budget/BudgetPage";
import StudyPlannerPage from "../components/Study/StudyPlannerPage";
import Login from "../components/Sign/Login";
import Register from "../components/Sign/Register";
import ErrorPage from "../components/Error/ErrorPage";
import ExamGenerator from "../components/Quiz/ExamGenerator";
import OverallProgress from "../components/Progress/StudentSuccessCenter";

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
        element:<ExamGenerator></ExamGenerator>
      },
      {
        path: "study-plan",
        element: <StudyPlannerPage></StudyPlannerPage>
      },
      {
        path: "progress",
        element:<OverallProgress></OverallProgress>
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
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
