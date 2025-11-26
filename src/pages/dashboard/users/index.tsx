import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, time } from "framer-motion";
import { ChevronLeft, ChevronRight, Edit, Trash, Plus } from "lucide-react";

interface IUser {
  _id: string,
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "moderator";
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  // Fake data (replace with API when needed)

  useEffect(() => {
    // call api

  }, []);

  // Search filter
  const filteredUsers = users.filter((u) =>

    u.firstName.toLowerCase().includes(search.toLowerCase()) ||
    u.lastName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())

  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedData = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const nextPage = () => page < totalPages && setPage(page + 1);
  const prevPage = () => page > 1 && setPage(page - 1);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Users</h1>
        <Button className="rounded-2xl flex gap-2 px-4 py-2">
          <Plus size={18} /> Add User
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          {/* Search */}
          <div className="mb-4 flex justify-between items-center">
            <Input
              placeholder="Search users..."
              className="max-w-xs rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">_ID</th>
                  <th className="p-3">First_Name</th>
                  <th className="p-3">Last_Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Verified</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">isActive</th>
                  <th className="p-3">createdAt</th>
                  <th className="p-3">updatedAt</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-3">{u._id}</td>
                    <td className="p-3">{u.firstName}</td>
                    <td className="p-3">{u.lastName}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      {u.emailVerified ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-red-600 font-medium">No</span>
                      )}
                    </td>

                    <td className="p-3">
                      {u.role
                        ? <span>user</span>
                        : u.role
                          ? <span>admin</span>
                          : <span>moderator</span>
                      }</td>


                    <td className="p-3">
                      {u.isActive ? (
                        <span className="text-green-500">active</span>
                      ) : (
                        <span className="text-gray-500">inactive</span>
                      )}
                    </td>
                    <td className="p-3">{u.createdAt}</td>
                    <td className="p-3">{u.updatedAt}</td>


                    <td className="p-3 flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="rounded-xl"
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={page === 1}
              className="rounded-xl flex items-center gap-2"
            >
              <ChevronLeft size={18} /> Prev
            </Button>

            <span className="font-medium">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              onClick={nextPage}
              disabled={page === totalPages}
              className="rounded-xl flex items-center gap-2"
            >
              Next <ChevronRight size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
