// import * as tf from "@tensorflow/tfjs";
// import { useEffect, useState } from "react";

// export default function ForecastWidget({ salesData }) {
//   const [prediction, setPrediction] = useState([]);

//   useEffect(() => {
//     runModel();
//   }, [salesData]);

//   const runModel = async () => {
//     if (!salesData || salesData.length < 5) return;

//     // convert to tensor (index + value helps learning)
//     const xs = tf.tensor2d(
//       salesData.map((v, i) => [i, v]),
//       [salesData.length, 2]
//     );

//     const ys = tf.tensor2d(salesData, [salesData.length, 1]);

//     const model = tf.sequential();

//     model.add(tf.layers.dense({ units: 16, inputShape: [2] }));
//     model.add(tf.layers.dense({ units: 1 }));

//     model.compile({
//       optimizer: "adam",
//       loss: "meanSquaredError",
//     });

//     await model.fit(xs, ys, {
//       epochs: 150,
//       verbose: 0,
//     });

//     // predict next 7 days
//     const future = [];

//     for (let i = salesData.length; i < salesData.length + 7; i++) {
//       const input = tf.tensor2d([[i, salesData[salesData.length - 1] || 0]]);
//       const pred = model.predict(input);
//       const value = (await pred.data())[0];

//       future.push(Math.max(0, Math.round(value)));
//     }

//     setPrediction(future);
//   };

//   return (
//     <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
//       <h3>📈 AI Sales Forecast (TensorFlow.js)</h3>

//       {prediction.length === 0 && <p>Training model...</p>}

//       {prediction.map((p, i) => (
//         <div key={i}>
//           Day {i + 1}: <b>{p}</b> sales
//         </div>
//       ))}
//     </div>
//   );
// }





















import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

// ===============================
// INVENTORY DATA
// ===============================
const inventoryData = [
  {
    id: 1,
    title: "Fjallraven Backpack",
    stock: 120,
    soldPerDay: 3,
  },
  {
    id: 2,
    title: "Mens Casual Premium T-Shirts",
    stock: 95,
    soldPerDay: 4,
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    stock: 140,
    soldPerDay: 5,
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    stock: 80,
    soldPerDay: 2,
  },
  {
    id: 5,
    title: "John Hardy Women's Bracelet",
    stock: 60,
    soldPerDay: 1,
  },
  {
    id: 6,
    title: "Solid Gold Petite",
    stock: 45,
    soldPerDay: 1,
  },
  {
    id: 7,
    title: "White Gold Princess Ring",
    stock: 100,
    soldPerDay: 2,
  },
  {
    id: 8,
    title: "Rose Gold Earrings",
    stock: 70,
    soldPerDay: 2,
  },
  {
    id: 9,
    title: "WD 2TB Hard Drive",
    stock: 90,
    soldPerDay: 3,
  },
  {
    id: 10,
    title: "SanDisk SSD 1TB",
    stock: 110,
    soldPerDay: 4,
  },
  {
    id: 11,
    title: "Silicon Power SSD",
    stock: 85,
    soldPerDay: 3,
  },
  {
    id: 12,
    title: "WD 4TB Gaming Drive",
    stock: 75,
    soldPerDay: 2,
  },
  {
    id: 13,
    title: "Acer Monitor",
    stock: 50,
    soldPerDay: 1,
  },
  {
    id: 14,
    title: "Samsung Gaming Monitor",
    stock: 40,
    soldPerDay: 1,
  },
  {
    id: 15,
    title: "Women's Snowboard Jacket",
    stock: 65,
    soldPerDay: 2,
  },
  {
    id: 16,
    title: "Women's Leather Jacket",
    stock: 55,
    soldPerDay: 2,
  },
  {
    id: 17,
    title: "Women's Rain Jacket",
    stock: 130,
    soldPerDay: 5,
  },
  {
    id: 18,
    title: "Women's Boat Neck Shirt",
    stock: 95,
    soldPerDay: 3,
  },
  {
    id: 19,
    title: "Women's Moisture T-Shirt",
    stock: 105,
    soldPerDay: 4,
  },
  {
    id: 20,
    title: "Women's Casual Cotton T-Shirt",
    stock: 115,
    soldPerDay: 4,
  },
];

// ===============================
// FORECAST COMPONENT
// ===============================
export default function ForecastWidget() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    runForecast();
  }, []);

  // ===============================
  // AI FORECAST
  // ===============================
  const runForecast = async () => {
    const updatedProducts = [];

    for (const product of inventoryData) {
      // Create simple sales history
      const salesHistory = [];

      for (let i = 0; i < 10; i++) {
        salesHistory.push(
          product.stock - i * product.soldPerDay
        );
      }

      // Normalize
      const maxVal = Math.max(...salesHistory);
      const minVal = Math.min(...salesHistory);

      const normalize = (v) =>
        (v - minVal) / (maxVal - minVal);

      const denormalize = (v) =>
        v * (maxVal - minVal) + minVal;

      // Training tensors
      const xs = tf.tensor2d(
        salesHistory.map((v, i) => [
          i / salesHistory.length,
          normalize(v),
        ]),
        [salesHistory.length, 2]
      );

      const ys = tf.tensor2d(
        salesHistory.map((v) => [normalize(v)]),
        [salesHistory.length, 1]
      );

      // Model
      const model = tf.sequential();

      model.add(
        tf.layers.dense({
          units: 16,
          activation: "relu",
          inputShape: [2],
        })
      );

      model.add(
        tf.layers.dense({
          units: 8,
          activation: "relu",
        })
      );

      model.add(tf.layers.dense({ units: 1 }));

      model.compile({
        optimizer: tf.train.adam(0.01),
        loss: "meanSquaredError",
      });

      // Train
      await model.fit(xs, ys, {
        epochs: 100,
        verbose: 0,
      });

      // Predict 30 days
      let lastValue = normalize(
        salesHistory[salesHistory.length - 1]
      );

      const future = [];

      for (let i = 0; i < 30; i++) {
        const input = tf.tensor2d([
          [(salesHistory.length + i) / salesHistory.length, lastValue],
        ]);

        const output = model.predict(input);

        const pred = (await output.data())[0];

        lastValue = pred;

        future.push(
          Math.max(0, Math.round(denormalize(pred)))
        );

        tf.dispose([input, output]);
      }

      updatedProducts.push({
        ...product,
        prediction30Days:
          future[future.length - 1],
      });

      tf.dispose([xs, ys, model]);
    }

    setProducts(updatedProducts);
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1>📦 AI Inventory Forecast Dashboard</h1>

      <table
        border="1"
        width="100%"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          background: "#fff",
          marginTop: 20,
        }}
      >
        <thead
          style={{
            background: "#222",
            color: "#fff",
          }}
        >
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Current Stock</th>
            <th>Daily Sales</th>

            {/* EXTRA COLUMN */}
            <th>Predicted Stock After 30 Days</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>{p.title}</td>

              <td>{p.stock}</td>

              <td>{p.soldPerDay}/day</td>

              {/* FORECAST COLUMN */}
              <td
                style={{
                  color:
                    p.prediction30Days < 20
                      ? "red"
                      : "green",
                  fontWeight: "bold",
                }}
              >
                {p.prediction30Days}
              </td>

              <td>
                {p.prediction30Days < 20 ? (
                  <span style={{ color: "red" }}>
                    ⚠️ Low Stock
                  </span>
                ) : (
                  <span style={{ color: "green" }}>
                    ✅ Healthy
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}