import { useAuth } from "../../context/AuthContext";
import  { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema} from "./LoginSchema";
import type {  LoginForm } from "./LoginSchema";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login ,token} = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });


useEffect(() => {

    if(token){

        navigate("/admin/dashboard");

    }

},[token,navigate]);

  const onSubmit = async (data: LoginForm) => {
      // console.log("Form submitted", data);
    try {
      setLoading(true);
      const response=await login(data.email, data.password);
      toast.success(

    "Welcome Admin"

);
      // navigate("/admin/dashboard");
      if (response.forcePasswordChange) {
    navigate("/admin/change-password");
} else {
    navigate("/admin/dashboard");
}
    } catch (error:any) {
       toast.error(

        error.response?.data?.message ||

        "Login Failed"

    );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[420px] shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">CSIR-NGRI Canteen</h1>
            <p className="text-slate-600 mt-2">Admin Portal</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Input placeholder="Email Address" {...register("email")} />
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>
            <div>
              <Input type="password" placeholder="Password" {...register("password")} />
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>
            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={loading}>
              {loading ? "Signing In..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
