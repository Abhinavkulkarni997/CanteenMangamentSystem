// import { useState } from "react";
// import { useUserSearch } from "../../hooks/useUserSearch";

// interface Props {
//   onSelect: (userId: number) => void;
// }

// const UserSearch = ({ onSelect }: Props) => {
//   const [search, setSearch] = useState("");
//   const [selectedUser, setSelectedUser] = useState<any>(null);

//   const { data, isLoading } = useUserSearch(search);

//   return (
//     <div className="rounded-lg bg-white p-6 shadow">
//       <h2 className="mb-4 text-xl font-semibold">Search Employee</h2>
//       <div className="relative">
//          <input
//         className="w-full rounded border px-4 py-3"
//         placeholder="Search by Name / Employee ID / Mobile"
//         value={search}
//         onChange={(e)=>{

//     setSearch(e.target.value);

//     setSelectedUser(null);

// }}
//       />

//        <div className="absolute z-50 mt-2 w-full rounded-lg border bg-white shadow-lg max-h-72 overflow-y-auto">
//          {isLoading && <p className="mt-4 text-sm text-gray-500">Searching...</p>}

//       {!selectedUser && data?.length > 0 && (
//       <div className="mt-4 space-y-2">
//         {data?.map((user: any) => (
//           <div
//             key={user.id}
//             onClick={() => {
//               setSelectedUser(user);
//               setSearch(user.name);
//               onSelect(user.id);
//             }}
//             className="cursor-pointer rounded border p-4 hover:bg-gray-50"
//           >
//             <div className="flex justify-between">
//              <div className="flex items-center gap-3">

//     <img
//         src={
//             user.photoUrl
//                 ? `${import.meta.env.VITE_API_URL}${user.photoUrl}`
//                 : "/avatar.png"
//         }
//         className="h-10 w-10 rounded-full object-cover"
//         alt={user.name}
//     />

//     <div>

//         <h3 className="font-semibold">
//             {user.name}
//         </h3>
//         <div className="flex gap-2 mt-1">

//     <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
//         {user.role}
//     </span>

//     <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
//         {user.userType}
//     </span>

// </div>

//         <p className="text-sm text-gray-500">
//             {user.mobile}
//         </p>

//     </div>

// </div>

//               <div className="text-sm text-gray-500">{user.employeeId}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       )}
//        </div>

//       </div>
     

     
//     </div>
//   );
// };

// export default UserSearch;
import { useState } from "react";
import { useUserSearch } from "../../hooks/useUserSearch";
// import { SearchUser } from "../../types/user";

interface Props {
  onSelect: (userId: number) => void;
//   searchUser:SearchUser
}

interface SearchUser {
  id: number;
  name: string;
  employeeId?: string | null;
  projectStaffId?: string | null;
  mobile: string;
  photoUrl: string | null;
  role: string;
  userType: string;
}

const UserSearch = ({ onSelect }: Props) => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<SearchUser | null>(null);

  const { data = [], isLoading } = useUserSearch(search);

  const showDropdown =
    !selectedUser && search.trim().length >= 2;

  const handleSelect = (user: SearchUser) => {
    setSelectedUser(user);
    setSearch(user.name);
    onSelect(user.id);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Search Employee
      </h2>

      <div className="relative">

        <input
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Search by Name / Employee ID / Project Staff ID / Mobile"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedUser(null);
          }}
        />

        {showDropdown && (
          <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">

            {isLoading && (
              <div className="p-4 text-center text-sm text-gray-500">
                Searching...
              </div>
            )}

            {!isLoading && data.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                No users found
              </div>
            )}

            {!isLoading &&
              data.map((user: SearchUser) => (
                <div
                  key={user.id}
                  onClick={() => handleSelect(user)}
                  className="cursor-pointer border-b p-4 transition hover:bg-gray-50 last:border-b-0"
                >
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <img
                        src={
                          user.photoUrl
                            ? `${import.meta.env.VITE_SERVER_URL}${user.photoUrl}`
                            : "/avatar.png"
                        }
                        alt={user.name}
                        className="h-11 w-11 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="font-semibold">
                          {user.name}
                        </h3>

                        <div className="mt-1 flex gap-2">

                          <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                            {user.role}
                          </span>

                          <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            {user.userType}
                          </span>

                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                          {user.mobile}
                        </p>

                      </div>

                    </div>

                    <div className="text-sm font-medium text-gray-500">
                        {user.employeeId ||
   user.projectStaffId ||
   "-"}
                    </div>

                  </div>
                </div>
              ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;