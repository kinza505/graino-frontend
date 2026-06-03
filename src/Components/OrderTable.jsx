import React from 'react';
import { Mail, MapPin, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const OrderTable = ({ currentRecords, handleStatusUpdate, setEditData, setEditPopup, setDeleteId, setDeletePopup, currentPage, totalPages, setCurrentPage, totalFiltered }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm print:hidden">
      <table className="w-full text-left min-w-[1000px]">
        <thead className="bg-[#F8FAFC] border-b border-slate-100">
          <tr className="text-[9px] uppercase font-black text-slate-400">
            <th className="p-4">Customer Info</th>
            <th className="p-4">Shipping Address</th>
            <th className="p-4">Bank Details</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {currentRecords.map((o) => (
            <tr key={o._id} className="hover:bg-blue-50/20 transition-all">
              <td className="p-4">
                <div className="font-bold text-[#163D68] text-[12px]">{o.firstName} {o.lastName}</div>
                <div className="flex items-center gap-1 text-slate-500 text-[11px]"><Mail size={10} /> {o.email}</div>
                <div className="font-medium text-slate-500">{o.phone}</div>
              </td>
              <td className="p-4 text-slate-600">
                <div className="flex items-start gap-1">
                  <MapPin size={10} className="mt-1 text-blue-500 shrink-0" />
                  <div>
                    <p className="font-bold text-[10px] uppercase text-slate-800">{o.city}, {o.country}</p>
                    <p className="text-[11px] leading-5">{o.streetAddress}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                {o.paymentMethod === 'bank' ? (
                  <div className="bg-blue-50/50 p-2 rounded-lg border border-blue-100 text-[10px]">
                    <p className="font-bold text-blue-700">{o.accountName || 'N/A'}</p>
                    <p className="text-blue-500">{o.accountNumber || 'xxxx-xxxx'}</p>
                  </div>
                ) : (
                  <span className="text-orange-600 font-bold uppercase text-[9px] bg-orange-50 px-2 py-1 rounded">Cash on Delivery</span>
                )}
              </td>
              <td className="p-4 text-center">
                <select
                  value={o.status}
                  onChange={(e) => handleStatusUpdate(o._id, e.target.value)}
                  className={`border rounded-xl px-3 py-2 min-w-[120px] text-[10px] font-black cursor-pointer bg-slate-100
                  ${o.status === 'Delivered' ? 'text-green-600' : o.status === 'Pending' ? 'text-orange-600' : 'text-blue-600'}`}
                >
                  <option>Pending</option><option>Approved</option><option>Shipping</option><option>Delivered</option>
                </select>
              </td>
              <td className="p-4 text-right font-black text-[#163D68]">Rs {o.totalPrice?.toLocaleString()}</td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-1">
                  <button onClick={() => { setEditData(o); setEditPopup(true); }} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-[#163D68] hover:text-white"><Pencil size={12} /></button>
                  <button onClick={() => { setDeleteId(o._id); setDeletePopup(true); }} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white"><Trash2 size={12} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-[#F8FAFC] border-t flex justify-between items-center">
        <span className="font-bold text-slate-400 uppercase text-[9px]">Page {currentPage} of {totalPages || 1} ({totalFiltered} records)</span>
        <div className="flex gap-1">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 border rounded-lg bg-white disabled:opacity-30"><ChevronLeft size={14} /></button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg font-bold transition-all ${currentPage === i + 1 ? 'bg-[#163D68] text-white shadow-lg' : 'bg-white border text-slate-500'}`}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 border rounded-lg bg-white disabled:opacity-30"><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;