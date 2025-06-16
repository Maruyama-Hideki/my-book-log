import { LoginForm } from "@/components/organisms/login-form";
import { Header } from "@/components/organisms/Header";

const LoginPage = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const onClickLogin = () => {
  //   setIsLogin(true);
  // };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
