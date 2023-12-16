import { Toggle } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import { useState } from "react";
import { instance } from "@/axios-config/instance";

interface Action {
   actionChecked: boolean;
   serviceId: number;
   clicked: (id: any) => void;
}

function Action({ actionChecked, serviceId, clicked }: Action) {
   const [status, setStatus] = useState(actionChecked);
   const [loading, setLoading] = useState(false);

   const handleAction = async () => {
      setLoading(true);
      if (status) {
         // make it  inactive
         const res = await instance.post(
            `/api/v1/admin/products/inactivate/${serviceId}`
         );
         if (res.data.success) {
            setStatus(!status);
         }
         setLoading(false);
      } else {
         // make it active
         const res = await instance.post(
            `/api/v1/admin/products/activate/${serviceId}`
         );
         if (res.data.success) {
            setStatus(!status);
         }
         setLoading(false);
      }
   };

   return (
      <div className="flex gap-[10px] items-center">
         <Toggle
            size="sm"
            loading={loading}
            checked={status}
            onChange={handleAction}
         />
         <EditIcon
            fill="black"
            className="cursor-pointer"
            onClick={() => clicked(serviceId)}
         />
      </div>
   );
}

export default Action;
