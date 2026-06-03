// src/data/dummyOrders.js

const dummyOrders = [
  {
    _id: "ORD001",
    firstName: "Ahmed Khan",
    phone: "03001234567",
    city: "Lahore",
    totalPrice: 4500,
    status: "Pending",
    paymentMethod: "Cash",
    createdAt: "2024-12-15T10:30:00.000Z"
  },
  {
    _id: "ORD002",
    firstName: "Sara Ali",
    phone: "03217654321",
    city: "Karachi",
    totalPrice: 12500,
    status: "Approved",
    paymentMethod: "Bank",
    createdAt: "2025-01-05T14:20:00.000Z"
  },
  {
    _id: "ORD003",
    firstName: "Bilal Sheikh",
    phone: "03129988776",
    city: "Islamabad",
    totalPrice: 3200,
    status: "Shipping",
    paymentMethod: "Cash",
    createdAt: "2025-01-10T09:15:00.000Z"
  },
  {
    _id: "ORD004",
    firstName: "Zainab Bibi",
    phone: "03451122334",
    city: "Faisalabad",
    totalPrice: 7800,
    status: "Delivered",
    paymentMethod: "Bank",
    createdAt: "2024-11-20T16:45:00.000Z"
  },
  {
    _id: "ORD005",
    firstName: "Usman Ghani",
    phone: "03334455667",
    city: "Multan",
    totalPrice: 1500,
    status: "Pending",
    paymentMethod: "Cash",
    createdAt: "2025-01-12T11:00:00.000Z"
  },
  {
    _id: "ORD006",
    firstName: "Hamza Javed",
    phone: "03014455667",
    city: "Gujranwala",
    totalPrice: 9200,
    status: "Approved",
    paymentMethod: "Bank",
    createdAt: "2025-01-13T12:30:00.000Z"
  },
  {
    _id: "ORD007",
    firstName: "Ayesha Malik",
    phone: "03225544332",
    city: "Sialkot",
    totalPrice: 5600,
    status: "Shipping",
    paymentMethod: "Cash",
    createdAt: "2024-10-05T08:20:00.000Z"
  },
  {
    _id: "ORD008",
    firstName: "Omer Farooq",
    phone: "03158877665",
    city: "Peshawar",
    totalPrice: 11000,
    status: "Delivered",
    paymentMethod: "Bank",
    createdAt: "2025-01-14T15:10:00.000Z"
  },
  {
    _id: "ORD009",
    firstName: "Marium Noor",
    phone: "03442233445",
    city: "Quetta",
    totalPrice: 2400,
    status: "Pending",
    paymentMethod: "Cash",
    createdAt: "2025-01-14T18:00:00.000Z"
  },
  {
    _id: "ORD010",
    firstName: "Hassan Raza",
    phone: "03051122998",
    city: "Rawalpindi",
    totalPrice: 6700,
    status: "Approved",
    paymentMethod: "Bank",
    createdAt: "2024-09-12T10:00:00.000Z"
  },
  // --- 2025 Records ---
  {
    _id: "ORD011",
    firstName: "Kashif Ali",
    phone: "03009988112",
    city: "Lahore",
    totalPrice: 13000,
    status: "Pending",
    paymentMethod: "Bank",
    createdAt: "2025-02-01T09:30:00.000Z"
  },
  {
    _id: "ORD012",
    firstName: "Sana Khan",
    phone: "03214455223",
    city: "Karachi",
    totalPrice: 4200,
    status: "Shipping",
    paymentMethod: "Cash",
    createdAt: "2025-02-02T11:15:00.000Z"
  },
  {
    _id: "ORD013",
    firstName: "Danish Ahmed",
    phone: "03125566778",
    city: "Hyderabad",
    totalPrice: 8900,
    status: "Approved",
    paymentMethod: "Bank",
    createdAt: "2025-02-03T14:40:00.000Z"
  },
  {
    _id: "ORD014",
    firstName: "Fiza Batool",
    phone: "03451231231",
    city: "Sargodha",
    totalPrice: 2100,
    status: "Delivered",
    paymentMethod: "Cash",
    createdAt: "2025-02-04T16:20:00.000Z"
  },
  {
    _id: "ORD015",
    firstName: "Mustafa Qureshi",
    phone: "03339090123",
    city: "Sukkur",
    totalPrice: 15500,
    status: "Pending",
    paymentMethod: "Bank",
    createdAt: "2025-02-05T10:05:00.000Z"
  },
  {
    _id: "ORD016",
    firstName: "Nadia Hussain",
    phone: "03024455887",
    city: "Bahawalpur",
    totalPrice: 3800,
    status: "Shipping",
    paymentMethod: "Cash",
    createdAt: "2025-02-05T13:50:00.000Z"
  },
  {
    _id: "ORD017",
    firstName: "Asad Mehmood",
    phone: "03105566441",
    city: "Jhang",
    totalPrice: 7200,
    status: "Approved",
    paymentMethod: "Bank",
    createdAt: "2025-02-06T08:30:00.000Z"
  },
  {
    _id: "ORD018",
    firstName: "Ibrahim Lodhi",
    phone: "03417788223",
    city: "Mardan",
    totalPrice: 5400,
    status: "Pending",
    paymentMethod: "Cash",
    createdAt: "2025-02-06T15:10:00.000Z"
  },
  {
    _id: "ORD019",
    firstName: "Tayyaba Gul",
    phone: "03201122334",
    city: "Swat",
    totalPrice: 1200,
    status: "Delivered",
    paymentMethod: "Cash",
    createdAt: "2025-02-07T12:00:00.000Z"
  },
  {
    _id: "ORD020",
    firstName: "Rizwan Shah",
    phone: "03004455112",
    city: "Okara",
    totalPrice: 9800,
    status: "Shipping",
    paymentMethod: "Bank",
    createdAt: "2025-02-07T17:45:00.000Z"
  },
  // Extra Records to show pagination
  { _id: "ORD021", firstName: "Yasin", phone: "03001", city: "Lahore", totalPrice: 500, status: "Pending", paymentMethod: "Cash", createdAt: "2025-02-08T10:00:00Z" },
  { _id: "ORD022", firstName: "Fatima", phone: "03002", city: "Karachi", totalPrice: 1500, status: "Approved", paymentMethod: "Bank", createdAt: "2025-02-08T11:00:00Z" },
  { _id: "ORD023", firstName: "Ali", phone: "03003", city: "Islamabad", totalPrice: 2500, status: "Shipping", paymentMethod: "Cash", createdAt: "2025-02-08T12:00:00Z" },
  { _id: "ORD024", firstName: "Umar", phone: "03004", city: "Multan", totalPrice: 3500, status: "Delivered", paymentMethod: "Bank", createdAt: "2025-02-08T13:00:00Z" },
  { _id: "ORD025", firstName: "Zoya", phone: "03005", city: "Peshawar", totalPrice: 4500, status: "Pending", paymentMethod: "Cash", createdAt: "2025-02-08T14:00:00Z" },
  { _id: "ORD026", firstName: "Moosa", phone: "03006", city: "Quetta", totalPrice: 5500, status: "Approved", paymentMethod: "Bank", createdAt: "2025-02-09T09:00:00Z" },
  { _id: "ORD027", firstName: "Hina", phone: "03007", city: "Sialkot", totalPrice: 6500, status: "Shipping", paymentMethod: "Cash", createdAt: "2025-02-09T10:00:00Z" },
  { _id: "ORD028", firstName: "Kamran", phone: "03008", city: "Lahore", totalPrice: 7500, status: "Delivered", paymentMethod: "Bank", createdAt: "2025-02-09T11:00:00Z" },
  { _id: "ORD029", firstName: "Saeed", phone: "03009", city: "Karachi", totalPrice: 8500, status: "Pending", paymentMethod: "Cash", createdAt: "2025-02-09T12:00:00Z" },
  { _id: "ORD030", firstName: "Amna", phone: "03010", city: "Islamabad", totalPrice: 9500, status: "Approved", paymentMethod: "Bank", createdAt: "2025-02-09T13:00:00Z" },
];

export default dummyOrders;