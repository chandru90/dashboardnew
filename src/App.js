// import React, {
//   useEffect,
//   useState,
// } from "react";

// import { io } from "socket.io-client";

// // SOCKET CONNECTION

// const socket = io(
//   "http://localhost:3001",
//   {
//     transports: ["websocket"],
//   }
// );

// const Dashboard = () => {
//   // =========================
//   // STATE
//   // =========================

//   const [orders, setOrders] = useState([]);

//   const [stats, setStats] = useState({
//     totalSales: 0,
//     totalOrders: 0,
//     customers: 0,
//     products: 0,
//   });

//   const [users, setUsers] = useState([]);

//   // =========================
//   // SOCKET EVENTS
//   // =========================

//   useEffect(() => {
//     // ACTIVE USERS

//     socket.on(
//       "updateUsers",
//       (activeUsers) => {
//         setUsers(activeUsers);

//         setStats((prev) => ({
//           ...prev,
//           customers:
//             activeUsers.length,
//         }));
//       }
//     );

//     // REALTIME ORDERS

//     socket.on(
//       "receiveMessage",
//       (data) => {
//         if (
//           data.ai &&
//           data.classification?.order
//         ) {
//           const order =
//             data.classification.order;

//           // ADD ORDER

//           setOrders((prev) => [
//             order,
//             ...prev,
//           ]);

//           // UPDATE STATS

//           setStats((prev) => ({
//             totalSales:
//               prev.totalSales +
//               order.totalAmount,

//             totalOrders:
//               prev.totalOrders + 1,

//             customers:
//               prev.customers,

//             products:
//               prev.products +
//               order.items.length,
//           }));
//         }
//       }
//     );

//     return () => {
//       socket.off("updateUsers");

//       socket.off(
//         "receiveMessage"
//       );
//     };
//   }, []);

//   // =========================
//   // STATUS COLOR
//   // =========================

//   const getStatusColor = (
//     status
//   ) => {
//     switch (status) {
//       case "CONFIRMED":
//         return "#10b981";

//       case "PENDING":
//         return "#f59e0b";

//       default:
//         return "#ef4444";
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* SIDEBAR */}

//       <div style={styles.sidebar}>
//         <h2 style={styles.logo}>
//           AI Commerce
//         </h2>

//         <ul style={styles.menu}>
//           <li>📊 Dashboard</li>
//           <li>📦 Orders</li>
//           <li>👥 Users</li>
//           <li>🤖 AI Orders</li>
//           <li>⚙ Settings</li>
//         </ul>
//       </div>

//       {/* MAIN */}

//       <div style={styles.main}>
//         {/* TOPBAR */}

//         <div style={styles.topbar}>
//           <div>
//             <h1>
//               Realtime Dashboard
//             </h1>

//             <p>
//               Live AI commerce updates
//             </p>
//           </div>

//           <div style={styles.live}>
//             🟢 LIVE
//           </div>
//         </div>

//         {/* STATS */}

//         <div style={styles.cards}>
//           <div style={styles.card}>
//             <h3>Total Sales</h3>

//             <p>
//               ₹
//               {stats.totalSales.toLocaleString()}
//             </p>
//           </div>

//           <div style={styles.card}>
//             <h3>Total Orders</h3>

//             <p>
//               {stats.totalOrders}
//             </p>
//           </div>

//           <div style={styles.card}>
//             <h3>Active Users</h3>

//             <p>
//               {stats.customers}
//             </p>
//           </div>

//           <div style={styles.card}>
//             <h3>Products Sold</h3>

//             <p>
//               {stats.products}
//             </p>
//           </div>
//         </div>

//         {/* ACTIVE USERS */}

//         <div
//           style={
//             styles.activeUsersContainer
//           }
//         >
//           <h2>Online Users</h2>

//           <div
//             style={
//               styles.activeUsers
//             }
//           >
//             {users.map(
//               (user, index) => (
//                 <span
//                   key={index}
//                   style={
//                     styles.userBadge
//                   }
//                 >
//                   {user}
//                 </span>
//               )
//             )}
//           </div>
//         </div>

//         {/* ORDERS */}

//         <div
//           style={
//             styles.tableContainer
//           }
//         >
//           <h2>
//             Live Incoming Orders
//           </h2>

//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>
//                   Order ID
//                 </th>

//                 <th style={styles.th}>
//                   Intent
//                 </th>

//                 <th style={styles.th}>
//                   Amount
//                 </th>

//                 <th style={styles.th}>
//                   Route
//                 </th>

