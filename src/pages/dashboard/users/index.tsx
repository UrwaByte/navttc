import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Edit, Trash, Plus } from "lucide-react";

interface IUser {
  id: string;
  fullname: string;
  email: string;
  email_verified: boolean;
  isVerified: boolean;
  role: string;
  isActive: boolean;
  created: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  // Fake data (replace with API when needed)
  useEffect(() => {
    const fakeData = [
      {
        id: "1",
        fullname: "Amna",
        email: "amna@example.com",
        email_verified: true,
        isVerified: true,
        role: "admin",
        isActive: true,
        created: "2025-01-10",
      },
      {
        id: "2",
        fullname: "Urwa",
        email: "urwa@example.com",
        email_verified: false,
        isVerified: false,
        role: "user",
        isActive: true,
        created: "2025-01-11",
      },
      {
        id: "3",
        fullname: "Hina Khan",
        email: "hina@example.com",
        email_verified: true,
        isVerified: true,
        role: "user",
        isActive: false,
        created: "2025-01-09",
      },
      {
        id: "4",
        fullname: "John Doe",
        email: "john@example.com",
        email_verified: false,
        isVerified: false,
        role: "moderator",
        isActive: true,
        created: "2025-01-08",
      },
      {
        id: "5",
        fullname: "Sara Ahmed",
        email: "sara@example.com",
        email_verified: true,
        isVerified: true,
        role: "user",
        isActive: true,
        created: "2025-01-06",
      },
      {
        id: "6",
        fullname: "M Ali",
        email: "mali@example.com",
        email_verified: true,
        isVerified: false,
        role: "user",
        isActive: true,
        created: "2025-01-03",
      },
    ];

    setUsers(fakeData);
  }, []);

  // Search filter
  const filteredUsers = users.filter((u) =>
    u.fullname.toLowerCase().includes(search.toLowerCase()) ||
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
                  <th className="p-3">ID</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Email Verified</th>
                  <th className="p-3">Verified</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Active</th>
                  <th className="p-3">Created</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.id}</td>
                    <td className="p-3">{u.fullname}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      {u.email_verified ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-red-600 font-medium">No</span>
                      )}
                    </td>
                    <td className="p-3">
                      {u.isVerified ? (
                        <span className="text-green-600 font-medium">Verified</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Pending</span>
                      )}
                    </td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">
                      {u.isActive ? (
                        <span className="text-green-500">Active</span>
                      ) : (
                        <span className="text-gray-500">Inactive</span>
                      )}
                    </td>
                    <td className="p-3">{u.created}</td>

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
