'use client';

import React, { useState } from 'react';
import { PackageCheck, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import { formatVND } from '@/lib/utils';

export default function AdminProductsPage() {
  const { products, toggleProductStock, upsertProduct } = useSpaDemo();
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('DermaBotanica Clinical');
  const [volume, setVolume] = useState('50ml');
  const [price, setPrice] = useState(590000);
  const [shortDesc, setShortDesc] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newProduct: Product = {
      id: `prd-${Date.now()}`,
      categoryId: 'cat-p1',
      categoryName: 'Tinh chất phục hồi (Serum)',
      name: name.trim(),
      slug: `${slug}-${Date.now().toString().slice(-3)}`,
      brand: brand.trim(),
      volume: volume.trim(),
      origin: 'Hàn Quốc',
      shortDesc: shortDesc.trim() || 'Sản phẩm chính hãng đang trưng bày và tư vấn tại quầy Mai Đinh Spa.',
      description: shortDesc.trim() || 'Dược mỹ phẩm chuyên sâu được tuyển chọn tại Mai Đinh Spa.',
      keyIngredients: ['Panthenol B5', 'Chiết xuất Rau má', 'Ceramide NP'],
      skinTypes: ['Mọi loại da, kể cả da nhạy cảm'],
      usageGuide: 'Thoa đều sáng và tối sau bước làm sạch theo hướng dẫn của chuyên viên Spa.',
      price,
      imageUrl: '/images/product-bottle.svg',
      isFeatured: true,
      inStock: true,
      isActive: true,
    };

    upsertProduct(newProduct);
    setName('');
    setShortDesc('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Sản phẩm Bán lẻ Trưng bày
          </h1>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Cập nhật trạng thái Còn hàng / Tạm hết hàng tại quầy (chỉ trưng bày tư vấn, không có giỏ hàng online).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-5 py-2 text-xs font-semibold text-[var(--btn-primary-text)]"
        >
          <Plus className="h-4 w-4" />
          {showForm ? 'Đóng biểu mẫu' : 'Thêm sản phẩm trưng bày'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddProduct}
          className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface-card)] p-6 space-y-4"
        >
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            Đăng sản phẩm mới lên kệ trưng bày
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label htmlFor="prd-name" className="block text-xs font-semibold text-[var(--text-primary)]">
                Tên sản phẩm <span className="text-[#9E2A22]">*</span>
              </label>
              <input
                id="prd-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Tinh chất Phục hồi Cica Ampoule"
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm"
              />
            </div>

            <div>
              <label htmlFor="prd-price" className="block text-xs font-semibold text-[var(--text-primary)]">
                Giá niêm yết (VNĐ)
              </label>
              <input
                id="prd-price"
                type="number"
                min={50000}
                step={10000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="prd-brand" className="block text-xs font-semibold text-[var(--text-primary)]">
                Thương hiệu
              </label>
              <input
                id="prd-brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm"
              />
            </div>

            <div>
              <label htmlFor="prd-vol" className="block text-xs font-semibold text-[var(--text-primary)]">
                Dung tích / Quy cách
              </label>
              <input
                id="prd-vol"
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm"
              />
            </div>

            <div>
              <label htmlFor="prd-desc" className="block text-xs font-semibold text-[var(--text-primary)]">
                Công dụng ngắn
              </label>
              <input
                id="prd-desc"
                type="text"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Cấp nước, làm dịu..."
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="h-10 rounded-full border border-[var(--border-strong)] px-5 text-xs font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="h-10 rounded-full bg-[#1F5C3E] px-6 text-xs font-semibold text-white"
            >
              Đăng lên kệ trưng bày
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)]">
        <div className="divide-y divide-[var(--border-subtle)]">
          {products.map((prd) => (
            <div
              key={prd.id}
              className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
            >
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)]">
                  {prd.brand} · {prd.volume}
                </p>
                <h3 className="mt-0.5 text-base font-bold text-[var(--text-primary)]">
                  {prd.name}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{prd.shortDesc}</p>
              </div>

              <div className="flex items-center gap-4 self-start sm:self-center tabular-nums">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  {formatVND(prd.price)}
                </span>

                <button
                  type="button"
                  onClick={() => toggleProductStock(prd.id)}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    prd.inStock
                      ? 'bg-[#E7F3EC] text-[#1F5C3E]'
                      : 'bg-[#EFECE6] text-[#575049]'
                  }`}
                >
                  <PackageCheck className="h-3.5 w-3.5" />
                  {prd.inStock ? 'Còn hàng tại Spa' : 'Tạm hết hàng'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