//                 <th style={styles.th}>
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.map(
//                 (order, index) => (
//                   <tr key={index}>
//                     <td
//                       style={
//                         styles.td
//                       }
//                     >
//                       #
//                       {
//                         order.orderId
//                       }
//                     </td>

//                     <td
//                       style={
//                         styles.td
//                       }
//                     >
//                       {
//                         order.intent
//                       }
//                     </td>

//                     <td
//                       style={
//                         styles.td
//                       }
//                     >
//                       ₹
//                       {
//                         order.totalAmount
//                       }
//                     </td>

//                     <td
//                       style={
//                         styles.td
//                       }
//                     >
//                       {
//                         order.routedTo
//                       }
//                     </td>

//                     <td
//                       style={
//                         styles.td
//                       }
//                     >
//                       <span
//                         style={{
//                           ...styles.status,
//                           backgroundColor:
//                             getStatusColor(
//                               order.status
//                             ),
//                         }}
//                       >
//                         {
//                           order.status
//                         }
//                       </span>
//                     </td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // =========================
// // STYLES
// // =========================

// const styles = {
//   container: {
//     display: "flex",
//     minHeight: "100vh",
//     background: "#f3f4f6",
//     fontFamily: "Arial",
//   },

//   sidebar: {
//     width: "250px",
//     background: "#111827",
//     color: "white",
//     padding: "25px",
//   },

//   logo: {
//     color: "#60a5fa",
//     marginBottom: "30px",
//   },

//   menu: {
//     listStyle: "none",
//     padding: 0,
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//     cursor: "pointer",
//   },

//   main: {
//     flex: 1,
//     padding: "25px",
//   },

//   topbar: {
//     display: "flex",
//     justifyContent:
//       "space-between",
//     alignItems: "center",
//     marginBottom: "30px",
//   },

//   live: {
//     background: "#10b981",
//     color: "white",
//     padding: "10px 18px",
//     borderRadius: "30px",
//     fontWeight: "bold",
//   },

//   cards: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(220px,1fr))",
//     gap: "20px",
//     marginBottom: "30px",
//   },

//   card: {
//     background: "white",
//     padding: "25px",
//     borderRadius: "12px",
//     boxShadow:
//       "0 2px 10px rgba(0,0,0,0.08)",
//   },

//   activeUsersContainer: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "12px",
//     marginBottom: "30px",
//     boxShadow:
//       "0 2px 10px rgba(0,0,0,0.08)",
//   },

//   activeUsers: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "10px",
//     marginTop: "15px",
//   },

//   userBadge: {
//     background: "#2563eb",
//     color: "white",
//     padding: "8px 14px",
//     borderRadius: "20px",
//     fontSize: "14px",
//   },

//   tableContainer: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow:
//       "0 2px 10px rgba(0,0,0,0.08)",
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//   },

//   th: {
//     textAlign: "left",
//     padding: "14px",
//     background: "#f9fafb",
//     borderBottom:
//       "1px solid #e5e7eb",
//   },

//   td: {
//     padding: "14px",
//     borderBottom:
//       "1px solid #e5e7eb",
//   },

//   status: {
//     color: "white",
//     padding: "6px 12px",
//     borderRadius: "20px",
//     fontSize: "12px",
//   }
// };

// export default Dashboard;



// working
// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// // =========================
// // SOCKET CONNECTION FIX
// // =========================
// const socket = io("http://127.0.0.1:3001", {
//   transports: ["websocket", "polling"],
// });

// export default function Dashboard() {
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);

//   const [stats, setStats] = useState({
//     totalSales: 0,
//     totalOrders: 0,
//     customers: 0,
//     products: 0,
//   });

//   useEffect(() => {
//     console.log("📊 Dashboard Loaded");

//     // =========================
//     // CONNECTION CHECK
//     // =========================
//     socket.on("connect", () => {
//       console.log("✅ Socket Connected:", socket.id);
//     });

//     socket.on("connect_error", (err) => {
//       console.log("❌ Connection Error:", err.message);
//     });

//     // =========================
//     // USERS
//     // =========================
//     socket.on("updateUsers", (data) => {
//       console.log("👥 Users:", data);

//       setUsers(data);
//       setStats((p) => ({
//         ...p,
//         customers: data.length,
//       }));
//     });

//     // =========================
//     // NEW ORDER (MAIN FIX)
//     // =========================
//     socket.on("newOrder", (data) => {
//       console.log("🔥 NEW ORDER RECEIVED:", data);

//       const order = data.order;

//       if (!order) return;

//       setOrders((prev) => [order, ...prev]);

//       setStats((prev) => ({
//         totalSales:
//           prev.totalSales + Number(order.totalAmount || 0),

//         totalOrders: prev.totalOrders + 1,

//         customers: prev.customers,

//         products:
//           prev.products + (order.items?.length || 0),
//       }));
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("connect_error");
//       socket.off("updateUsers");
//       socket.off("newOrder");
//     };
//   }, []);

//   // =========================
//   // STATUS COLOR
//   // =========================
//   const color = (s) =>
//     s === "CONFIRMED"
//       ? "green"
//       : s === "PENDING"
//       ? "orange"
//       : "red";

//   return (
//     <div style={{ display: "flex", fontFamily: "Arial" }}>
//       {/* SIDEBAR */}
//       <div style={{ width: 220, background: "#111", color: "#fff", padding: 20 }}>
//         <h2>AI Store</h2>
//         <p>Dashboard</p>
//       </div>

//       {/* MAIN */}
//       <div style={{ flex: 1, padding: 20 }}>
//         <h1>Realtime Dashboard</h1>

