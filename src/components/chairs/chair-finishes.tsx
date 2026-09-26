// PLACEHOLDER SWATCHES — indicative colours only; replace with the stocked
// range and real swatch photography when it is available.
const groups = [
  {
    title: "Upholstery",
    note: "Mesh for airflow, fabric for warmth, leather for presence.",
    swatches: [
      { name: "Onyx mesh", fill: "#1f2124" },
      { name: "Graphite mesh", fill: "#5d6166" },
      { name: "Oat fabric", fill: "#cdbfa6" },
      { name: "Harbour fabric", fill: "#3f5166" },
      { name: "Moss fabric", fill: "#5f6b4e" },
      { name: "Espresso leather", fill: "#3b2a22" },
      { name: "Cognac leather", fill: "#8b4a2b" },
      { name: "Ivory leather", fill: "#ece3d2" },
    ],
  },
  {
    title: "Frames & bases",
    note: "From hard-wearing nylon to polished aluminium and solid wood.",
    swatches: [
      { name: "Black nylon", fill: "#1b1c1e" },
      { name: "Chrome", fill: "linear-gradient(135deg,#f4f5f6 0%,#9ea3a8 45%,#e9ebed 60%,#7d8389 100%)" },
      { name: "Polished aluminium", fill: "linear-gradient(135deg,#dfe2e4 0%,#b8bdc1 50%,#eef0f1 100%)" },
      { name: "White frame", fill: "#f1efea" },
      { name: "Oak", fill: "#b98b5b" },
      { name: "Walnut", fill: "#5a3b26" },
    ],
  },
];

const arms = ["Armless", "Fixed", "Flip-up", "2D adjustable", "3D adjustable"];

/** "Specify it your way": the finishes a chair order can be built in. */
export function ChairFinishes() {
  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
      {groups.map((group) => (
        <div key={group.title} className="lg:col-span-4">
          <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/50">{group.title}</h3>
          <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-ivory/65">{group.note}</p>
          <ul className="mt-8 grid grid-cols-4 gap-x-3 gap-y-6" data-reveal="stagger">
            {group.swatches.map((swatch) => (
              <li key={swatch.name} className="group flex flex-col items-center text-center">
                <span
                  aria-hidden
                  className="block h-12 w-12 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-ivory/15 transition-[scale,box-shadow] duration-500 ease-out group-hover:scale-110 group-hover:ring-gold md:h-14 md:w-14"
                  style={{ background: swatch.fill }}
                />
                <span className="mt-3 text-[11.5px] leading-tight text-ivory/70">{swatch.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="lg:col-span-4">
        <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/50">Armrests</h3>
        <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-ivory/65">
          Specified per order, from clean armless task chairs to fully adjustable 3D arms.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2.5" data-reveal="stagger">
          {arms.map((arm) => (
            <li
              key={arm}
              className="rounded-full border border-ivory/20 px-4 py-2 text-[13px] text-ivory/85 transition-colors duration-300 hover:border-gold hover:text-ivory"
            >
              {arm}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
