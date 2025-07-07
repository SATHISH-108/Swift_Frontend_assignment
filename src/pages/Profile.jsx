import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState(null);
  const getUsersData = async () => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);
  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-2xl font-bold mb-6 flex items-center gap-x-2">
          <Link to="/">
            <MdOutlineKeyboardBackspace />
          </Link>

          <p>Welcome, {user.name}</p>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-200 text-xl font-bold">
            {user.name[0]}
          </div>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">User ID</p>
            <p className="text-base px-4 py-2 bg-gray-100 rounded-sm">
              {user.id}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="text-base px-4 py-2 bg-gray-100 rounded-sm">
              {user.name}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-base px-4 py-2 bg-gray-100 rounded-sm">
              {user.email}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Address</p>
            <p className="text-base px-4 py-2 bg-gray-100 rounded-sm">
              {user.address.street}, {user.address.city}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="text-base px-4 py-2 bg-gray-100 rounded-sm">
              {user.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
