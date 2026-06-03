import React from 'react';
import { LayoutDashboard, FileText, Clock, CheckCircle, Truck, ShoppingBag, LogOut } from "lucide-react";

const SidebarLink = ({ icon, label, active, onClick, count }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${active ? 'bg-white text-[#163D68] font-black shadow-lg scale-[1.02]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-[12px] font-medium">{label}</span>
    </div>
    {count !== undefined && <span className={`text-[9px] px-1.5 py-0.5 rounded-lg ${active ? 'bg-[#163D68]/10 text-[#163D68]' : 'bg-white/10'}`}>{count}</span>}
  </button>
);

const Sidebar = ({ view, setView, filters, setFilters, stats, onLogout }) => {
  return (
    <aside className="w-60 bg-[#163D68] text-white flex flex-col fixed h-full shadow-xl z-50 print:hidden">
      <div className="p-6 border-b border-white/5">
        <h1 className="text-xl font-black tracking-tighter text-white">Welcome Back Graino Admin</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <SidebarLink icon={<LayoutDashboard size={16} />} label="Dashboard" active={view === "dashboard"} onClick={() => setView("dashboard")} />

        <div className="pt-6 px-3 pb-2 px-2 text-[10px] font-bold text-white/30 uppercase tracking-[2px]">Quick Filter</div>
        <SidebarLink icon={<Clock size={16} />} label="Pending" count={stats.pending} active={filters.status === "Pending"} onClick={() => { setFilters({ status: "Pending", payment: "All" }); setView("dashboard"); }} />
        <SidebarLink icon={<CheckCircle size={16} />} label="Approved" count={stats.approved} active={filters.status === "Approved"} onClick={() => { setFilters({ status: "Approved", payment: "All" }); setView("dashboard"); }} />
        <SidebarLink icon={<Truck size={16} />} label="Shipping" count={stats.shipping} active={filters.status === "Shipping"} onClick={() => { setFilters({ status: "Shipping", payment: "All" }); setView("dashboard"); }} />
        <SidebarLink icon={<ShoppingBag size={16} />} label="Delivered" count={stats.delivered} active={filters.status === "Delivered"} onClick={() => { setFilters({ status: "Delivered", payment: "All" }); setView("dashboard"); }} />

          <SidebarLink icon={<FileText size={16} />} label="Order Reports" active={view === "reports"} onClick={() => setView("reports")} />

      </nav>
      <button onClick={onLogout} className="m-6 p-3 bg-red-500 text-white rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-red-600 transition-all"><LogOut size={14} /> Logout</button>
    </aside>
  );
};

export default Sidebar;