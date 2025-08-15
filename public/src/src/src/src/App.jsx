import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function App() {
  const [deals, setDeals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/deals")
      .then((res) => res.json())
      .then((data) => setDeals(data))
      .catch(() => {
        // fallback demo data
        setDeals([
          {
            title: "Auckland Golf Club - 18 Holes",
            price: "$49",
            location: "Auckland",
            url: "https://www.example.com",
          },
          {
            title: "Christchurch Links Special",
            price: "$35",
            location: "Christchurch",
            url: "https://www.example.com",
          },
          {
            title: "Queenstown Lakes Golf Offer",
            price: "$59",
            location: "Queenstown",
            url: "https://www.example.com",
          },
        ]);
      });
  }, []);

  const filteredDeals = deals.filter(
    (deal) =>
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-green-800 mb-6 text-center"
      >
        Golf Deals NZ
      </motion.h1>

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by location or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredDeals.map((deal, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-green-700">
                {deal.title}
              </h2>
              <p className="text-gray-500">{deal.location}</p>
              <p className="text-xl font-bold mt-2">{deal.price}</p>
            </div>
            <a
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center"
            >
              View Deal
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
