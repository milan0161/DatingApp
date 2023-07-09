import { useRouteError } from "react-router-dom";
import NavBar from "../../features/common/navigation/NavBar";

const ErrorPage: React.FunctionComponent = () => {
  const error: any = useRouteError();
  let title: string = "An Error occured!";
  let message: string = "Something went wrong please try again later";
  if (error.status === 404) {
    title = "Not Found!";
    message = "Could not find resource or page";
  }

  return (
    <div>
      <NavBar />
      <h1 className="text-center mt-10">{title}</h1>
      <p className="text-center">{message}</p>
    </div>
  );
};
export default ErrorPage;
