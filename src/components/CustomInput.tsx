import { useField } from "formik";

interface CustomInputProps {
   label: string;
}

function CustomInput({ label, bgColor, ...props }: CustomInputProps & any) {
   const [field, meta] = useField<any>(props.name);

   return (
      <div>
         <label className="block pl-[5px] ml-[10px]">{label}</label>
         <input
            {...field}
            {...props}
            className={
               meta.error && meta.touched
                  ? `border border-red-500  bg-shades2 text-black outline-none p-[7px] w-full rounded-[10px] mb-[10px] mt-1 `
                  : `border-none  bg-shades2 text-black outline-none py-[7px] px-[15px] w-full rounded-[10px] mb-[10px] mt-1`
            }
         />
         {meta.error && meta.touched && (
            <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
               {meta.error}
            </div>
         )}
      </div>
   );
}

export default CustomInput;
