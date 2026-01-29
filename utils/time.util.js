function formatUIDate(date) {
  const d = new Date(date);

  const month = d.toLocaleString("en-US", { month: "short" }); // Nov
  const day = d.getDate(); // 11
  const year = d.getFullYear(); // 2025

  const suffix =
    day === 1 || day === 21 || day === 31 ? "st" :
    day === 2 || day === 22 ? "nd" :
    day === 3 || day === 23 ? "rd" : "th";

  return `${month} ${day}${suffix} ${year}`;
}


export {formatUIDate};