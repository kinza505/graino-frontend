import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard, CheckCircle, LogOut, Search, Trash2, Printer, 
  FileText, ChevronLeft, ChevronRight, Calendar, Menu, Edit3, X
} from "lucide-react";

import logo from "../assets/web-logo.png"; 
import BASE_URL from "../config/api";

const Admin = ({ onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportPage, setReportPage] = useState(1); 
  const recordsPerPage = 15;

  const today = new Date().toISOString().split("T")[0];
  const [dateRange, setDateRange] = useState({ start: today, end: today });
  const [filters, setFilters] = useState({ status: "All" });
  
  const [editModal, setEditModal] = useState({ show: false, order: null });
  const [popup, setPopup] = useState({ show: false, message: "" });

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/orders`);
      setOrders(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) { console.log("Error fetching orders:", error); }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showAlert = (message) => {
    setPopup({ show: true, message });
    setTimeout(() => setPopup({ show: false, message: "" }), 3000);
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedData } = editModal.order;
      await axios.put(`${BASE_URL}/api/orders/${_id}`, updatedData);
      setOrders(prev => prev.map(o => o._id === _id ? editModal.order : o));
      setEditModal({ show: false, order: null });
      showAlert("Order updated successfully!");
    } catch (err) { showAlert("Update failed!"); }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${BASE_URL}/api/orders/${id}`);
        setOrders(prev => prev.filter(o => o._id !== id));
        showAlert("Order deleted successfully!");
      } catch (err) { showAlert("Delete failed!"); }
    }
  };

  // Logic to filter orders (Date + Status + Search)
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      const matchesDate = orderDate >= dateRange.start && orderDate <= dateRange.end;
      const matchesStatus = filters.status === "All" || order.status === filters.status;
      const matchesSearch = !searchTerm || 
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone?.includes(searchTerm);
      return matchesDate && matchesStatus && matchesSearch;
    });
  }, [orders, dateRange, filters, searchTerm]);

  // Pagination Logic
  const currentRecords = filteredOrders.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / recordsPerPage);
  
  const startRecord = filteredOrders.length === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, filteredOrders.length);

  const stats = useMemo(() => ({
    total: filteredOrders.length,
    revenue: filteredOrders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0),
    pending: filteredOrders.filter(o => o.status === "Pending").length,
    approved: filteredOrders.filter(o => o.status === "Approved").length,
    shipping: filteredOrders.filter(o => o.status === "Shipping").length,
    delivered: filteredOrders.filter(o => o.status === "Delivered").length,
  }), [filteredOrders]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans text-[10px]">
      
      {popup.show && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl bg-[#163D68] text-white font-bold transition-all">
          <CheckCircle size={18} className="text-emerald-400" /> {popup.message}
        </div>
      )}

      {/* UPDATE MODAL */}
      {editModal.show && (
        <div className="fixed inset-0 bg-black/60 z-[400] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto text-[11px]">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-auto">
            <div className="bg-[#163D68] p-4 text-white flex justify-between items-center rounded-t-xl">
              <h3 className="font-bold uppercase tracking-widest">Update Order Detail</h3>
              <button onClick={() => setEditModal({ show: false, order: null })}><X size={20}/></button>
            </div>
            <form onSubmit={handleUpdateOrder} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="font-bold text-slate-500 uppercase">First Name</label><input type="text" value={editModal.order.firstName} onChange={(e)=>setEditModal({...editModal, order: {...editModal.order, firstName: e.target.value}})} className="w-full border p-2 rounded-lg outline-none focus:border-blue-500" /></div>
              <div className="space-y-1"><label className="font-bold text-slate-500 uppercase">Last Name</label><input type="text" value={editModal.order.lastName} onChange={(e)=>setEditModal({...editModal, order: {...editModal.order, lastName: e.target.value}})} className="w-full border p-2 rounded-lg outline-none focus:border-blue-500" /></div>
              <div className="space-y-1"><label className="font-bold text-slate-500 uppercase">Phone</label><input type="text" value={editModal.order.phone} onChange={(e)=>setEditModal({...editModal, order: {...editModal.order, phone: e.target.value}})} className="w-full border p-2 rounded-lg outline-none focus:border-blue-500" /></div>
              <div className="space-y-1"><label className="font-bold text-slate-500 uppercase">City</label><input type="text" value={editModal.order.city} onChange={(e)=>setEditModal({...editModal, order: {...editModal.order, city: e.target.value}})} className="w-full border p-2 rounded-lg outline-none focus:border-blue-500" /></div>
              <div className="col-span-1 md:col-span-2 space-y-1"><label className="font-bold text-slate-500 uppercase">Full Address</label><textarea value={editModal.order.streetAddress || ""} onChange={(e) => setEditModal({ ...editModal, order: { ...editModal.order, streetAddress: e.target.value }})} className="w-full border p-2 rounded-lg outline-none focus:border-blue-500 h-16" /></div>
              <div className="space-y-1"><label className="font-bold text-slate-500 uppercase">Status</label><select value={editModal.order.status} onChange={(e)=>setEditModal({...editModal, order: {...editModal.order, status: e.target.value}})} className="w-full border p-2 rounded-lg outline-none font-bold">
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setEditModal({ show: false, order: null })} className="px-5 py-2 border rounded font-bold uppercase">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#163D68] text-white rounded font-bold uppercase shadow-md">Update Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className={`bg-[#163D68] text-white flex flex-col fixed h-full transition-all duration-300 z-[110] 
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 ${isCollapsed ? "md:w-16" : "md:w-56"} print:hidden`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {(!isCollapsed || isMobileMenuOpen) && <span className="text-lg font-black italic tracking-tighter">GRAINO</span>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:block p-1.5 hover:bg-white/10 rounded-md mx-auto"><Menu size={18} /></button>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-white"><X size={20}/></button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <SidebarLink icon={<LayoutDashboard size={16} />} label="Dashboard" active={view === "dashboard"} collapsed={isCollapsed} onClick={() => { setView("dashboard"); setIsMobileMenuOpen(false); }} />
          <SidebarLink icon={<FileText size={16} />} label="Sales Report" active={view === "reports"} collapsed={isCollapsed} onClick={() => { setView("reports"); setIsMobileMenuOpen(false); }} />
          <div className="mt-auto border-t border-white/5 pt-2">
            <button onClick={onLogout} className="w-full flex items-center p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <LogOut size={16} /> {(!isCollapsed || isMobileMenuOpen) && <span className="ml-3 font-bold uppercase text-[9px]">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>

      <main className={`flex-1 transition-all duration-300 min-w-0 ${isCollapsed ? "md:ml-16" : "md:ml-56"} p-4 md:p-6`}>
        
        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center justify-between mb-4 bg-white p-3 rounded-xl shadow-sm print:hidden border border-slate-100">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-1"><Menu size={20}/></button>
            <span className="font-black italic tracking-tighter text-[#163D68]">GRAINO ADMIN</span>
            <div className="w-5"></div>
        </div>

        {view === "dashboard" ? (
          <>
            {/* DASHBOARD HEADER & DATE FILTER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 print:hidden">
              <h2 className="text-lg font-black text-[#163D68] uppercase tracking-tight">Admin Dashboard</h2>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
                <Calendar size={14} className="text-blue-500" />
                <input type="date" max={today} value={dateRange.start} onChange={(e) => {setDateRange({ ...dateRange, start: e.target.value }); setCurrentPage(1);}} className="bg-transparent border-none text-[10px] font-bold outline-none cursor-pointer" />
                <span className="text-slate-300">-</span>
                <input type="date" max={today} value={dateRange.end} onChange={(e) => {setDateRange({ ...dateRange, end: e.target.value }); setCurrentPage(1);}} className="bg-transparent border-none text-[10px] font-bold outline-none cursor-pointer" />
              </div>
            </div>

            {/* DASHBOARD STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 print:hidden">
              <MiniCard label="Total" value={stats.total} color="blue" />
              <MiniCard label="Pending" value={stats.pending} color="amber" />
              <MiniCard label="Approved" value={stats.approved} color="blue" />
              <MiniCard label="Shipping" value={stats.shipping} color="indigo" />
              <MiniCard label="Delivered" value={stats.delivered} color="emerald" />
              <div className="bg-[#163D68] p-3 rounded-xl text-white shadow-md text-center">
                <p className="text-[8px] opacity-70 uppercase font-black mb-1">Revenue</p>
                <h3 className="text-[11px] font-black tracking-tight">Rs {stats.revenue.toLocaleString()}</h3>
              </div>
            </div>

            {/* SEARCH BAR */}
            <div className="mb-4 relative max-w-sm print:hidden">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" placeholder="Search Order ID or Name..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] outline-none shadow-sm focus:border-blue-400 transition-all" />
            </div>

            {/* DASHBOARD TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left min-w-[800px] border-collapse">
                  <thead className="bg-slate-50 border-b text-slate-500 font-black uppercase text-[9px]">
                    <tr>
                      <th className="px-5 py-4 w-16">Sr. No</th>
                      <th className="px-5 py-4">Order ID</th>
                      <th className="px-5 py-4">Customer</th>
                      <th className="px-5 py-4">Contact</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Address</th>
                      <th className="px-5 py-4 text-right">Amount</th>
                      <th className="px-5 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentRecords.map((o, index) => (
                      <tr key={o._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-slate-400">{(currentPage - 1) * recordsPerPage + index + 1}</td>
                        <td className="px-5 py-3.5 font-bold text-blue-600">#{o.orderId}</td>
                        <td className="px-5 py-3.5 font-black uppercase text-slate-700">{o.firstName} {o.lastName}</td>
                        <td className="px-5 py-3.5 font-bold text-slate-500">{o.phone}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${
                             o.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                             o.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                          }`}>{o.status}</span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 truncate max-w-[150px]">{o.streetAddress}</td>
                        <td className="px-5 py-3.5 text-right font-black text-slate-900">Rs {o.totalPrice?.toLocaleString()}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex justify-center gap-2">
                             <button onClick={() => setEditModal({ show: true, order: { ...o } })} className="text-blue-500 p-2 rounded-lg hover:bg-blue-50 transition-colors"><Edit3 size={15}/></button>
                             <button onClick={() => handleDeleteOrder(o._id)} className="text-red-400 p-2 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={15}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30 print:hidden">
                <span className="text-slate-400 font-black text-[9px] uppercase tracking-widest">
                  Showing {startRecord} to {endRecord} of {filteredOrders.length} entries
                </span>
                <div className="flex gap-2 items-center">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p-1))} className="p-1.5 border rounded-lg bg-white hover:bg-slate-100 shadow-sm transition-all disabled:opacity-30"><ChevronLeft size={16}/></button>
                  <span className="px-4 py-1.5 font-black text-blue-600 bg-blue-50 rounded-lg text-[10px]">PAGE {currentPage}</span>
                  <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} className="p-1.5 border rounded-lg bg-white hover:bg-slate-100 shadow-sm transition-all disabled:opacity-30"><ChevronRight size={16}/></button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* SALES REPORT */
          <div className="bg-white border border-slate-200 p-4 md:p-8 shadow-sm rounded-2xl print:border-none print:p-0">
            {/* REPORT FILTERS */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-8 print:hidden bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Order Status</label>
                    <select value={filters.status} onChange={(e)=>{setFilters({...filters, status: e.target.value}); setReportPage(1);}} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[10px] font-black outline-none focus:border-blue-400 bg-white">
                      <option value="All">All Orders</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">From Date</label>
                    <input type="date" max={today} value={dateRange.start} onChange={(e) => {setDateRange({ ...dateRange, start: e.target.value }); setReportPage(1);}} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[10px] font-black outline-none bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">To Date</label>
                    <input type="date" max={today} value={dateRange.end} onChange={(e) => {setDateRange({ ...dateRange, end: e.target.value }); setReportPage(1);}} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[10px] font-black outline-none bg-white" />
                  </div>
               </div>
               <button onClick={() => window.print()} className="w-full xl:w-auto bg-[#163D68] text-white px-8 py-3 rounded-xl flex items-center justify-center gap-3 font-black text-[10px] shadow-lg hover:bg-slate-800 transition-all">
                 <Printer size={18}/> PRINT
               </button>
            </div>

            {/* PRINT HEADER */}
            <div className="hidden print:block text-center mb-10">
               <img src={logo} className="w-33 mx-auto mb-2" alt="Logo" />
               <h1 className="text-2xl font-black text-[#163D68] uppercase tracking-[0.2em]">Graino Dough Maker</h1>
               <p className="text-[10px] text-slate-600 font-bold">44, Mumtaz Market, GT Rd, Gujranwala, 52250 | Phone: 0311 1122144</p>
               <div className="flex justify-between border-b-2 border-slate-900 mt-10 pb-1 uppercase font-black text-xs italic tracking-tighter">
                  <span>Official Sales Report</span>
                  <span className="text-[10px] not-italic">Period: {dateRange.start} to {dateRange.end}</span>
               </div>
            </div>

            {/* SALES TABLE */}
            <div className="overflow-x-auto print:overflow-visible">
              <table className="w-full text-left border-collapse border border-slate-200 print:border-slate-900">
                <thead className="print:table-header-group">
                  <tr className="bg-slate-100 border-b border-slate-200 font-black uppercase text-[8px] text-slate-600 print:bg-gray-200">
                    <th className="p-3 border-r border-slate-200 text-center">Sr.</th>
                    <th className="p-3 border-r border-slate-200 text-center">Date</th>
                    <th className="p-3 border-r border-slate-200">Order ID</th>
                    <th className="p-3 border-r border-slate-200">Customer & Phone</th>
                    <th className="p-3 border-r border-slate-200">Address (City)</th>
                    <th className="p-3 border-r border-slate-200 text-center">Status</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* SCREEN ONLY (Paginated) */}
                  {filteredOrders.slice((reportPage - 1) * recordsPerPage, reportPage * recordsPerPage).map((o, idx) => (
                    <tr key={o._id} className="border-b border-slate-200 text-[9px] print:hidden">
                      <td className="p-2.5 border-r border-slate-200 text-center">{(reportPage - 1) * recordsPerPage + idx + 1}</td>
                      <td className="p-2.5 border-r border-slate-200 text-center font-medium">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="p-2.5 border-r border-slate-200 font-bold text-blue-700 italic">#{o.orderId}</td>
                      <td className="p-2.5 border-r border-slate-200">
                         <div className="font-black uppercase text-slate-800">{o.firstName} {o.lastName}</div>
                         <div className="text-[8px] font-black text-slate-500 mt-0.5">{o.phone}</div>
                      </td>
                      <td className="p-2.5 border-r border-slate-200 leading-tight">
                         <div className="font-black text-[#163D68] mb-0.5 uppercase text-[8px]">{o.city}</div>
                         <div className="text-slate-400 text-[8px] italic">{o.streetAddress}</div>
                      </td>
                      <td className="p-2.5 border-r border-slate-200 text-center font-black uppercase text-[8px]">{o.status}</td>
                      <td className="p-2.5 text-right font-black text-slate-900">Rs {o.totalPrice?.toLocaleString()}</td>
                    </tr>
                  ))}
                  {/* PRINT ONLY (All Data) */}
                  {filteredOrders.map((o, idx) => (
                    <tr key={`print-${o._id}`} className="hidden print:table-row border-b border-gray-400 text-[9px]">
                      <td className="p-2.5 border-r border-gray-400 text-center">{idx + 1}</td>
                      <td className="p-2.5 border-r border-gray-400 text-center">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="p-2.5 border-r border-gray-400 font-bold">#{o.orderId}</td>
                      <td className="p-2.5 border-r border-gray-400">{o.firstName} {o.lastName} ({o.phone})</td>
                      <td className="p-2.5 border-r border-gray-400">{o.city} - {o.streetAddress}</td>
                      <td className="p-2.5 border-r border-gray-400 text-center uppercase">{o.status}</td>
                      <td className="p-2.5 text-right font-bold">Rs {o.totalPrice?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#163D68] text-white font-black print:table-footer-group">
                  <tr>
                    <td colSpan="5" className="p-4 uppercase text-[9px]">Total Records: {filteredOrders.length}</td>
                    <td className="p-4 border-l border-white/10 text-right uppercase text-[9px]">Total Amount:</td>
                    <td className="p-4 text-right text-[12px]">Rs {stats.revenue.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* REPORT PAGINATION */}
            <div className="mt-8 flex justify-end gap-3 print:hidden items-center">
              <span className="text-[9px] font-black text-slate-400">PAGE {reportPage} OF {Math.ceil(filteredOrders.length / recordsPerPage) || 1}</span>
              <button disabled={reportPage === 1} onClick={() => setReportPage(p => p - 1)} className="p-2 border-2 rounded-xl bg-white disabled:opacity-30"><ChevronLeft size={16}/></button>
              <button disabled={reportPage >= Math.ceil(filteredOrders.length / recordsPerPage)} onClick={() => setReportPage(p => p + 1)} className="p-2 border-2 rounded-xl bg-white disabled:opacity-30"><ChevronRight size={16}/></button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media print {
          @page { size: A4; margin: 1cm; }
          body * { visibility: hidden; }
          main, main * { visibility: visible; }
          main { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; background: white; }
          .print\\:hidden { display: none !important; }
          .print\\:table-row { display: table-row !important; }
          table { width: 100% !important; border-collapse: collapse !important; }
          tr { page-break-inside: avoid; }
          thead { display: table-header-group !important; }
          tfoot { display: table-footer-group !important; }
        }
      `}</style>
    </div>
  );
};

const MiniCard = ({ label, value, color }) => {
  const themes = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  };
  return (
    <div className={`${themes[color]} p-3 rounded-xl border shadow-sm text-center`}>
      <p className="text-[8px] font-black uppercase opacity-60 mb-1 tracking-widest">{label}</p>
      <h3 className="text-[11px] font-black tracking-tight">{value}</h3>
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick, collapsed }) => (
  <button onClick={onClick} className={`w-full flex items-center p-3.5 rounded-xl transition-all mb-1 ${active ? 'bg-white text-[#163D68] shadow-lg font-black' : 'text-white/60 hover:text-white hover:bg-white/5 font-bold'}`}>
    <div>{icon}</div>
    <span className={`ml-3 tracking-widest uppercase text-[9px] ${collapsed ? 'md:hidden' : 'block'}`}>{label}</span>
  </button>
);

export default Admin;