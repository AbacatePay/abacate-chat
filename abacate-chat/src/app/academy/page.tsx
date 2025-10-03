import { ArrowRightIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import SearchAcademy from "../components/search-academy";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function Page() {
  return (
    <>
      <div className="w-full h-screen justify-center items-center bg-gray-light">
        <div className="w-full flex justify-between items-center h-20 px-8">
          <div className="w-full flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#8A8AA3"
              viewBox="0 0 256 256"
            >
              <path d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120ZM128,87.57,57.3,64,128,40.43,198.7,64Z"></path>
            </svg>
            <p className="text-[16px] font-semibold">Abacademy</p>
          </div>
          <Button
            variant="outline"
            className="border-gray-border text-gray-text shadow-none font-bold bg-[#F7F7F8] cursor-pointer"
          >
            <p className="text-[16px] font-semibold">Ir pra plataforma</p>
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="px-6 w-full">
          <div className="bg-white w-full h-screen flex flex-col rounded-2xl p-6 gap-4">
            <SearchAcademy />
            <Tabs defaultValue="account" className="w-[400px] ">
              <TabsList className="bg-[#F5F6F8] rounded-lg border-1 border-[#E2E7F1] shadow-none gap-2">
                <TabsTrigger
                  className="text-[#6A7085] font-semibold data-[state=active]:bg-white data-[state=active]:border-1 data-[state=active]:border-[#E2E7F1] data-[state=active]:text-[#0A1B39] shadow-none"
                  value="account"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger
                  className="text-[#6A7085] font-semibold data-[state=active]:bg-white data-[state=active]:border-1 data-[state=active]:border-[#E2E7F1] data-[state=active]:text-[#0A1B39] shadow-none"
                  value="password"
                >
                  Password
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
