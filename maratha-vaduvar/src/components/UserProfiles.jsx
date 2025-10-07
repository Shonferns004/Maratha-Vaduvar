import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firbase";
import { useAuth } from "../context/AuthContext"; // make sure this exists

const PAGE_SIZE = 5;

const UserProfiles = () => {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // get logged-in user

  const fetchUsers = async () => {
    setLoading(true);
    const q = query(collection(db, "users"), orderBy("name"));
    const snapshot = await getDocs(q);
    let fetchedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Exclude the logged-in user
    if (currentUser) {
      fetchedUsers = fetchedUsers.filter(user => user.uid !== currentUser.uid);
    }

    // Pagination
    const paginated = [];
    for (let i = 0; i < fetchedUsers.length; i += PAGE_SIZE) {
      paginated.push(fetchedUsers.slice(i, i + PAGE_SIZE));
    }

    setPages(paginated);
    setUsers(paginated[0] || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]); // refetch when currentUser is available

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    setUsers(pages[pageNum - 1]);
  };

  return (
    <div id="user" className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profiles</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {users.map(user => (
              <div
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="rounded-2xl border shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-200"
              >
                <div className="w-full h-48 bg-gray-200">
                  <img
                    src={user.profileImage || "https://via.placeholder.com/300x200"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between px-4 py-2 bg-gray-100 dark:bg-gray-50">
                  <span className="font-medium">{user.name}</span>
                  <span className="font-medium">{user.age} yrs</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-1 mt-6 dark:text-gray-800">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 disabled:opacity-50"
            >
              &lt;
            </button>

            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 ${
                  currentPage === index + 1
                    ? "dark:text-violet-600 dark:border-violet-600 font-semibold"
                    : "dark:border-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pages.length}
              className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfiles;
