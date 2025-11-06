import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    label: "",
    full_name: "",
    mobile_number: "",
    address_line_1: "",
    address_line_2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    is_default: false,
  });
  const [editingAddress, setEditingAddress] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/addresses/${userId}`
      );
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        await axios.put(
          `http://localhost:5000/api/addresses/${editingAddress.id}`,
          {
            ...formData,
            user_id: userId,
          }
        );
      } else {
        await axios.post("http://localhost:5000/api/addresses", {
          ...formData,
          user_id: userId,
        });
      }

      setFormData({
        label: "",
        full_name: "",
        mobile_number: "",
        address_line_1: "",
        address_line_2: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        is_default: false,
      });
      setEditingAddress(null);
      fetchAddresses();
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`);
      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  const handleSetDefault = async (id) => {
    const address = addresses.find((a) => a.id === id);
    await axios.put(`http://localhost:5000/api/addresses/${id}`, {
      ...address,
      user_id: userId,
      is_default: true,
    });
    fetchAddresses();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Addresses</h1>

        {/* Address Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          <input
            type="text"
            placeholder="Label (Home, Work, etc)"
            value={formData.label}
            onChange={(e) =>
              setFormData({ ...formData, label: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Full Name (First and Last)"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={(e) =>
              setFormData({ ...formData, mobile_number: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Flat / House / Building / Apartment"
            value={formData.address_line_1}
            onChange={(e) =>
              setFormData({ ...formData, address_line_1: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Area / Street / Sector / Village"
            value={formData.address_line_2}
            onChange={(e) =>
              setFormData({ ...formData, address_line_2: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={(e) =>
              setFormData({ ...formData, landmark: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="City / Town"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <select
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            className="border p-2 rounded"
            required
          >
            <option value="">Select State</option>
            {indianStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_default}
              onChange={(e) =>
                setFormData({ ...formData, is_default: e.target.checked })
              }
            />
            <label>Set as Default</label>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-medium"
          >
            {editingAddress ? "Update Address" : "Add Address"}
          </button>
        </form>

        {/* Address List */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 border rounded-lg flex justify-between items-start ${
                address.is_default ? "border-yellow-500" : "border-gray-300"
              }`}
            >
              <div>
                <p className="font-semibold">
                  {address.label}{" "}
                  {address.is_default && (
                    <span className="text-yellow-500 text-sm">(Default)</span>
                  )}
                </p>
                <p>{address.full_name}</p>
                <p>{address.mobile_number}</p>
                <p>{address.address_line_1}</p>
                <p>{address.address_line_2}</p>
                <p>{address.landmark}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.pincode}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
                {!address.is_default && (
                  <button
                    onClick={() => handleSetDefault(address)}
                    className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                  >
                    <FaStar /> Set Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
