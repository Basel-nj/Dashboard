import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import { useRef, useEffect, useState } from "react";
import { Dropdown, Loader } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "@/store/servicesSlice";
import { GlobalState, ServiceType, ServicesState } from "@/types/statesTypes";
import { usePathname } from "next/navigation";
import { getCategoryId } from "@/utils/getCategoryId";
import {
   addProduct,
   editProduct,
   addProductClientSide,
   editProductClientSide,
} from "@/store/productsSlice";

const loginSchema = yup.object().shape({
   code: yup.string().required("Please add the service ID"),
   service_id: yup.number().required("Please add the service type"),
   count: yup.number().required("Please add the count"),
   period_in_days: yup.number().required("Please add the duration"),
   price: yup.number().required("Please add the price"),
});

function ModalForm({ submited, requestType, serviceId }: any) {
   const [type, setType]: [number, any] = useState(0);
   const [titleType, setTitleType] = useState("");
   const buttonRef: any = useRef();
   const dispatch: any = useDispatch();
   const productName: any = usePathname().split("/website1/categories/")[1];
   const { isLoading, error, services }: ServicesState = useSelector(
      (state: GlobalState) => state.services
   );

   useEffect(() => {
      dispatch(getAllServices());
   }, [dispatch]);

   useEffect(() => {
      if (submited) {
         buttonRef.current.click();
      }
   }, [submited]);

   const submithandler = async (values: any, actions: any) => {
      const category_id = getCategoryId(productName);
      const data = { ...values, is_real_accounts: true, category_id };

      if (requestType === "Edit Service") {
         dispatch(editProduct({ data, serviceId }));
         actions.resetForm();
      } else {
         dispatch(addProduct(data));
         actions.resetForm();
      }
   };

   return (
      <div>
         <Formik
            initialValues={{
               code: "",
               service_id: "",
               count: "",
               period_in_days: "",
               price: "",
            }}
            validationSchema={loginSchema}
            onSubmit={submithandler}
         >
            {(props) => (
               <Form className="grid grid-cols-2 grid-rows-3 gap-x-3 py-2 px-8">
                  <CustomInput label="Service ID" name="code" type="text" />
                  <div>
                     <label className="block pl-[5px] ml-[10px]">
                        Service Type
                     </label>
                     <Dropdown
                        title={titleType}
                        name="serviceType"
                        className={
                           "border-none bg-shades2 text-black w-full rounded-[10px] mb-[10px] mt-1 [&>button]:!w-full [&>button]:!h-[35px] [&>button]:!flex [&>button]:!justify-between"
                        }
                     >
                        {isLoading && (
                           <Dropdown.Item className="!flex justify-center items-center">
                              {" "}
                              <Loader size="md" />
                           </Dropdown.Item>
                        )}

                        {Array.isArray(services) &&
                           services.length > 0 &&
                           services.map((service: ServiceType) => {
                              return (
                                 <Dropdown.Item
                                    key={service.id}
                                    onClick={() => {
                                       setType(service.id);
                                       setTitleType(service.name);
                                       props.values.service_id = service.id;
                                    }}
                                 >
                                    {service.name}
                                 </Dropdown.Item>
                              );
                           })}
                     </Dropdown>
                     {props.errors.service_id && props.touched.service_id && (
                        <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                           {props.errors.service_id}
                        </div>
                     )}
                  </div>
                  <CustomInput label="Count" name="count" type="number" />
                  <CustomInput
                     label="Duration (in days)"
                     name="period_in_days"
                     type="number"
                  />
                  <CustomInput label="Price" name="price" type="number" />
                  <button
                     type="submit"
                     className="hidden"
                     ref={buttonRef}
                  ></button>
               </Form>
            )}
         </Formik>
      </div>
   );
}

export default ModalForm;