//         {/* STATS */}
//         <div style={{ display: "flex", gap: 20 }}>
//           <Card title="Sales" value={stats.totalSales} />
//           <Card title="Orders" value={stats.totalOrders} />
//           <Card title="Users" value={stats.customers} />
//           <Card title="Products" value={stats.products} />
//         </div>

//         {/* USERS */}
//         <h3>Online Users</h3>
//         <div>
//           {users.map((u) => (
//             <span key={u} style={{ marginRight: 10 }}>
//               {u}
//             </span>
//           ))}
//         </div>

//         {/* ORDERS */}
//         <h3>Live Orders</h3>

//         <table border="1" width="100%">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Intent</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((o) => (
//               <tr key={o.orderId}>
//                 <td>{o.orderId}</td>
//                 <td>{o.intent}</td>
//                 <td>₹{o.totalAmount}</td>
//                 <td style={{ color: color(o.status) }}>
//                   {o.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // =========================
// // CARD COMPONENT
// // =========================
// function Card({ title, value }) {
//   return (
//     <div style={{ padding: 20, background: "#eee", borderRadius: 10 }}>
//       <h4>{title}</h4>
//       <h2>{value}</h2>
//     </div>
//   );
// }







// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// export default function Dashboard() {
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);

//   const [stats, setStats] = useState({
//     totalSales: 0,
//     totalOrders: 0,
//     customers: 0,
//     products: 0,
//   });

//   useEffect(() => {
//     console.log("📊 Dashboard Loaded");

//     // CREATE SOCKET INSIDE useEffect
//     const socket = io("http://localhost:3001", {
//       transports: ["websocket"],
//     });

//     // =========================
//     // CONNECT
//     // =========================
//     socket.on("connect", () => {
//       console.log("✅ CONNECTED:", socket.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ DISCONNECTED");
//     });

//     socket.on("connect_error", (err) => {
//       console.log("❌ SOCKET ERROR:", err.message);
//     });

//     // =========================
//     // DEBUG ALL EVENTS
//     // =========================
//     socket.onAny((event, ...args) => {
//       console.log("📡 EVENT:", event, args);
//     });

//     // =========================
//     // USERS
//     // =========================
//     socket.on("updateUsers", (data) => {
//       console.log("👥 USERS:", data);

//       setUsers(data);

//       setStats((prev) => ({
//         ...prev,
//         customers: data.length,
//       }));
//     });

//     // =========================
//     // NEW ORDER
//     // =========================
//     socket.on("newOrder", (data) => {
//       console.log("🔥 NEW ORDER:", data);

//       if (!data || !data.order) {
//         console.log("❌ INVALID ORDER DATA");
//         return;
//       }

//       const order = data.order;

//       setOrders((prev) => [order, ...prev]);

//       setStats((prev) => ({
//         totalSales:
//           prev.totalSales + Number(order.totalAmount || 0),

//         totalOrders:
//           prev.totalOrders + 1,

//         customers:
//           prev.customers,

//         products:
//           prev.products + (order.items?.length || 0),
//       }));
//     });

//     // CLEANUP
//     return () => {
//       console.log("🧹 CLEANUP");

//       socket.disconnect();
//     };
//   }, []);

//   const color = (s) =>
//     s === "CONFIRMED"
//       ? "green"
//       : s === "PENDING"
//       ? "orange"
//       : "red";

//   return (
//     <div style={{ display: "flex", fontFamily: "Arial" }}>
//       <div
//         style={{
//           width: 220,
//           background: "#111",
//           color: "#fff",
//           padding: 20,
//         }}
//       >
//         <h2>AI Store</h2>
//         <p>Dashboard</p>
//       </div>

//       <div style={{ flex: 1, padding: 20 }}>
//         <h1>Realtime Dashboard</h1>

//         <div style={{ display: "flex", gap: 20 }}>
//           <Card title="Sales" value={stats.totalSales} />
//           <Card title="Orders" value={stats.totalOrders} />
//           <Card title="Users" value={stats.customers} />
//           <Card title="Products" value={stats.products} />
//         </div>

//         <h3>Online Users</h3>

//         <div>
//           {users.map((u) => (
//             <span key={u} style={{ marginRight: 10 }}>
//               {u}
//             </span>
//           ))}
//         </div>

//         <h3>Live Orders</h3>

//         <table border="1" width="100%">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Intent</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((o) => (
//               <tr key={o.orderId}>
//                 <td>{o.orderId}</td>
//                 <td>{o.intent}</td>
//                 <td>₹{o.totalAmount}</td>

//                 <td style={{ color: color(o.status) }}>
//                   {o.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function Card({ title, value }) {
//   return (
//     <div
//       style={{
//         padding: 20,
//         background: "#eee",
//         borderRadius: 10,
//       }}
//     >
//       <h4>{title}</h4>
//       <h2>{value}</h2>
//     </div>
//   );
// }







//new working


// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// export default function Dashboard() {
//   // =========================
//   // SOCKET REF
//   // =========================
//   const socketRef = useRef(null);

//   // =========================
//   // STATES
//   // =========================
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);

