const InventoryRepository = (() => {
  const API = "/api/products";

  // GET - Retrieve
  async function getAll() {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to load products");
    return res.json();
  }

  async function getById(id) {
    const all = await getAll();
    return all.find(p => String(p.id) === String(id)) || null;
  }

  // POST - Insert
  async function add(product) {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to add product");
    return result;
  }

  // Not integrated yet (no PUT/DELETE endpoints)
  async function update() {
    throw new Error("Update is not available yet");
  }

  async function remove() {
    throw new Error("Delete is not available yet");
  }

  async function stats() {
    const products = await getAll();
    const totalItems = products.length;
    const totalUnits = products.reduce((sum, p) => sum + Number(p.quantity), 0);
    const totalValue = products.reduce((sum, p) => sum + Number(p.quantity) * Number(p.unitPrice), 0);
    const lowStock = products.filter(p => Number(p.quantity) <= Number(p.reorderLevel));
    return { totalItems, totalUnits, totalValue, lowStock };
  }

  return { getAll, getById, add, update, remove, stats };
})();