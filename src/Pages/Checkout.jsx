// Checkout.jsx

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BASE_URL from "../config/api";

const Checkout = () => {
    const { cart = [], clearCart } = useCart();

    const navigate = useNavigate();
    const containerRef = useRef(null);
    const summaryRef = useRef(null);


    const deliveryCharges = 250;

    const cartTotal = cart.reduce((acc, item) => {
        const price = Number(item.price || 0);
        const qty = Number(item.quantity || item.qty || 1);

        return acc + price * qty;
    }, 0);

    const finalTotal = cartTotal + deliveryCharges;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        streetAddress: "",
        paymentMethod: "cash",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            containerRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power4.out",
            }
        );

        tl.fromTo(
            ".input-field",
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power2.out",
            },
            "-=0.5"
        );

        gsap.fromTo(
            summaryRef.current,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.5)",
            }
        );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let errorMsg = "";

        if (
            ["firstName", "lastName", "country", "city"].includes(name)
        ) {
            if (value && !/^[A-Za-z\s]*$/.test(value)) {
                errorMsg = "Only alphabets are allowed.";
            }
        }

        if (name === "phone") {
            if (value && !/^[0-9]*$/.test(value)) {
                errorMsg = "Only numbers are allowed.";
            }

            if (value.length > 11) return;
        }

        if (name === "email") {
            if (value && !/^[A-Za-z0-9_.@]*$/.test(value)) {
                errorMsg = "Invalid characters used.";
            }
        }

        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg,
        }));

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let tempErrors = {};

        if (!formData.firstName) {
            tempErrors.firstName = "First name is required.";
        }

        if (!formData.phone) {
            tempErrors.phone = "Phone number is required.";
        } else if (
            !formData.phone.startsWith("03") ||
            formData.phone.length !== 11
        ) {
            tempErrors.phone =
                "Phone must be in format: 03XXXXXXXXX";
        }

        if (!formData.email) {
            tempErrors.email = "Email is required.";
        } else if (
            !formData.email.toLowerCase().endsWith("@gmail.com")
        ) {
            tempErrors.email =
                "Only @gmail.com addresses are accepted.";
        }

        if (!formData.city) {
            tempErrors.city = "City name is required.";
        }

        if (!formData.streetAddress) {
            tempErrors.streetAddress =
                "Street address is required.";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    // Checkout.jsx mein handleSubmit function ko replace karein

const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!validateForm()) return;

    // 1. Check karein user login hai ya nahi
    if (!user || !user.id) {
        alert("Please login to place an order.");
        navigate("/login1");
        return;
    }

    try {
        setLoading(true);

        // 2. Data prepare karein (userId context se aa rahi hai)
        const orderData = {
            ...formData,
            userId: user.id, // AuthContext se mil rahi id
            products: cart,
            subtotal: cartTotal,
            deliveryCharges,
            totalPrice: finalTotal,
        };

        const res = await axios.post(
            `${BASE_URL}/api/orders`,
            orderData
        );

        if (res.data.success) {
            console.log("Order placed with ID:", res.data.orderId);
            setLoading(false);
            setIsOrdered(true);
            clearCart();
        }

    } catch (error) {
        setLoading(false);
        alert(error.response?.data?.message || "Failed to place order.");
    }
};

    const { user } = useAuth();

