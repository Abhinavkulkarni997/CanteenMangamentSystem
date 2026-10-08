import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../services/user";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";

import { Button } from "../../components/ui/button";
import DataTable from "../../components/common/DataTable";
import { columns } from "./user.columns";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/common/Pagination";

export default function Users() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery({
    queryKey: ["users", debouncedSearch, page],
    queryFn: () =>
      getUsers({
        page,
        search: debouncedSearch,
      }),
  });

  // console.log(data?.data);

  return (
    <div className="p-6">
      <PageHeader
        title="Users"
        description="Manage all canteen users"
        action={
          <Button onClick={() => navigate("/users/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        }
      />

      <div className="mb-6">
        <SearchInput value={search} onChange={setSearch}
         placeholder="Search by Name, Employee ID, Project Staff ID or Mobile" />
      </div>

      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <DataTable columns={columns} data={data?.data.data.users ?? []} />
      )}
      
     <Pagination
  page={page}
  total={data?.data.data.total ?? 0}
  totalPages={data?.data.data.totalPages ?? 1}
  onPageChange={setPage}
/>
    </div>
  );
}