//   const [stats, setStats] = useState({
//     totalSales: 0,
//     totalOrders: 0,
//     customers: 0,
//     products: 0,
//   });

//   // =========================
//   // FETCH PRODUCTS
//   // =========================
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await axios.get(
//           "https://fakestoreapi.com/products"
//         );

//         console.log("🛒 PRODUCTS:", res.data);

//         // Add random stock
//         const updatedProducts = res.data.map((p) => ({
//           ...p,
//           stock: Math.floor(Math.random() * 50) + 10,
//         }));

//         setProducts(updatedProducts);

//         // Total stock
//         const totalStock = updatedProducts.reduce(
//           (sum, p) => sum + p.stock,
//           0
//         );

//         setStats((prev) => ({
//           ...prev,
//           products: totalStock,
//         }));
//       } catch (err) {
//         console.log("❌ Product Fetch Error:", err);
//       }
//     };

//     loadProducts();
//   }, []);

//   // =========================
//   // SOCKET CONNECTION
//   // =========================
//   useEffect(() => {
//     // Create socket
//     socketRef.current = io("http://127.0.0.1:3001", {
//       transports: ["websocket", "polling"],
//     });

//     const socket = socketRef.current;

//     console.log("📊 Dashboard Loaded");

//     // =========================
//     // CONNECT
//     // =========================
//     socket.on("connect", () => {
//       console.log("✅ Socket Connected:", socket.id);
//     });

//     // =========================
//     // ERROR
//     // =========================
//     socket.on("connect_error", (err) => {
//       console.log("❌ Socket Error:", err.message);
//     });

//     // =========================
//     // USERS UPDATE
//     // =========================
//     socket.on("updateUsers", (data) => {
//       console.log("👥 USERS:", data);

//       setUsers(data);

//       setStats((prev) => ({
//         ...prev,
//         customers: data.length,
//       }));
//     });

//     // =========================
//     // NEW ORDER
//     // =========================
//     socket.on("newOrder", (data) => {
//       console.log("🔥 NEW ORDER:", data);

//       const order = data.order || data;

//       if (!order) return;

//       // =========================
//       // ADD ORDER
//       // =========================
//       setOrders((prev) => [order, ...prev]);

//       // =========================
//       // CALCULATE PURCHASED ITEMS
//       // =========================
//       const purchasedCount = order.items?.reduce(
//         (sum, item) => {
//           return sum + Number(item.quantity || 0);
//         },
//         0
//       );

//       // =========================
//       // UPDATE PRODUCT STOCKS
//       // =========================
//       setProducts((prevProducts) =>
//         prevProducts.map((p) => {
//           const item = order.items?.find(
//             (i) =>
//               Number(i.productId) === Number(p.id)
//           );

//           if (item) {
//             return {
//               ...p,
//               stock: Math.max(
//                 0,
//                 p.stock - Number(item.quantity)
//               ),
//             };
//           }

//           return p;
//         })
//       );

//       // =========================
//       // UPDATE STATS
//       // =========================
//       setStats((prev) => ({
//         ...prev,

//         totalSales:
//           prev.totalSales +
//           Number(order.totalAmount || 0),

//         totalOrders:
//           prev.totalOrders + 1,

//         products: Math.max(
//           0,
//           prev.products - purchasedCount
//         ),
//       }));
//     });

//     // =========================
//     // CLEANUP
//     // =========================
//     return () => {
//       socket.off("connect");
//       socket.off("connect_error");
//       socket.off("updateUsers");
//       socket.off("newOrder");

//       socket.disconnect();
//     };
//   }, []);

//   // =========================
//   // STATUS COLOR
//   // =========================
//   const color = (status) => {
//     switch (status) {
//       case "CONFIRMED":
//         return "green";

//       case "PENDING":
//         return "orange";

//       default:
//         return "red";
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         fontFamily: "Arial",
//         background: "#f5f5f5",
//       }}
//     >
//       {/* =========================
//           SIDEBAR
//       ========================= */}
//       <div
//         style={{
//           width: 220,
//           background: "#111",
//           color: "#fff",
//           padding: 20,
//         }}
//       >
//         <h2>AI Store</h2>
//         <p>Realtime Dashboard</p>
//       </div>

//       {/* =========================
//           MAIN CONTENT
//       ========================= */}
//       <div style={{ flex: 1, padding: 20 }}>
//         <h1>📊 Dashboard</h1>

//         {/* =========================
//             STATS CARDS
//         ========================= */}
//         <div
//           style={{
//             display: "flex",
//             gap: 20,
//             flexWrap: "wrap",
//             marginBottom: 30,
//           }}
//         >
//           <Card
//             title="Total Sales"
//             value={`₹${stats.totalSales}`}
//           />

//           <Card
//             title="Total Orders"
//             value={stats.totalOrders}
//           />

//           <Card
//             title="Online Users"
//             value={stats.customers}
//           />

//           <Card
//             title="Available Products"
//             value={stats.products}
//           />
//         </div>

//         {/* =========================
//             ONLINE USERS
//         ========================= */}
//         <h3>👥 Online Users</h3>

//         <div style={{ marginBottom: 30 }}>
//           {users.length === 0 ? (
//             <p>No users online</p>
//           ) : (
//             users.map((u, index) => (
//               <span
//                 key={index}
//                 style={{
//                   marginRight: 10,
//                   padding: "6px 12px",
//                   background: "#fff",
//                   borderRadius: 5,
//                   boxShadow:
//                     "0 1px 3px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 {u}
//               </span>
//             ))
//           )}
//         </div>

//         {/* =========================
//             PRODUCTS TABLE
//         ========================= */}
//         <h3>🛒 Product Stocks</h3>

//         <table
//           border="1"
//           width="100%"
//           cellPadding="10"
//           style={{
//             borderCollapse: "collapse",
//             background: "#fff",
//             marginBottom: 40,
//           }}
//         >
//           <thead>
//             <tr style={{ background: "#ddd" }}>
//               <th>ID</th>
//               <th>Product</th>
//               <th>Stock</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length === 0 ? (
//               <tr>
//                 <td colSpan="3" align="center">
//                   Loading products...
//                 </td>
//               </tr>
//             ) : (
//               products.map((p) => (
//                 <tr key={p.id}>
//                   <td>{p.id}</td>
//                   <td>{p.title}</td>
//                   <td>{p.stock}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {/* =========================
//             LIVE ORDERS
//         ========================= */}
//         <h3>🔥 Live Orders</h3>

//         <table
//           border="1"
//           width="100%"
//           cellPadding="10"
//           style={{
//             borderCollapse: "collapse",
//             background: "#fff",
//           }}
//         >
//           <thead>
//             <tr style={{ background: "#ddd" }}>
//               <th>ID</th>
//               <th>Intent</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.length === 0 ? (
//               <tr>
//                 <td colSpan="4" align="center">
//                   No orders yet
//                 </td>
//               </tr>
//             ) : (
//               orders.map((o, index) => (
//                 <tr key={o.orderId || index}>
//                   <td>{o.orderId}</td>

//                   <td>{o.intent}</td>

//                   <td>₹{o.totalAmount}</td>

//                   <td
//                     style={{
//                       color: color(o.status),
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {o.status}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // =========================
// // CARD COMPONENT
// // =========================
// function Card({ title, value }) {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         padding: 20,
//         borderRadius: 10,
//         minWidth: 220,
//         boxShadow:
//           "0 2px 5px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h4>{title}</h4>

//       <h2>{value}</h2>
//     </div>
//   );
// }


// new working

// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function Dashboard() {
//   const socketRef = useRef(null);

//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);

//   const [stats, setStats] = useState({
//     totalSales: 0,
//     totalOrders: 0,
//     customers: 0,
//     products: 0,
//   });

//   // =========================
//   // FETCH PRODUCTS
//   // =========================
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await axios.get("https://fakestoreapi.com/products");

//         const updated = res.data.map((p) => ({
//           ...p,
//           stock: Math.floor(Math.random() * 50) + 10,
//         }));

//         setProducts(updated);

//         const totalStock = updated.reduce(
//           (sum, p) => sum + p.stock,
//           0
//         );

//         setStats((prev) => ({
//           ...prev,
//           products: totalStock,
//         }));
//       } catch (err) {
//         console.log("❌ Product Fetch Error:", err);
//       }
//     };

//     loadProducts();
//   }, []);

//   // =========================
//   // SOCKET
//   // =========================
//   useEffect(() => {
//     socketRef.current = io("http://127.0.0.1:3001", {
//       transports: ["websocket", "polling"],
//     });

//     const socket = socketRef.current;

//     socket.on("connect", () => {
//       console.log("✅ Connected:", socket.id);
//     });

//     socket.on("updateUsers", (data) => {
//       setUsers(data);

//       setStats((prev) => ({
//         ...prev,
//         customers: data.length,
//       }));
//     });

//     // =========================
//     // NEW ORDER
//     // =========================
//     socket.on("newOrder", (data) => {
//       const order = data.order || data;
//       if (!order) return;

//       setOrders((prev) => [order, ...prev]);

//       let purchasedCount = 0;

//       // update stock
//       setProducts((prevProducts) =>
//         prevProducts.map((p) => {
//           const item = order.items?.find(
//             (i) => Number(i.productId) === Number(p.id)
//           );

//           if (item) {
//             purchasedCount += item.quantity;

//             return {
//               ...p,
//               stock: Math.max(0, p.stock - item.quantity),
//             };
//           }

//           return p;
//         })
//       );

//       setStats((prev) => ({
//         ...prev,
//         totalSales: prev.totalSales + Number(order.totalAmount || 0),
//         totalOrders: prev.totalOrders + 1,
//         products: Math.max(0, prev.products - purchasedCount),
//       }));

//       // =========================
//       // TOP PRODUCTS (FIXED)
//       // =========================
//       setTopProducts((prev) => {
//         const map = new Map();

//         // clone previous safely (NO mutation)
//         prev.forEach((p) => {
//           map.set(p.id, { ...p });
//         });

//         order.items?.forEach((item) => {
//           const id = item.productId;

//           const existing = map.get(id);

//           if (existing) {
//             map.set(id, {
//               ...existing,
//               quantity: existing.quantity + item.quantity,
//             });
//           } else {
//             map.set(id, {
//               id,
//               title:
//                 item.title.length > 20
//                   ? item.title.slice(0, 20) + "..."
//                   : item.title,
//               quantity: item.quantity,
//             });
//           }
//         });

//         return Array.from(map.values()).sort(
//           (a, b) => b.quantity - a.quantity
//         );
//       });
//     });

//     return () => socket.disconnect();
//   }, []);

//   // =========================
//   // UI COLOR
//   // =========================
//   const color = (status) => {
//     if (status === "CONFIRMED") return "green";
//     if (status === "PENDING") return "orange";
//     return "red";
//   };

//   return (
//     <div style={{ display: "flex", fontFamily: "Arial" }}>
//       {/* SIDEBAR */}
//       <div style={{ width: 220, background: "#111", color: "#fff", padding: 20 }}>
//         <h2>AI Store</h2>
//         <p>Dashboard</p>
//       </div>

//       {/* MAIN */}
//       <div style={{ flex: 1, padding: 20 }}>
//         <h1>📊 Dashboard</h1>

//         {/* STATS */}
//         <div style={{ display: "flex", gap: 20 }}>
//           <Card title="Sales" value={`₹${stats.totalSales}`} />
//           <Card title="Orders" value={stats.totalOrders} />
//           <Card title="Users" value={stats.customers} />
//           <Card title="Products" value={stats.products} />
//         </div>

//         {/* CHART */}
//         <div style={{ marginTop: 30 }}>
//           <h3>🔥 Top Selling Products</h3>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={topProducts}>
//               <XAxis dataKey="title" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="quantity" fill="#ff4d4d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* PRODUCTS */}
//         <h3 style={{ marginTop: 40 }}>🛒 Product List</h3>

//         <table border="1" width="100%" cellPadding="10">
//           <thead>
//             <tr style={{ background: "#ddd" }}>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id}>
//                 <td>{p.id}</td>
//                 <td>{p.title}</td>
//                 <td>{p.category}</td>
//                 <td>₹{p.price}</td>
//                 <td>{p.stock}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* ORDERS */}
//         <h3 style={{ marginTop: 40 }}>🔥 Live Orders</h3>

//         <table border="1" width="100%" cellPadding="10">
//           <thead>
//             <tr style={{ background: "#ddd" }}>
//               <th>ID</th>
//               <th>Intent</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((o, i) => (
//               <tr key={o.orderId || i}>
//                 <td>{o.orderId}</td>
//                 <td>{o.intent}</td>
//                 <td>₹{o.totalAmount}</td>
//                 <td style={{ color: color(o.status) }}>
//                   {o.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* USERS */}
//         <h3 style={{ marginTop: 40 }}>👥 Users</h3>
//         {users.map((u, i) => (
//           <span key={i} style={{ marginRight: 10 }}>
//             {u}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// // =========================
// // CARD COMPONENT
// // =========================
// function Card({ title, value }) {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         padding: 20,
//         borderRadius: 10,
//         minWidth: 180,
//         boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h4>{title}</h4>
//       <h2>{value}</h2>
//     </div>
//   );
// }






// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function Dashboard() {
//   const socketRef = useRef(null);

//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);

//   const [stats, setStats] = useState({
//     totalSales: 0,
//     totalOrders: 0,
//     customers: 0,
//     products: 0,
//   });

//   // =========================
//   // FETCH PRODUCTS
//   // =========================
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await axios.get("https://fakestoreapi.com/products");

//         const updated = res.data.map((p) => ({
//           ...p,
//           stock: Math.floor(Math.random() * 50) + 10,
//         }));

//         setProducts(updated);

//         const totalStock = updated.reduce(
//           (sum, p) => sum + p.stock,
//           0
//         );

//         setStats((prev) => ({
//           ...prev,
//           products: totalStock,
//         }));
//       } catch (err) {
//         console.log("❌ Product Fetch Error:", err);
//       }
//     };

//     loadProducts();
//   }, []);

//   // =========================
//   // SOCKET
//   // =========================
//   useEffect(() => {
//     socketRef.current = io("http://127.0.0.1:3001", {
//       transports: ["websocket", "polling"],
//     });

//     const socket = socketRef.current;

//     socket.on("connect", () => {
//       console.log("✅ Connected:", socket.id);
//     });

//     socket.on("updateUsers", (data) => {
//       setUsers(data);

//       setStats((prev) => ({
//         ...prev,
//         customers: data.length,
//       }));
//     });

//     // =========================
//     // NEW ORDER
//     // =========================
//     socket.on("newOrder", (data) => {
//       const order = data.order || data;
//       if (!order) return;

//       setOrders((prev) => [order, ...prev]);

//       let purchasedCount = 0;

//       // update stock
//       setProducts((prevProducts) =>
//         prevProducts.map((p) => {
//           const item = order.items?.find(
//             (i) => Number(i.productId) === Number(p.id)
//           );

//           if (item) {
//             purchasedCount += item.quantity;

//             return {
//               ...p,
//               stock: Math.max(0, p.stock - item.quantity),
//             };
//           }

//           return p;
//         })
//       );

//       setStats((prev) => ({
//         ...prev,
//         totalSales: prev.totalSales + Number(order.totalAmount || 0),
//         totalOrders: prev.totalOrders + 1,
//         products: Math.max(0, prev.products - purchasedCount),
//       }));

//       // =========================
//       // TOP PRODUCTS (FIXED)
//       // =========================
//       setTopProducts((prev) => {
//         const map = new Map();

//         // clone previous safely (NO mutation)
//         prev.forEach((p) => {
//           map.set(p.id, { ...p });
//         });

//         order.items?.forEach((item) => {
//           const id = item.productId;

//           const existing = map.get(id);

//           if (existing) {
//             map.set(id, {
//               ...existing,
//               quantity: existing.quantity + item.quantity,
//             });
//           } else {
//             map.set(id, {
//               id,
//               title:
//                 item.title.length > 20
//                   ? item.title.slice(0, 20) + "..."
//                   : item.title,
//               quantity: item.quantity,
//             });
//           }
//         });

//         return Array.from(map.values()).sort(
//           (a, b) => b.quantity - a.quantity
//         );
//       });
//     });

//     return () => socket.disconnect();
//   }, []);

//   // =========================
//   // UI COLOR
//   // =========================
//   const color = (status) => {
//     if (status === "CONFIRMED") return "green";
//     if (status === "PENDING") return "orange";
//     return "red";
//   };

//   return (
//     <div style={{ display: "flex", fontFamily: "Arial" }}>
//       {/* SIDEBAR */}
//       <div style={{ width: 220, background: "#111", color: "#fff", padding: 20 }}>
//         <h2>AI Store</h2>
//         <p>Dashboard</p>
//       </div>

//       {/* MAIN */}
//       <div style={{ flex: 1, padding: 20 }}>
//         <h1>📊 Dashboard</h1>

//         {/* STATS */}
//         <div style={{ display: "flex", gap: 20 }}>
//           <Card title="Sales" value={`₹${stats.totalSales}`} />
//           <Card title="Orders" value={stats.totalOrders} />
//           <Card title="Users" value={stats.customers} />
//           <Card title="Products" value={stats.products} />
//         </div>

//         {/* CHART */}
//         <div style={{ marginTop: 30 }}>
//           <h3>🔥 Top Selling Products</h3>

//          <ResponsiveContainer width="100%" height={300}>
//   <BarChart data={topProducts}>
//     <XAxis dataKey="title" />
//     <YAxis />
//     <Tooltip />
//     <Bar
//       dataKey="quantity"
//       fill="#ff4d4d"
//       barSize={50}   // 👈 REDUCED BAR WIDTH
//     />
//   </BarChart>
// </ResponsiveContainer>
//         </div>

//         {/* PRODUCTS */}
//         <h3 style={{ marginTop: 40 }}>🛒 Product List</h3>

//         <table border="1" width="100%" cellPadding="10">
//           <thead>
//             <tr style={{ background: "#ddd" }}>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id}>
//                 <td>{p.id}</td>
//                 <td>{p.title}</td>
//                 <td>{p.category}</td>
//                 <td>₹{p.price}</td>
//                 <td>{p.stock}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* ORDERS */}
//         <h3 style={{ marginTop: 40 }}>🔥 Live Orders</h3>

//         <table border="1" width="100%" cellPadding="10">
//           <thead>
//             <tr style={{ background: "#ddd" }}>
//               <th>ID</th>
//               <th>Intent</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((o, i) => (
//               <tr key={o.orderId || i}>
//                 <td>{o.orderId}</td>
//                 <td>{o.intent}</td>
//                 <td>₹{o.totalAmount}</td>
//                 <td style={{ color: color(o.status) }}>
//                   {o.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* USERS */}
//         <h3 style={{ marginTop: 40 }}>👥 Users</h3>
//         {users.map((u, i) => (
//           <span key={i} style={{ marginRight: 10 }}>
//             {u}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// // =========================
// // CARD COMPONENT
// // =========================
// function Card({ title, value }) {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         padding: 20,
//         borderRadius: 10,
//         minWidth: 180,
//         boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h4>{title}</h4>
//       <h2>{value}</h2>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// =========================
// INVENTORY DATA
// =========================
const inventoryData = [
  { id: 1, stock: 120, soldPerDay: 3 },
  { id: 2, stock: 95, soldPerDay: 4 },
  { id: 3, stock: 140, soldPerDay: 5 },
  { id: 4, stock: 80, soldPerDay: 2 },
  { id: 5, stock: 60, soldPerDay: 1 },
  { id: 6, stock: 45, soldPerDay: 1 },
  { id: 7, stock: 100, soldPerDay: 2 },
  { id: 8, stock: 70, soldPerDay: 2 },
  { id: 9, stock: 90, soldPerDay: 3 },
  { id: 10, stock: 110, soldPerDay: 4 },
  { id: 11, stock: 85, soldPerDay: 3 },
  { id: 12, stock: 75, soldPerDay: 2 },
  { id: 13, stock: 50, soldPerDay: 1 },
  { id: 14, stock: 40, soldPerDay: 1 },
  { id: 15, stock: 65, soldPerDay: 2 },
  { id: 16, stock: 55, soldPerDay: 2 },
  { id: 17, stock: 130, soldPerDay: 5 },
  { id: 18, stock: 95, soldPerDay: 3 },
  { id: 19, stock: 105, soldPerDay: 4 },
  { id: 20, stock: 115, soldPerDay: 4 },
];

// =========================
// PREDICTION
// =========================
function predictStock(stock, soldPerDay) {
  return Math.max(0, stock - soldPerDay * 30);
}

// =========================
// DASHBOARD
// =========================
export default function Dashboard() {
  const socketRef = useRef(null);

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    customers: 0,
    products: 0,
  });

  // 🔥 NEW: track dynamic soldPerDay per product
  const [salesMap, setSalesMap] = useState({});

  // =========================
  // LOAD PRODUCTS
  // =========================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");

        const updated = res.data.map((p) => {
          const inv = inventoryData.find((i) => i.id === p.id);

          return {
            ...p,
            stock: inv?.stock || 50,
            soldPerDay: inv?.soldPerDay || 1,
            predictedStock: predictStock(
              inv?.stock || 50,
              inv?.soldPerDay || 1
            ),
          };
        });

        setProducts(updated);

        setStats((prev) => ({
          ...prev,
          products: updated.reduce((a, b) => a + b.stock, 0),
        }));
      } catch (err) {
        console.log(err);
      }
    };

    loadProducts();
  }, []);

  // =========================
  // SOCKET
  // =========================
  useEffect(() => {
    socketRef.current = io("http://127.0.0.1:3001");
    const socket = socketRef.current;

    // USERS
    socket.on("updateUsers", (data) => {
      setUsers(data);
      setStats((p) => ({ ...p, customers: data.length }));
    });

    // =========================
    // NEW ORDER (FIXED LOGIC)
    // =========================
    socket.on("newOrder", (data) => {
      const order = data.order ?? data;
      if (!order?.items) return;

      setOrders((prev) => [order, ...prev]);

      let purchasedCount = 0;

      setProducts((prevProducts) =>
        prevProducts.map((p) => {
          const item = order.items.find(
            (i) => Number(i.productId) === Number(p.id)
          );

          if (!item) return p;

          purchasedCount += item.quantity;

          const newStock = Math.max(0, p.stock - item.quantity);

          // 🔥 FIX: dynamic soldPerDay
          const prevSold = salesMap[p.id] || p.soldPerDay || 0;
          const updatedSold = prevSold + item.quantity;

          return {
            ...p,
            stock: newStock,
            soldPerDay: updatedSold,
            predictedStock: predictStock(newStock, updatedSold),
          };
        })
      );

      // update sales map
      setSalesMap((prev) => {
        const updated = { ...prev };

        order.items.forEach((item) => {
          updated[item.productId] =
            (updated[item.productId] || 0) + item.quantity;
        });

        return updated;
      });

      setStats((prev) => ({
        ...prev,
        totalSales: prev.totalSales + Number(order.totalAmount || 0),
        totalOrders: prev.totalOrders + 1,
        products: Math.max(0, prev.products - purchasedCount),
      }));
    });

    return () => socket.disconnect();
  }, [salesMap]);

  // =========================
  // UI (UNCHANGED)
  // =========================
  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>
      {/* SIDEBAR */}
      <div style={{ width: 220, background: "#111", color: "#fff", padding: 20 }}>
        <h2>AI Store</h2>
        <p>Dashboard</p>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: 20, background: "#f5f5f5" }}>
        <h1>📊 Dashboard</h1>

        {/* STATS */}
        <div style={{ display: "flex", gap: 20 }}>
          <Card title="Sales" value={`₹${stats.totalSales}`} />
          <Card title="Orders" value={stats.totalOrders} />
          <Card title="Users" value={stats.customers} />
          <Card title="Products" value={stats.products} />
        </div>

        {/* PRODUCTS TABLE */}
        <div style={{ marginTop: 40, background: "#fff", padding: 20 }}>
          <h3>🛒 Products</h3>

          <table border="1" width="100%" cellPadding="10">
            <thead style={{ background: "#222", color: "#fff" }}>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Stock</th>
                <th>Sold/Day</th>
                <th>Predicted Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.stock}</td>
                  <td>{p.soldPerDay}</td>

                  <td style={{ fontWeight: "bold" }}>
                    {p.predictedStock}
                  </td>

                  <td>
                    {p.predictedStock < 20 ? (
                      <span style={{ color: "red" }}>⚠️ Low</span>
                    ) : (
                      <span style={{ color: "green" }}>OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* USERS */}
        <div style={{ marginTop: 40 }}>
          <h3>👥 Users</h3>
          {users.map((u, i) => (
            <span key={i} style={{ marginRight: 10 }}>
              {u}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================
// CARD
// =========================
function Card({ title, value }) {
  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}