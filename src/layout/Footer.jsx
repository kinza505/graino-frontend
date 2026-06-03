import React from "react";
import { motion } from "framer-motion";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";

import {
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, duration: 0.6 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const socialIcons = [
        FaFacebookF,
        FaInstagram,
        FaLinkedinIn,
        FaTwitter,
    ];

    return (
        // Background ko white kiya aur text ko dark slate (bg-white text-slate-900)
        <footer className="bg-white text-slate-900 pt-20 pb-10 px-6 md:px-20 relative overflow-hidden border-t border-slate-100">

            {/* Background Glows (Inko light rakha hai taake white par achay lagein) */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA9E26]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px]" />

            {/* MAIN GRID → 2 COLUMN (TEXT LEFT + MAP RIGHT) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-start"
            >

                {/* LEFT SIDE */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-3xl font-black mb-6 text-[#163D68]">
                        GRAINO DOUGH MAKER<span className="text-[#EA9E26]">.</span>
                    </h2>

                    <p className="text-slate-600 mb-6 text-sm leading-relaxed text-justify">
                        Graino Dough Maker is designed to bring bakery level perfection straight into your kitchen.
                        With powerful motor performance, smooth mixing technology, and consistent kneading results,
                        it saves your time while ensuring professional quality dough every single time.
                        Whether you are preparing bread, pizza, or traditional recipes, graino delivers unmatched
                        texture, durability, and ease of use making every cooking experience faster, cleaner,
                        and more enjoyable.
                    </p>

                    {/* CONTACT */}
                    <div className="space-y-4 text-sm text-slate-600 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                                <Phone className="text-[#EA9E26]" size={16} />
                            </div>
                            <span className="font-medium">0300 0600 671</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                                <Mail className="text-[#EA9E26]" size={16} />
                            </div>
                            <span className="font-medium">info@technicmentors.com</span>
                        </div>
                    </div>

                    {/* SOCIAL */}
                    <div className="flex gap-4">
                        {socialIcons.map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                whileHover={{ y: -5, backgroundColor: "#EA9E26", color: "#fff" }}
                                className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center transition-all"
                            >
                                <Icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT SIDE → BIG MAP */}
                <motion.div variants={itemVariants}>
                    <h4 className="text-lg font-bold mb-6 border-l-4 border-[#EA9E26] pl-3 text-[#163D68]">
                        Location
                    </h4>

                    <div className="flex items-start gap-3 text-slate-600 text-sm mb-4">
                        <MapPin className="text-[#EA9E26]" size={20} />
                        <span className="font-medium">Gujranwala, Pakistan</span>
                    </div>

                    {/* BIGGER MAP */}
                    <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3377.4064371493016!2d74.1956637!3d32.162234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2976b9766465%3A0xc3f8e434e30491a6!2sTechnic%20Mentors!5e0!3m2!1sen!2s!4v1700000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="graino Location"
                        ></iframe>
                    </div>
                </motion.div>

            </motion.div>

            {/* FOOTER BOTTOM */}
            <hr className="my-10 border-slate-200" />

            <div className="text-center text-sm text-slate-400 font-medium">
                © {new Date().getFullYear()} Graino Dough Maker. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;