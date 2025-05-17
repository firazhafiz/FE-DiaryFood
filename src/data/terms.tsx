import { ReactNode } from "react";

export const terms: { title: string; content: ReactNode }[] = [
  {
    title: "1. Pendahuluan",
    content: (
      <p>
        Selamat datang di{" "}
        <span className="text-[color:var(--custom-orange)]">DiaryFood</span>,
        website penyedia resep makanan dan minuman. Dengan mengakses dan
        menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan
        menyetujui seluruh syarat dan ketentuan yang berlaku di bawah ini.
      </p>
    ),
  },
  {
    title: "2. Definisi",
    content: (
      <ul className="list-disc pl-5">
        <li>
          <b>DiaryFood</b>: Website yang menyediakan berbagai resep makanan dan
          minuman, tips memasak, serta fitur komunitas.
        </li>
        <li>
          <b>Pengguna</b>: Setiap orang yang mengakses, mendaftar, atau
          menggunakan layanan DiaryFood.
        </li>
        <li>
          <b>Konten</b>: Segala informasi, resep, gambar, video, dan materi lain
          yang tersedia di DiaryFood.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Ketentuan Penggunaan",
    content: (
      <ul className="list-decimal pl-5">
        <li>
          Pengguna wajib memberikan data yang benar dan dapat
          dipertanggungjawabkan saat mendaftar atau menggunakan layanan.
        </li>
        <li>
          Dilarang mengunggah, membagikan, atau mempublikasikan konten yang
          melanggar hukum, SARA, pornografi, atau hak cipta pihak lain.
        </li>
        <li>
          Pengguna bertanggung jawab penuh atas konten yang diunggah atau
          dibagikan melalui akun masing-masing.
        </li>
        <li>
          DiaryFood berhak menghapus konten atau menonaktifkan akun yang
          melanggar ketentuan tanpa pemberitahuan sebelumnya.
        </li>
      </ul>
    ),
  },
  {
    title: "4. Hak & Kewajiban Pengguna",
    content: (
      <ul className="list-disc pl-5">
        <li>
          Berhak mengakses, mencari, dan menggunakan resep serta fitur yang
          tersedia sesuai ketentuan.
        </li>
        <li>Bertanggung jawab menjaga kerahasiaan akun dan password.</li>
        <li>
          Bertanggung jawab atas seluruh aktivitas yang dilakukan melalui akun
          pribadi.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Hak & Kewajiban DiaryFood",
    content: (
      <ul className="list-disc pl-5">
        <li>
          Berhak mengelola, mengubah, atau menghapus konten yang dianggap
          melanggar ketentuan.
        </li>
        <li>
          Berhak melakukan pembaruan, penambahan, atau penghapusan fitur tanpa
          pemberitahuan sebelumnya.
        </li>
        <li>
          Berkewajiban menjaga keamanan data pengguna sesuai kebijakan privasi.
        </li>
      </ul>
    ),
  },
  {
    title: "6. Konten & Hak Cipta",
    content: (
      <ul className="list-disc pl-5">
        <li>
          Seluruh konten yang diunggah oleh pengguna menjadi tanggung jawab
          masing-masing pengguna.
        </li>
        <li>
          DiaryFood dapat menggunakan, menampilkan, atau membagikan konten
          pengguna untuk keperluan promosi dengan tetap mencantumkan kredit.
        </li>
        <li>
          Dilarang menyalin, mendistribusikan, atau memanfaatkan konten
          DiaryFood tanpa izin tertulis.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Batasan Tanggung Jawab",
    content: (
      <ul className="list-disc pl-5">
        <li>
          DiaryFood tidak bertanggung jawab atas kerugian atau kerusakan akibat
          penggunaan resep atau informasi di website.
        </li>
        <li>
          Resep dan tips yang tersedia hanya sebagai referensi, hasil dapat
          berbeda tergantung bahan dan cara memasak masing-masing.
        </li>
      </ul>
    ),
  },
  {
    title: "8. Perubahan Syarat & Ketentuan",
    content: (
      <p>
        DiaryFood berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
        Perubahan akan diinformasikan melalui website. Pengguna disarankan untuk
        memeriksa halaman ini secara berkala.
      </p>
    ),
  },
  {
    title: "9. Kontak",
    content: (
      <p>
        Jika ada pertanyaan atau masukan terkait syarat dan ketentuan, silakan
        hubungi kami melalui halaman <b>Contact Us</b>.
      </p>
    ),
  },
];
