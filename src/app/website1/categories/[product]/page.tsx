"use client";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { Fragment, Ref, forwardRef, useEffect, useState } from "react";
import { Loader, Pagination } from "rsuite";
import { usePathname } from "next/navigation";
import Action from "@/components/Action";
import ModalComponent from "@/components/ModalComponent";
import { getProduct } from "@/store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, ProductsState } from "@/types/statesTypes";

function Product() {
   // element count in the page
   const perPage = 3;
   const [dataTabel, setDataTabel] = useState([]);
   const [openEdit, setOpenEdit] = useState(false);
   const [activePage, setActivePage] = useState(1);
   const [serviceId, setServiceId] = useState();
   const dispatch: any = useDispatch();
   const { isLoading, error, products, count }: ProductsState = useSelector(
      (state: GlobalState) => state.products
   );
   // get the current product name bsaed on pathname
   const product: any = usePathname().split("/website1/categories/")[1];
   useEffect(() => {
      dispatch(getProduct({ product, perPage, activePage }));
   }, [dispatch, product, activePage]);

   const handleEditService = (id: any) => {
      setServiceId(id);
      handleOpen();
   };

   useEffect(() => {
      if (Array.isArray(products)) {
         if (products.length > 0) {
            const data: any = products.map((product) => {
               return {
                  ID: product.code,
                  ["Service Type"]: product.service
                     ? product.service.name
                     : product.serviceType,
                  Count: product.count,
                  Duration: product.period_in_days + " days",
                  Accounts: "Real",
                  Price: product.price,
                  Action: product.status === 1,
                  serviceId: product.id,
               };
            });
            setDataTabel(data);
         }
      }
   }, [products]);
   const handleOpen = () => setOpenEdit(true);

   const columns = [
      { name: "ID", selector: (row: any) => row.ID },
      { name: "Service Type", selector: (row: any) => row["Service Type"] },
      { name: "Count", selector: (row: any) => row.Count },
      { name: "Duration", selector: (row: any) => row.Duration },
      {
         name: "Accounts",
         selector: (row: any) => row.Accounts,
         cell: (row: any) => (
            <div
               style={{
                  color: row.Accounts === "Real" ? "#0a7a0e" : "red",
               }}
            >
               {row.Accounts}
            </div>
         ),
      },
      { name: "Price", selector: (row: any) => row.Price + " $" },
      {
         name: "Action",
         selector: (row: any) => (
            <Action
               actionChecked={row.Action}
               serviceId={row.serviceId}
               clicked={() => handleEditService(row.serviceId)}
            />
         ),
      },
   ];

   const customStyles = {
      rows: {
         style: {
            backgroundColor: "#E8EFF9",
            color: "#18073B",
         },
      },
      cells: {
         style: {
            justifyContent: "center",
            padding: "0px 5px",
            fontWeight: "lighter",
            color: "#908CA5",
            fontSize: "16px",
            minWidth: "fit-content",
         },
      },
      headCells: {
         style: {
            fontSize: "16px",
            backgroundColor: "#E8EFF9",
            color: "#18073B",
            fontWeight: "bold",
            width: "fitContent",
            justifyContent: "center",
         },
      },
   };

   return (
      <Fragment>
         {!error && (
            <DataTable
               columns={columns}
               data={dataTabel}
               customStyles={customStyles}
               progressPending={isLoading}
               progressComponent={<Loader size="lg" />}
               className="mt-[20px] pb-[100px] [&>_div_div]:!bg-transparent  capitalize"
            />
         )}

         {
            //handling Error
            error && (
               <div className="h-[100px] flex items-center justify-center text-red-500">
                  {error}
               </div>
            )
         }

         <ModalComponent
            open={openEdit}
            setOpen={setOpenEdit}
            requestType="Edit Service"
            serviceId={serviceId}
         />
         <Pagination
            prev
            next
            size="sm"
            total={count}
            limit={perPage}
            maxButtons={5}
            activePage={activePage}
            onChangePage={setActivePage}
            className="absolute bottom-12 left-[50%] translate-x-[-50%] w-max 
               [&>div_.rs-pagination-btn]:!bg-white
               [&>div_.rs-pagination-btn]:!text-primary1
               [&>div_.rs-pagination-btn]:!mx-[5px]
               [&>div_.rs-pagination-btn]:!rounded-[50%]
               [&>div_.rs-pagination-btn]:!border-none
               [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!bg-gradient1
               [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!text-white
               "
         />
      </Fragment>
   );
}

export default Product;
