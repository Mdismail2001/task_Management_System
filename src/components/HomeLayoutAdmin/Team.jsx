import React from "react";
import { Plus, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "online",
    email: "sarah@example.com",
    phone: "+60 123 456 789",
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "offline",
    email: "michael@example.com",
    phone: "+60 987 654 321",
  },
  {
    id: 3,
    name: "Aisha Karim",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    status: "online",
    email: "aisha@example.com",
    phone: "+60 111 223 344",
  },
  {
    id: 4,
    name: "Daniel Wong",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    status: "offline",
    email: "daniel@example.com",
    phone: "+60 222 333 444",
  },
  {
    id: 5,
    name: "Emily Tan",
    role: "QA Engineer",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    status: "online",
    email: "emily@example.com",
    phone: "+60 555 666 777",
  },
  {
    id: 6,
    name: "Rajesh Kumar",
    role: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    status: "offline",
    email: "rajesh@example.com",
    phone: "+60 777 888 999",
  },
  {
    id: 7,
    name: "Jessica Lim",
    role: "Content Strategist",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    status: "online",
    email: "jessica@example.com",
    phone: "+60 333 222 111",
  },
  {
    id: 8,
    name: "Adam Smith",
    role: "Product Owner",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    status: "online",
    email: "adam@example.com",
    phone: "+60 999 111 222",
  },
];

const Team = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen  p-2 bg-[#f5f7fc]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Our Team</h1>
        <button onClick={()=> navigate("/auth/register")} className="flex items-center gap-2 bg-[#3755db] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          <Plus size={18} /> Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div className="relative flex flex-col items-center">
              {/* Avatar */}
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />

              {/* Status indicator */}
              <span
                className={`absolute top-2 right-10 w-4 h-4 rounded-full border-2 border-white ${
                  member.status === "online" ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>

              {/* Info */}
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                {member.name}
              </h2>
              <p className="text-sm text-gray-500">{member.role}</p>

              {/* Contact */}
              <div className="flex items-center gap-3 mt-4 text-gray-500 text-sm">
                <a
                  href={`mailto:${member.email}`}
                  className="hover:text-blue-600 transition"
                >
                  <Mail size={18} />
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="hover:text-blue-600 transition"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
