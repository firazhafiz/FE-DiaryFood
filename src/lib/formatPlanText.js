// src/lib/formatPlanText.js
export const formatPlanText = (text) => {
  // Pisahkan teks menjadi baris
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  // Variabel untuk menyimpan elemen JSX
  const formattedElements = [];
  let currentList = [];

  // Fungsi untuk menutup list jika ada
  const closeList = () => {
    if (currentList.length > 0) {
      formattedElements.push(
        <ul key={`list-${formattedElements.length}`} className="list-disc pl-6 space-y-2">
          {currentList.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  // Proses setiap baris
  lines.forEach((line, index) => {
    // Deteksi heading (misalnya **Minggu 1: ...**)
    if (line.match(/^\*\*.*\*\*$/)) {
      closeList();
      const headingText = line.replace(/\*\*/g, "").trim();
      currentSection = headingText;
      formattedElements.push(
        <h2 key={index} className="text-xl font-bold text-slate-700 mt-6 mb-4">
          {headingText}
        </h2>
      );
    }
    // Deteksi subheading (misalnya * **Tujuan:** ...)
    else if (line.match(/^\* \*\*.*\*\*/)) {
      closeList();
      const subheadingText = line
        .replace(/^\* \*\*/, "")
        .replace(/\*\*/, "")
        .trim();
      formattedElements.push(
        <h3 key={index} className="text-xl font-semibold text-gray-800 mt-4 mb-2">
          {subheadingText}
        </h3>
      );
    }
    // Deteksi item list (misalnya * **Hari 1-2:** ...)
    else if (line.match(/^\* \*\*.*\*\*/)) {
      const itemText = line
        .replace(/^\* \*\*/, "")
        .replace(/\*\*/, "")
        .trim();
      currentList.push(<span>{itemText}</span>);
    }
    // Deteksi sub-item list (misalnya * ...)
    else if (line.match(/^\* /)) {
      const itemText = line.replace(/^\* /, "").trim();
      currentList.push(<span>{itemText}</span>);
    }
    // Deteksi teks biasa dengan bold (misalnya **Konsisten:** ...)
    else if (line.match(/^\*\*.*\*\*/)) {
      closeList();
      const boldText = line.replace(/\*\*/g, "").trim();
      formattedElements.push(
        <p key={index} className="font-semibold text-gray-800 mt-2">
          {boldText}
        </p>
      );
    }
    // Teks biasa lainnya
    else {
      closeList();
      formattedElements.push(
        <p key={index} className="text-gray-600 mt-2">
          {line}
        </p>
      );
    }
  });

  // Tutup list terakhir jika ada
  closeList();

  return <div className="prose max-w-none">{formattedElements}</div>;
};
