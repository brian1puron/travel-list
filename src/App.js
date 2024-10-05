import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];
///////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function App() {
  const [items, setItems] = useState([]); // Initial state will be an empty array

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    console.log(id);
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAdditems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function Logo() {
  return <h1>🌴 Far Away 🛍️</h1>;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function Form({ onAdditems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // how to stop the default of the site reloading everytime when we submit by clikcing add form

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAdditems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* this is hjow to make an array  */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start Adding some items to your packing list🚀</em>
      </p>
    );

  const numItems = items.length;
  const numpacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numpacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 //Below i gotta use `` so that the variables in $ would display correctly
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} items on your list, and you already packed ${numpacked} (${percentage}%) `}
      </em>
    </footer>
  );
}
