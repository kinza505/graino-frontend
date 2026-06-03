import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Search, Package, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import BASE_URL from "../config/api";

const OrderTracking = () => {
  const { user } = useAuth();
  const [orderIdInput, setOrderIdInput] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Admin Panel ke mutabiq statuses sync kiye hain
  const statuses = ["Pending", "Approved", "Shipping", "Delivered"];

  const handleTrack = async (e) => {
  if (e) e.preventDefault();
  const userInput = orderIdInput.trim();

  if (!userInput) {
    setError("Please enter a valid Order ID.");
    return;
  }

  setLoading(true);
  setError("");
  
  try {
    // Hum direct sari orders mangwa kar filter kar rahe hain (as per your code)
    // Lekin is baar hum cache nahi fresh data le rahe hain
    const res = await axios.get(`${BASE_URL}/api/orders`);
    const orders = res.data;

    const foundOrder = orders.find((o) => {
      return (
        String(o._id).toLowerCase() === userInput.toLowerCase() || 
        String(o.orderId).toLowerCase() === userInput.toLowerCase()
      );
    });

    if (!foundOrder) {
      setError(`Order "${userInput}" not found.`);
      setOrderData(null);
    } else {
      // User verification (Optional check)
      const orderUserId = foundOrder.userId?._id || foundOrder.userId;
      const currentUserId = user?.id || user?._id;

      if (currentUserId && String(orderUserId) !== String(currentUserId)) {
        setError("Access denied. This order belongs to another account.");
        setOrderData(null);
      } else {
        setOrderData(foundOrder); // Ismein latest status hoga
      }
    }
  } catch (err) {
    setError("Server connection failed. Make sure backend is online.");
  } finally {
    setLoading(false);
  }
};

  // ✅ Stepper logic updated for new statuses
  const getStatusStep = (status) => {
    const s = status?.toLowerCase();
    if (s === "delivered") return 3;
    if (s === "shipping") return 2;
    if (s === "approved") return 1;
    return 0; // Default Pending
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Package size={32} color="#EA9E26" />
          <h2 style={styles.title}>Track Your Order</h2>
          <p style={styles.subtitle}>Enter your Order ID to see real-time status</p>
        </div>

        <form onSubmit={handleTrack} style={styles.form}>
          <div style={styles.inputWrapper}>
            <Search style={styles.searchIcon} size={20} color="#999" />
            <input
              type="text"
              placeholder="e.g. ORD-123456"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? <Loader2 className="spinner" size={20} /> : "Track"}
          </button>
        </form>

        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {orderData && (
          <div style={styles.resultContainer}>
            {/* Summary Section */}
            <div style={styles.orderSummary}>
              <div>
                <span style={styles.label}>Order Reference:</span>
                <span style={styles.value}>{orderData.orderId}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={styles.label}>Total Price:</span>
                <span style={styles.price}>Rs. {orderData.totalPrice}</span>
              </div>
            </div>

            {/* Stepper Section */}
            <div style={styles.stepper}>
              {statuses.map((step, index) => {
                const currentStep = getStatusStep(orderData.status);
                const isCompleted = index <= currentStep;
                return (
                  <div key={step} style={styles.stepItem}>
                    <div style={{
                      ...styles.stepCircle,
                      backgroundColor: isCompleted ? "#28a745" : "#ddd"
                    }}>
                      {isCompleted ? <CheckCircle size={16} color="#fff" /> : <Clock size={16} color="#fff" />}
                    </div>
                    <span style={{ ...styles.stepText, color: isCompleted ? "#28a745" : "#999" }}>
                      {step}
                    </span>
                    {index < 3 && <div style={{
                      ...styles.stepLine,
                      backgroundColor: index < currentStep ? "#28a745" : "#ddd"
                    }} />}
                  </div>
                );
              })}
            </div>

            {/* Details Section */}
            <div style={styles.detailsCard}>
              <div style={styles.detailRow}>
                <strong>Current Status:</strong> 
                <span style={{color: '#28a745', fontWeight: 'bold'}}> {orderData.status?.toUpperCase()}</span>
              </div>
              <div style={styles.detailRow}>
                <strong>Shipping Address:</strong> {orderData.streetAddress}, {orderData.city}, {orderData.country}
              </div>
              <div style={styles.detailRow}>
                <strong>Phone:</strong> {orderData.phone}
              </div>
              <div style={styles.detailRow}>
                <strong>Payment:</strong> {orderData.paymentMethod?.toUpperCase()}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .spinner { animation: rotate 2s linear infinite; }
        @keyframes rotate { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const styles = {
  container: { padding: "40px 20px", minHeight: "80vh", backgroundColor: "#f8f9fa" },
  card: { maxWidth: "550px", margin: "auto", backgroundColor: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" },
  header: { textAlign: "center", marginBottom: "30px" },
  title: { margin: "10px 0 5px", fontSize: "24px", color: "#163D68", fontWeight: "800" },
  subtitle: { color: "#666", fontSize: "14px" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  inputWrapper: { position: "relative", flex: 1 },
  searchIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" },
  input: { width: "100%", padding: "12px 12px 12px 40px", border: "2px solid #eee", borderRadius: "10px", fontSize: "16px", outline: "none" },
  button: { padding: "0 25px", backgroundColor: "#EA9E26", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  errorBox: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#fff5f5", color: "#e03131", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" },
  resultContainer: { marginTop: "30px", borderTop: "1px solid #eee", paddingTop: "20px" },
  orderSummary: { display: "flex", justifyContent: "space-between", marginBottom: "30px" },
  label: { color: "#888", fontSize: "13px", display: "block" },
  value: { fontWeight: "bold", color: "#333" },
  price: { fontWeight: "bold", color: "#163D68", fontSize: "18px" },
  stepper: { display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "30px" },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", position: "relative", flex: 1 },
  stepCircle: { width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, marginBottom: "8px" },
  stepLine: { position: "absolute", height: "2px", width: "100%", top: "15px", left: "50%", zIndex: 1 },
  stepText: { fontSize: "12px", fontWeight: "500" },
  detailsCard: { backgroundColor: "#f1f8ff", padding: "15px", borderRadius: "10px" },
  detailRow: { marginBottom: "8px", fontSize: "13px", color: "#444" }
};

export default OrderTracking;