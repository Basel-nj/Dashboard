"use client";
import { Ref, forwardRef, useEffect, useState } from "react";
import SVGLogo from "@/components/SVGLogo";
import { Sidenav, Nav, ButtonToolbar, Button, Loader } from "rsuite";
import GlobalIcon from "@rsuite/icons/Global"; // website icon
import HomeIcon from "@rsuite/icons/legacy/Home"; // home icon
import TaskIcon from "@rsuite/icons/Task"; // task icon
import ExitIcon from "@rsuite/icons/Exit"; // logout icons
import Link from "next/link";
import { logout } from "@/store/authSlice";
import ModalComponent from "@/components/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { GlobalState } from "@/types/statesTypes";
import { getAllCategories } from "@/store/categoriesSlice";

interface NavLinkProps {
   as: string;
   href: string;
}

const NavLink = forwardRef(
   (props: NavLinkProps, ref: Ref<HTMLAnchorElement>) => {
      const { as, href, ...rest } = props;
      return <Link href={href} as={as} ref={ref} {...rest} />;
   }
);

NavLink.displayName = "NavLink";

export default function DashBoardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [expanded, setExpanded] = useState(true);
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const { isLoggedIn } = useSelector((state: GlobalState) => state.auth);
   const dispatch: any = useDispatch();
   const router = useRouter();
   const pathname = usePathname();

   // expended and unexpended sidebar
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 786) {
            setExpanded(false);
         } else {
            setExpanded(true);
         }
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   useEffect(() => {
      if (!isLoggedIn) {
         router.push("/");
      }
   }, [isLoggedIn, router]);

   useEffect(() => {
      dispatch(getAllCategories());
   }, [dispatch]);

   const { isLoading, error, categories } = useSelector(
      (state: GlobalState) => state.categories
   );

   return (
      <section className="grid grid-cols-[auto_1fr] min-h-screen relative">
         <aside
            className={`bg-white ${
               expanded ? "w-[220px]" : "w-fit"
            } transition-all duration-[1s] h-full md:static`}
         >
            <SVGLogo
               color="#341d6f"
               className={`max-w-[130px] mx-auto mt-2 hidden md:block ${
                  expanded ? "!block" : "!hidden"
               } transition-all duration-500 `}
            />{" "}
            <Sidenav
               className="!bg-white !mt-[30px] transition-all duration-500"
               expanded={expanded}
            >
               <Sidenav.Body>
                  <Nav activeKey="1">
                     <Nav.Item
                        eventKey="1"
                        icon={<HomeIcon style={{ top: "6px" }} />}
                        className="!bg-white !text-[#18073B] !py-[5px] !text-[14px]"
                        as={NavLink}
                        href="/"
                     >
                        Home
                     </Nav.Item>
                     <Nav.Menu
                        eventKey="2"
                        title="Website 1"
                        icon={<GlobalIcon />}
                        className="!bg-white !text-[#18073B] [&>*]:!bg-[white] [&>*]:!text-[14px]"
                     >
                        <Nav.Menu
                           eventKey="2-1"
                           title="Service Request"
                           icon={<TaskIcon />}
                        >
                           <Nav.Item
                              eventKey="2-1-1"
                              icon={<TaskIcon className="mr-[20px]" />}
                              className=" !bg-white"
                           >
                              Requested
                           </Nav.Item>
                           <Nav.Item
                              eventKey="2-1-2"
                              icon={<TaskIcon />}
                              className="!py-[5px]"
                           >
                              Accepted
                           </Nav.Item>
                           <Nav.Item
                              eventKey="2-1-3"
                              icon={<TaskIcon />}
                              className="!py-[5px]"
                           >
                              Declined
                           </Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu
                           eventKey="2-2"
                           title="Categories"
                           icon={<TaskIcon />}
                        >
                           {isLoading && (
                              <Nav.Item className="!flex justify-center items-center">
                                 {" "}
                                 <Loader size="md" />
                              </Nav.Item>
                           )}
                           {Array.isArray(categories) &&
                              categories.length > 0 &&
                              categories.map((category) => {
                                 return (
                                    <Nav.Item
                                       key={category.id}
                                       eventKey={`2-2-${category.id}`}
                                       icon={<TaskIcon />}
                                       className={`!py-[5px] capitalize ${
                                          pathname.split(
                                             "/website1/categories/"
                                          )[1] ===
                                             category.name.toLocaleLowerCase() &&
                                          "!text-[#420075] !font-bold"
                                       }`}
                                       as={NavLink}
                                       href={`${category.name.toLocaleLowerCase()}`}
                                    >
                                       {category.name}
                                    </Nav.Item>
                                 );
                              })}
                        </Nav.Menu>
                        <Nav.Item
                           eventKey="2-3"
                           icon={<TaskIcon />}
                           className="!py-[5px]"
                        >
                           Users
                        </Nav.Item>
                     </Nav.Menu>
                     <Nav.Menu
                        eventKey="3"
                        title="Website 2"
                        icon={<GlobalIcon />}
                        className="[&>*]:!bg-[white] [&>*]:!text-[14px]"
                     >
                        <Nav.Menu
                           eventKey="3-1"
                           title="Tasks"
                           icon={<TaskIcon />}
                           className="[&>*]:!bg-[white] [&>*]:!text-[14px]"
                        >
                           <Nav.Item
                              eventKey="3-1-1"
                              icon={<TaskIcon className="mr-[20px]" />}
                              className="!py-[5px]"
                           >
                              Admin Task
                           </Nav.Item>
                           <Nav.Item
                              eventKey="3-1-2"
                              icon={<TaskIcon />}
                              className="!py-[5px]"
                           >
                              User Task
                           </Nav.Item>
                        </Nav.Menu>
                        <Nav.Item
                           eventKey="3-2"
                           icon={<TaskIcon className="mr-[20px]" />}
                           className="!py-[5px]"
                        >
                           Coins history
                        </Nav.Item>
                        <Nav.Item
                           eventKey="3-3"
                           icon={<TaskIcon className="mr-[20px]" />}
                           className="!py-[5px]"
                        >
                           Users
                        </Nav.Item>
                     </Nav.Menu>
                     <Nav.Item
                        eventKey="4"
                        className="!bg-white !text-[#18073B] !py-[5px] !text-[14px]"
                        icon={<ExitIcon style={{ top: "6px" }} />}
                        onClick={() => dispatch(logout())}
                        as={NavLink}
                        href="/"
                     >
                        Log out
                     </Nav.Item>
                  </Nav>
               </Sidenav.Body>
               <Sidenav.Toggle
                  expanded={expanded}
                  onToggle={(expanded) => setExpanded(expanded)}
                  className="!bg-white !text-[#18073B] !border-none [&>*]:!bg-white"
               />
            </Sidenav>
         </aside>
         <main className="bg-shades2 px-[20px] overflow-x-auto w-auto relative">
            <header className="pl-2 py-4 pr-7 flex justify-between items-center flex-wrap w-full mb-2">
               <div className="mt-[7px] sm:mt-0 capitalize">
                  {pathname.replaceAll("/", " > ").substring(3)}
               </div>
               <ButtonToolbar>
                  <Button
                     onClick={handleOpen}
                     className="!text-primary2 mt-[7px] sm:m-0 hover:!bg-transparent !bg-transparent hover:!text-primary2 hover:!font-bold transition-all duration-300"
                  >
                     {" "}
                     + Add Service
                  </Button>
               </ButtonToolbar>
               <ModalComponent
                  open={open}
                  setOpen={setOpen}
                  requestType="Add Service"
               />
            </header>
            {children}
         </main>
      </section>
   );
}
