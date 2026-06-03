import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Mail, Phone } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  if (!user) return <div className='text-white text-center mt-20'>Please Login First</div>;

  return (
    <div className="min-h-screen bg-[#0F2744] pt-32 px-6 flex justify-center">
      <div className="max-w-md w-full bg-white/5 rounded-[40px] p-8 border border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-[#EA9E26]/20 blur-3xl"></div>
        <div className="relative z-10">
          <div className="w-24 h-24 bg-[#EA9E26] text-black text-4xl font-bold flex items-center justify-center rounded-full mx-auto shadow-2xl border-4 border-[#0F2744]">
            {user.firstName[0]}
          </div>
          <h2 className="text-2xl font-bold text-white mt-4">{user.firstName} {user.lastName}</h2>
          <p className="text-white/50 mb-8">Premium Customer</p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <Mail className="text-[#EA9E26]" />
              <span className="text-white/80">{user.email}</span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <Phone className="text-[#EA9E26]" />
              <span className="text-white/80">{user.phone}</span>
            </div>
          </div>

          <button onClick={logout} className="mt-8 flex items-center gap-2 mx-auto text-red-400 hover:text-red-300 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;