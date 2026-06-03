import React from 'react';
import { Layers, Clock, CheckCircle, Truck, ShoppingBag } from "lucide-react";

const StatusCard = ({ label, count, color, icon, active, onClick }) => (
  <div onClick={onClick} className={`bg-white border rounded-3xl p-4 shadow-sm transition-all cursor-pointer hover:-translate-y-1 ${active ? 'border-[#163D68] ring-2 ring-blue-50' : 'border-slate-100'}`}>
    <div className="flex items-center justify-between mb-3">
      <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${color}15`, color: color }}>{icon}</div>
      <div className={`w-1.5 h-1.5 rounded-full ${active ? 'animate-pulse' : ''}`} style={{ backgroundColor: color }}></div>
    </div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <h3 className="text-xl font-black text-[#163D68]">{count}</h3>
  </div>
);

const StatusCards = ({ stats, filters, setFilters, ordersCount }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-black text-[#163D68]">Order Analytics</h2>
          <p className="text-slate-400 font-medium italic">Manage and track your dough maker orders.</p>
        </div>
        <div className="bg-[#163D68] p-4 rounded-2xl shadow-xl text-white min-w-[220px] border-l-4 border-blue-400">
          <p className="text-[10px] font-bold text-blue-300 uppercase mb-1 tracking-widest">Revenue (Filtered)</p>
          <h3 className="text-xl font-black">Rs {stats.revenue.toLocaleString()}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8 print:hidden">
        <StatusCard label="Total" count={ordersCount} icon={<Layers size={18} />} color="#163D68" active={filters.status === "All"} onClick={() => setFilters({ ...filters, status: "All" })} />
        <StatusCard label="Pending" count={stats.pending} icon={<Clock size={18} />} color="#f59e0b" active={filters.status === "Pending"} onClick={() => setFilters({ ...filters, status: "Pending" })} />
        <StatusCard label="Approved" count={stats.approved} icon={<CheckCircle size={18} />} color="#10b981" active={filters.status === "Approved"} onClick={() => setFilters({ ...filters, status: "Approved" })} />
        <StatusCard label="Shipping" count={stats.shipping} icon={<Truck size={18} />} color="#3b82f6" active={filters.status === "Shipping"} onClick={() => setFilters({ ...filters, status: "Shipping" })} />
        <StatusCard label="Delivered" count={stats.delivered} icon={<ShoppingBag size={18} />} color="#8b5cf6" active={filters.status === "Delivered"} onClick={() => setFilters({ ...filters, status: "Delivered" })} />
      </div>
    </>
  );
};

export default StatusCards;