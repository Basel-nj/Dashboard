"use client";
import Image from "next/image";
import layer from "/public/assets/svg/Layer 2.svg";
import { Form, Formik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import CustomInput from "@/components/CustomInput";
import axios from "axios";
import SvgComponent from "@/components/SvgComponent";
import { useRouter } from "next/navigation";
import SVGLogo from "@/components/SVGLogo";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

export default function Home() {
   const router = useRouter();
   const dispatch: any = useDispatch();

   const svgDetailes = [
      {
         id: 1,
         width: "150",
         height: "150",
         left: "25%",
         top: "240px",
      },

      {
         id: 2,
         width: "100",
         height: "100",
         left: "5%",
         top: "120px",
      },
      {
         id: 3,
         width: "120",
         height: "120",
         left: "40%",
         top: "530px",
      },
      {
         id: 4,
         width: "120",
         height: "120",
         left: "90%",
         top: "450px",
      },
   ];

   const loginSchema = yup.object().shape({
      username: yup.string().required("Please add your username"),
      password: yup
         .string()
         .min(5, "must be more than 5 charcheters")
         .required("Please add your password"),
   });

   const submithandler = async (values: any, actions: any) => {
      axios
         .post("https://backend.watanyia.com/api/v1/auth/admin/login", values)
         .then((res) => {
            if (res.status === 200) {
               router.push("/website1/categories/facebook");
               localStorage.setItem("token", res.data.data.accessToken);
               dispatch(login());
            }
         })
         .catch((error) => {
            console.error(error.message);
         });
      actions.resetForm();
   };

   return (
      <section className="relative bg-login-background background h-[100vh] flex flex-col items-center gap-[60px] overflow-hidden">
         {svgDetailes.map((svg) => {
            console.log(svg);

            return (
               <SvgComponent
                  key={svg.id}
                  className="absolute"
                  style={{ left: `${svg.left}`, top: ` ${svg.top}` }}
                  width={svg.width}
                  height={svg.height}
               />
            );
         })}

         <Image
            src={layer}
            width={300}
            height={300}
            alt=""
            className="absolute top-[180px] right-[250px]"
         />

         <header className="pl-[30px] pt-[10px] w-full">
            <SVGLogo color="#fff" className="w-[120px]" />
         </header>
         <main className="bg-white text-black w-[300px] sm:w-[380px] h-[450px] rounded-[35px] p-[25px] shadow-custom relative z-50">
            <h2 className="text-center text-primary1 text-[28px] mb-[20px] font-semibold">
               Log In
            </h2>
            <Formik
               initialValues={{ username: "", password: "" }}
               validationSchema={loginSchema}
               onSubmit={submithandler}
            >
               <Form>
                  <CustomInput label="Username" name="username" type="text" />
                  <CustomInput
                     label="Password"
                     name="password"
                     type="password"
                  />
                  <button
                     type="submit"
                     className="text-white mt-[30px] mb-[20px] text-[14px] mx-auto w-[150px] bg-button-gradient element-center py-[10px] rounded-[150px] cursor-pointer"
                  >
                     Log in
                  </button>
               </Form>
            </Formik>
            <p className="text-[14px] text-center text-text">
               Don´t have an account?{" "}
               <Link href="/register" className="text-[#0190FF] font-semibold ">
                  Register
               </Link>
            </p>
         </main>
      </section>
   );
}
