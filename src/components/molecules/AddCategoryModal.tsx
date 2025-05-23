"use client";

import React, { useState } from "react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: { nama: string }) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [nama, setNama] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nama.trim()) {
      onAdd({ nama: nama.trim() });
      setNama("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tambah Kategori Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kategori
            </label>
            <input type="text" id="nama" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full px-3 py-2 border border-gray-300 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A5C]" required />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#FF7A5C] hover:bg-[#ff6b4a] rounded-lg">
              Tambah Kategori
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
