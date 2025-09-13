const categories = [
  "Massage Therapy",
  "Hair Cut Wash & Style",
  "Nail Bar",
  "Manicure & Pedicure",
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`btn-pill ${
            selected === cat ? "bg-[#1A1A1A] text-white border-brand" : ""
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
