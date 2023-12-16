import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "rsuite";
import ModalForm from "./ModalForm";
import { GlobalState, ProductsState } from "@/types/statesTypes";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "rsuite";
import { completed } from "@/store/productsSlice";

interface ModalType {
   open: boolean;
   setOpen: any;
   requestType: string;
   serviceId?: any;
}

function ModalComponent({ open, setOpen, requestType, serviceId }: ModalType) {
   const handleClose = useCallback(() => setOpen(false), [setOpen]);
   const [submited, setSubmited] = useState(false);
   const dispatch: any = useDispatch();
   const { loadingChange, isSuccessed, error }: ProductsState = useSelector(
      (state: GlobalState) => state.products
   );
   useEffect(() => {
      if (isSuccessed) {
         handleClose();
         dispatch(completed());
         setSubmited(false);
      }
   }, [isSuccessed, handleClose, dispatch]);

   return (
      <Modal
         backdrop={true}
         keyboard={false}
         open={open}
         onClose={handleClose}
         className="[&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[30px] !mt-0 !top-[22%]"
      >
         <Modal.Header closeButton={false}>
            <Modal.Title className="text-center !text-primary1 font-bold">
               {requestType}
            </Modal.Title>
         </Modal.Header>

         <Modal.Body>
            {loadingChange && (
               <div className="h-[200px] my-4 flex justify-center items-center">
                  <Loader size="lg" />{" "}
               </div>
            )}
            {!loadingChange && !error && (
               <ModalForm
                  submited={submited}
                  requestType={requestType}
                  serviceId={serviceId}
               />
            )}
            {error && (
               <div className="h-[100px] flex items-center justify-center text-red-500">
                  {error}
               </div>
            )}
         </Modal.Body>
         <Modal.Footer className="flex justify-center items-center gap-[25px] pb-[20px]">
            <Button
               onClick={handleClose}
               className="w-[120px] py-[6px] text-center rounded-[20px] bg-[#eee]"
            >
               Back
            </Button>
            <Button
               type="submit"
               className="w-[120px] py-[6px] text-center rounded-[20px] text-white bg-continue-button hover:!text-[#eee]"
               onClick={() => setSubmited(!submited)}
               disabled={loadingChange}
            >
               Continue
            </Button>
         </Modal.Footer>
      </Modal>
   );
}

export default ModalComponent;
