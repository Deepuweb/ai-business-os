import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import Customer from "../models/Customer.js";

// ============================================================
// YE FILE PROJECT KA "AI BRAIN" HAI.
// Document mein jo "getTodaySales()", "getLowStockProducts()" etc
// functions ka zikr tha, wo yahan actually implement hue hain.
//
// AI khud MongoDB ko directly query nahi karta - AI sirf decide
// karta hai "mujhe kaunsa function chahiye", aur ye functions
// asli data nikaal ke AI ko wapas dete hain.
// ============================================================

// 1. Aaj ki total sales nikalo
export const getTodaySales = async (ownerId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const sales = await Sale.find({ owner: ownerId, createdAt: { $gte: startOfDay } });
  const total = sales.reduce((sum, s) => sum + s.total, 0);

  return { totalSales: total, numberOfOrders: sales.length };
};

// 2. Kaunsa stock kam hai (quantity <= lowStockLimit)
export const getLowStockProducts = async (ownerId) => {
  const products = await Product.find({ owner: ownerId });
  const lowStock = products
    .filter((p) => p.quantity <= p.lowStockLimit)
    .map((p) => ({ name: p.name, quantity: p.quantity, unit: p.unit }));

  return { lowStockProducts: lowStock };
};

// 3. Is mahine sabse zyada bikne wale products
export const getTopProducts = async (ownerId) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const sales = await Sale.find({ owner: ownerId, createdAt: { $gte: startOfMonth } });

  const totals = {};
  sales.forEach((s) => {
    totals[s.productName] = (totals[s.productName] || 0) + s.quantity;
  });

  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, unitsSold]) => ({ name, unitsSold }));

  return { topProducts: sorted };
};

// 4. Is mahine ki total sales (monthly summary)
export const getMonthlySales = async (ownerId) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const sales = await Sale.find({ owner: ownerId, createdAt: { $gte: startOfMonth } });
  const total = sales.reduce((sum, s) => sum + s.total, 0);
  const customers = new Set(sales.map((s) => String(s.customer)).filter(Boolean));

  return {
    totalSales: total,
    totalOrders: sales.length,
    uniqueCustomers: customers.size,
  };
};

// 5. Ek specific customer ke last orders
export const getCustomerOrders = async (ownerId, customerName) => {
  const customer = await Customer.findOne({
    owner: ownerId,
    name: new RegExp(customerName, "i"), // case-insensitive naam match
  });

  if (!customer) return { error: `Customer "${customerName}" not found` };

  const orders = await Sale.find({ owner: ownerId, customer: customer._id })
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    customer: customer.name,
    recentOrders: orders.map((o) => ({
      product: o.productName,
      quantity: o.quantity,
      total: o.total,
      date: o.createdAt.toISOString().split("T")[0],
    })),
  };
};

// Registry - function ka naam string se map hota hai
// AI response mein function ka "naam" bhejega, hum yahan se dhoondh lenge
export const businessFunctions = {
  getTodaySales,
  getLowStockProducts,
  getTopProducts,
  getMonthlySales,
  getCustomerOrders,
};

// AI ko batane ke liye ki kaunse functions available hain aur unke
// parameters kya hain (Groq API ke "tools" format mein)
export const toolDefinitions = [
  {
    type: "function",
    function: {
      name: "getTodaySales",
      description: "Get today's total sales amount and number of orders",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "getLowStockProducts",
      description: "Get list of products that are low in stock or about to run out",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "getTopProducts",
      description: "Get the top-selling products for the current month",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "getMonthlySales",
      description: "Get this month's total sales, orders and unique customers",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "getCustomerOrders",
      description: "Get recent orders of a specific customer by name",
      parameters: {
        type: "object",
        properties: {
          customerName: { type: "string", description: "Name of the customer" },
        },
        required: ["customerName"],
      },
    },
  },
];