console.log("USER FROM REDUX:", user);
console.log("USER ID SENT:", user?.id);

    const handlePlaceOrder = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/orders`, {
                ...formData,
                userId: user.id, // ✅ yahan add karo
            });

            console.log("Order placed:", res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-10 px-6 lg:px-20 text-slate-900">

            {/* BACK BUTTON */}
            <div className="max-w-7xl mx-auto mb-8">
                <button
                    onClick={() => navigate("/cart")}
                    className="flex items-center gap-2 text-slate-500 font-bold hover:text-amber-500 transition-colors uppercase italic tracking-tighter"
                >
                    <span className="text-xl">←</span>
                    Back to Cart
                </button>
            </div>

            {/* LOADER */}
            {loading && (
                <div className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-lg flex flex-col items-center justify-center">
                    <div className="flex gap-3 mb-6">
                        <div className="w-5 h-5 bg-amber-500 rounded-full animate-bounce"></div>

                        <div className="w-5 h-5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>

                        <div className="w-5 h-5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>

                    <h2 className="text-white text-2xl font-black uppercase italic">
                        Processing Order...
                    </h2>
                </div>
            )}

            {/* SUCCESS */}
            {isOrdered && (
                <div className="fixed inset-0 z-[8000] bg-white flex flex-col items-center justify-center p-8 text-center">

                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl">
                        ✓
                    </div>

                    <h2 className="text-4xl font-black uppercase">
                        Thank You!
                    </h2>

                    <p className="text-slate-500 mt-4 font-medium max-w-md">
                        Your order has been placed successfully.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-10 px-10 py-4 bg-amber-500 text-white rounded-full font-black hover:bg-slate-900 transition-all"
                    >
                        CONTINUE SHOPPING
                    </button>
                </div>
            )}

            {/* HEADER */}
            <header className="max-w-7xl mx-auto flex flex-col items-center mb-12">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                    CHECKOUT
                </h1>
            </header>

            <main className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    ref={containerRef}
                    className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100"
                >
                    <div className="space-y-12">

                        {/* CUSTOMER */}
                        <section>
                            <h2 className="text-xl font-black uppercase mb-8">
                                Customer Details
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">

                                <Input
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={errors.firstName}
                                />

                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <Input
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                />
                            </div>
                        </section>

                        {/* ADDRESS */}
                        <section className="pt-10 border-t border-slate-100">
                            <h2 className="text-xl font-black uppercase mb-8">
                                Shipping Address
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">

                                <Input
                                    label="Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    error={errors.city}
                                />

                                <div className="md:col-span-2">
                                    <Input
                                        label="Street Address"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleChange}
                                        error={errors.streetAddress}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* PAYMENT */}
                        <section className="pt-10 border-t border-slate-100">

                            <h2 className="text-xl font-black uppercase mb-8">
                                Payment Method
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                {["cash", "bank"].map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                paymentMethod: method,
                                            })
                                        }
                                        className={`py-4 rounded-2xl border-2 font-black uppercase text-xs tracking-widest transition-all
                                        ${formData.paymentMethod === method
                                                ? "border-amber-500 bg-amber-50"
                                                : "border-slate-100"
                                            }`}
                                    >
                                        {method === "cash"
                                            ? "Cash on Delivery"
                                            : "Bank Transfer"}
                                    </button>
                                ))}
                            </div>

                            {/* BANK DETAILS */}
                            {formData.paymentMethod === "bank" && (
                                <div className="mt-6 p-8 rounded-3xl bg-slate-900 text-white space-y-4">

                                    <h3 className="text-2xl font-black text-amber-400 uppercase">
                                        Our Bank Details
                                    </h3>

                                    <div className="space-y-2 text-sm font-medium">

                                        <p>
                                            <span className="font-black">
                                                Account Title:
                                            </span>{" "}
                                            Adil Masood
                                        </p>

                                        <p>
                                            <span className="font-black">
                                                Bank:
                                            </span>{" "}
                                            Faysal Bank
                                        </p>

                                        <p>
                                            <span className="font-black">
                                                Account Number:
                                            </span>{" "}
                                            3645301000000960
                                        </p>

                                        <p>
                                            <span className="font-black">
                                                IBAN:
                                            </span>{" "}
                                            PK73FAYS3645301000000960
                                        </p>
                                    </div>

                                    <div className="border-t border-white/10 pt-4 text-amber-300 text-sm font-bold">
                                        Please send payment receipt on
                                        WhatsApp:
                                        <br />
                                        +923 111 122 144
                                    </div>
                                </div>
                            )}
                        </section>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-amber-500 transition-all uppercase disabled:opacity-50"
                        >
                            {loading
                                ? "Processing..."
                                : "Place Order"}
                        </button>
                    </div>
                </form>

                {/* SUMMARY */}
                <aside className="lg:col-span-4">

                    <div
                        ref={summaryRef}
                        className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl"
                    >
                        <h3 className="text-xl font-black mb-6 uppercase italic">
                            Order Summary
                        </h3>

                        <div className="space-y-4">

                            <div className="flex justify-between font-bold opacity-70">
                                <span>Subtotal</span>

                                <span>
                                    Rs. {(cartTotal || 0).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between font-bold text-amber-400">
                                <span>Delivery Charges</span>

                                <span>
                                    Rs. {deliveryCharges.toLocaleString()}
                                </span>
                            </div>

                            <div className="h-px bg-white/10 my-4"></div>

                            <div className="flex justify-between text-2xl font-black">
                                <span>Total</span>

                                <span>
                                    Rs. {(finalTotal || 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

const Input = ({ label, error, ...props }) => (
    <div className="input-field flex flex-col space-y-1">

        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">
            {label}
        </label>

        <input
            {...props}
            className={`w-full p-4 rounded-xl border-2 transition-all font-bold outline-none text-sm
            ${error
                    ? "border-red-500 bg-red-50"
                    : "border-slate-100 focus:border-amber-500"
                }`}
        />

        {error && (
            <span className="text-[10px] text-red-500 font-bold uppercase">
                {error}
            </span>
        )}
    </div>
);

export default Checkout;