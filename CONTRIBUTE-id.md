# Panduan Berkontribusi

Silakan baca dengan cermat cara berkontribusi pada proyek ini.

## Berkontribusi

- Fork repositori ini (https://github.com/kokodingin/neostrap-core/fork).
- Buat branch fitur Anda (`git checkout -b fitur-baru-saya`).
- Commit perubahan Anda (`git commit -am 'Menambahkan fitur'`).
- Push ke branch (`git push origin fitur-baru-saya`).
- Buat Pull Request baru.
- Admin akan memeriksa dan meninjau kode Anda sebelum menggabungkannya.

## Catatan

Pastikan untuk tidak meng-commit file yang dihasilkan dari folder `dist` Anda.
Semua perubahan harus dilakukan di file sumber yang terletak di folder `src` dan file `vite.config.ts` jika diperlukan.

- Ubah file `scss` untuk menyesuaikan gaya.
- Edit file `html` berbasis Nunjucks atau file `json` penentu konten untuk menyesuaikan tata letak dan konten.
- Ubah file `js` dan `ts` untuk menyesuaikan kode aplikasi.
- Tambahkan gambar jika diperlukan saat menambahkan fitur.
- Tambahkan package baru jika diperlukan untuk fitur Anda.
- Sertakan aset tambahan jika diperlukan.
- ⚠️ Tambahkan [docblock](https://medium.com/kode-dan-kodean/latihan-membuat-dokumentasi-di-dalam-kode-dengan-jetbrains-ide-478b382c3d03) supaya jelas ketika akan dikembangkan oleh orang lain!
- ❌ Jangan hapus atau mengubah struktur folder dasar tanpa konfirmasi dengan pemilik atau admin!
- ❌ Jangan hapus file inti! Jika Anda perlu menambahkan ke file inti, buat file terpisah dan impor ke `main.ts` atau `neostrap.scss` sebelum melakukan push.

Selalu lakukan build dan uji hasilnya sebelum melakukan commit.

