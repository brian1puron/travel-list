export default function Stats({ items }) {
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
