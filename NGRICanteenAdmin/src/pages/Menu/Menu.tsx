import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { useMenu } from "../../hooks/useMenu";
import MenuCard from "../../components/menu/MenuCard";
import AddMenuDialog from "../../components/menu/AddMenuDialog";
import DeleteMenuDialog from "../../components/menu/DeleteMenuDialog";
import {Input} from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import {Search} from "lucide-react";
import EmptyState from "../../components/common/EmptyState";
import MenuSkeleton from "./MenuSkeleton";
import { toast } from "react-hot-toast";
import * as menuService from "../../services/menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import MenuHistory from "./MenuHistory";
import type { MenuItem } from "../../types/menu";

const Menu = () => {
  const { menu, loading, refresh } = useMenu();
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [search, setSearch] = useState("");

 const filteredMenu = menu.filter(item =>
  item.itemName
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  item.sessionType
        .toLowerCase()
        .includes(search.toLowerCase())
);

const lunch = filteredMenu.filter(
  x => x.sessionType === "LUNCH"
);

const dinner = filteredMenu.filter(
  x => x.sessionType === "DINNER"
);

  if (loading) {
    return <div><MenuSkeleton /></div>;
  }
  const handleToggleAvailability = async (item: MenuItem) => {

    try {

        await menuService.updateAvailability(

            item.id,

            !item.isAvailable

        );

        toast.success(

            item.isAvailable

                ? "Menu Item Disabled"

                : "Menu Item Enabled"

        );

        refresh();

    }

    catch(error:any){

        toast.error(

            error.response?.data?.message ??

            "Failed to update availability"

        );

    }

};
//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Menu Management</h1>
          

//           <p className="text-gray-500">Manage today's canteen menu</p>
//         </div>
       
//         <Button
//           onClick={() => {
//             setSelectedMenu(null);
//             setOpen(true);
//           }}
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Add Menu Item
//         </Button>
//       </div>

//       {/* Start OF Menu Stats */}
//       <div className="grid grid-cols-3 gap-6 mb-8">

//     <Card>

//         <CardContent className="p-6">

//             <p className="text-slate-500">

//                 Lunch Items

//             </p>

//             <h2 className="text-3xl font-bold">

//                 {lunch.length}

//             </h2>

//         </CardContent>

//     </Card>

//     <Card>

//         <CardContent className="p-6">

//             <p>Dinner Items</p>

//             <h2 className="text-3xl font-bold">

//                 {dinner.length}

//             </h2>

//         </CardContent>

//     </Card>

//     <Card>

//         <CardContent className="p-6">

//             <p>Total Items</p>

//             <h2 className="text-3xl font-bold">

//                 {menu.length}

//             </h2>

//         </CardContent>

//     </Card>

// </div>
// {/* End of Menu Stats */}
//  {/* Search Bar */}
//         <div className="relative mb-4">
//              <Search
//         className="absolute left-3 top-2 text-slate-400"
//         size={18}
//     />
//     <Input
//         placeholder="Search menu items..."
//         className="pl-10 w-96 border-2 border-slate-400 rounded-md focus:outline-none focus:ring-2"
//         onChange={(e)=>setSearch(e.target.value)}
//     />

// </div>
// {/* End of Search Bar */}
//       <section>
//         <h2 className="text-xl font-semibold mb-4">Lunch</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {lunch.length === 0 ? (
//             <EmptyState title="No Lunch Menu Available" 
//             description="There are currently no lunch menu items available. Click 'Add Item' to create today's lunch menu.."/>
           
        
//           ) : (
//             lunch.map((item) => (
//               <MenuCard
//                 key={item.id}
//                 item={item}
//                 onEdit={(item) => {
//                   setSelectedMenu(item);
//                   setOpen(true);
//                 }}
//                 onDelete={(item) => {
//                   setSelectedMenu(item);

//                   setDeleteOpen(true);
//                 }}
//                onToggleAvailability={handleToggleAvailability}
//               />
//             ))
//           )}
//         </div>
//       </section>
//       <section>
//         <h2 className="text-xl font-semibold mb-4">Dinner</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {dinner.length === 0 ? (
//             <div className="text-center py-16 text-gray-500">
//               No Dinner Menu Available
//             </div>
//           ) : (
//             dinner.map((item) => (
//               <MenuCard
//                 key={item.id}
//                 item={item}
//                 onEdit={(item) => {
//                   setSelectedMenu(item);
//                   setOpen(true);
//                 }}
//                 onDelete={(item) => {
//                   setSelectedMenu(item);

//                   setDeleteOpen(true);
//                 }}
//                onToggleAvailability={handleToggleAvailability}
//               />
//             ))
//           )}
//         </div>
//       </section>
//       <AddMenuDialog
//         open={open}
//         onOpenChange={setOpen}
//         onSuccess={refresh}
//         menu={selectedMenu}
//       />
//       <DeleteMenuDialog
//         open={deleteOpen}
//         onOpenChange={setDeleteOpen}
//         menu={selectedMenu}
//         onSuccess={refresh}
//       />
//     </div>
//   );

return (
  <Tabs defaultValue="today" className="space-y-6">

    <TabsList>
      <TabsTrigger value="today">
        Today's Menu
      </TabsTrigger>

      <TabsTrigger value="history">
        History
      </TabsTrigger>
    </TabsList>

    {/* ---------------- TODAY MENU ---------------- */}

    <TabsContent value="today">

      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Menu Management
            </h1>

            <p className="text-gray-500">
              Manage today's canteen menu
            </p>
          </div>

          <Button
            onClick={() => {
              setSelectedMenu(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Menu Item
          </Button>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-6 mb-8">

          <Card>
            <CardContent className="p-6">
              <p className="text-slate-500">
                Lunch Items
              </p>

              <h2 className="text-3xl font-bold">
                {lunch.length}
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p>Dinner Items</p>

              <h2 className="text-3xl font-bold">
                {dinner.length}
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p>Total Items</p>

              <h2 className="text-3xl font-bold">
                {menu.length}
              </h2>
            </CardContent>
          </Card>

        </div>

        {/* Search */}

        <div className="relative mb-4">

          <Search
            className="absolute left-3 top-2 text-slate-400"
            size={18}
          />

          <Input
            placeholder="Search menu items..."
            className="pl-10 w-96 border-2 border-slate-400 rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Lunch */}

        <section>

          <h2 className="text-xl font-semibold mb-4">
            Lunch
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {lunch.length === 0 ? (

              <EmptyState
                title="No Lunch Menu Available"
                description="There are currently no lunch menu items available."
              />

            ) : (

              lunch.map((item) => (

                <MenuCard
                  key={item.id}
                  item={item}
                  onEdit={(item) => {
                    setSelectedMenu(item);
                    setOpen(true);
                  }}
                  onDelete={(item) => {
                    setSelectedMenu(item);
                    setDeleteOpen(true);
                  }}
                  onToggleAvailability={handleToggleAvailability}
                />

              ))

            )}

          </div>

        </section>

        {/* Dinner */}

        <section>

          <h2 className="text-xl font-semibold mb-4">
            Dinner
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {dinner.length === 0 ? (

              <div className="text-center py-16 text-gray-500">
                No Dinner Menu Available
              </div>

            ) : (

              dinner.map((item) => (

                <MenuCard
                  key={item.id}
                  item={item}
                  onEdit={(item) => {
                    setSelectedMenu(item);
                    setOpen(true);
                  }}
                  onDelete={(item) => {
                    setSelectedMenu(item);
                    setDeleteOpen(true);
                  }}
                  onToggleAvailability={handleToggleAvailability}
                />

              ))

            )}

          </div>

        </section>

        <AddMenuDialog
          open={open}
          onOpenChange={setOpen}
          onSuccess={refresh}
          menu={selectedMenu}
        />

        <DeleteMenuDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          menu={selectedMenu}
          onSuccess={refresh}
        />

      </div>

    </TabsContent>

    {/* ---------------- HISTORY ---------------- */}

    <TabsContent value="history">

      <MenuHistory />

    </TabsContent>

  </Tabs>
);


};

export default Menu;
