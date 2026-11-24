'use client';

import React, { useState } from 'react';
import { Clock, Eye, EyeOff, Plus } from 'lucide-react';
import { Service } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import { formatVND } from '@/lib/utils';

export default function AdminServicesPage() {
  const { services, toggleServiceActive, upsertService } = useSpaDemo();
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState('Chăm sóc da chuyên sâu');
  const [price, setPrice] = useState(450000);
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [shortDesc, setShortDesc] = useState('');

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newService: Service = {
      id: `srv-${Date.now()}`,
      categoryId: 'cat-s1',
      categoryName,
      name: name.trim(),
      slug: `${slug}-${Date.now().toString().slice(-3)}`,
      shortDesc: shortDesc.trim() || 'Liệu trình mới cập nhật trên bảng giá Mai Đinh Spa.',
      description: shortDesc.trim() || 'Liệu trình chăm sóc chuyên sâu tại Mai Đinh Spa.',
      suitableFor: ['Mọi nền da cần thư giãn & phục hồi'],
      steps: [
        { stepNumber: 1, title: 'Làm sạch & Chuẩn bị nền da', description: 'Tẩy trang dịu nhẹ pH cân bằng.', durationNote: '15 phút' },
        { stepNumber: 2, title: 'Thực hiện liệu trình chính', description: 'Chăm sóc chuyên sâu theo phác đồ.', durationNote: '35 phút' },
        { stepNumber: 3, title: 'Khóa ẩm & Thư giãn kết thúc', description: 'Đắp mặt nạ dịu da và dùng trà ấm.', durationNote: '10 phút' },
      ],
      price,
      salePrice: null,
      durationMinutes,
      imageUrl: '/images/service-facial.svg',
      isFeatured: true,
      isActive: true,
    };

    upsertService(newService);
    setName('');
    setShortDesc('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Quản lý Dịch vụ &amp; Bảng giá
          </h1>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Thêm mới hoặc ẩn/hiện liệu trình trên trang Đặt lịch của khách hàng.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-5 py-2 text-xs font-semibold text-[var(--btn-primary-text)]"
        >
          <Plus className="h-4 w-4" />
          {showForm ? 'Đóng biểu mẫu' : 'Thêm liệu trình mới'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddService}
          className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface-card)] p-6 space-y-4"
        >
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            Thêm liệu trình dịch vụ mới
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="srv-name" className="block text-xs font-semibold text-[var(--text-primary)]">
                Tên dịch vụ <span className="text-[#9E2A22]">*</span>
              </label>
              <input
                id="srv-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Ủ trắng Thảo mộc Hoàng cung"
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm"
              />
            </div>

            <div>
              <label htmlFor="srv-cat" className="block text-xs font-semibold text-[var(--text-primary)]">
                Nhóm danh mục
              </label>
              <select
                id="srv-cat"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm"
              >
                <option value="Chăm sóc da chuyên sâu">Chăm sóc da chuyên sâu</option>
                <option value="Gội đầu dưỡng sinh Đông y">Gội đầu dưỡng sinh Đông y</option>
                <option value="Trị liệu cổ vai gáy & Body">Trị liệu cổ vai gáy &amp; Body</option>
              </select>
            </div>

            <div>
              <label htmlFor="srv-price" className="block text-xs font-semibold text-[var(--text-primary)]">
                Giá niêm yết (VNĐ)
              </label>
              <input
                id="srv-price"
                type="number"
                min={50000}
                step={10000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="srv-dur" className="block text-xs font-semibold text-[var(--text-primary)]">
                Thời lượng thực hiện (phút)
              </label>
              <input
                id="srv-dur"
                type="number"
                min={15}
                step={5}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="mt-1 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="srv-desc" className="block text-xs font-semibold text-[var(--text-primary)]">
                Mô tả ngắn hiển thị ngoài thẻ
              </label>
              <input
                id="srv-desc"
                type="text"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Tóm tắt công dụng nổi bật trong 1–2 câu..."
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
              Lưu &amp; Hiển thị lên Website
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)]">
        <div className="divide-y divide-[var(--border-subtle)]">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--accent-gold-text)]">
                    {srv.categoryName}
                  </span>
                  {!srv.isActive && (
                    <span className="rounded-full bg-[#EFECE6] px-2.5 py-0.5 text-[11px] font-semibold text-[#575049]">
                      Đang tạm ẩn trên Web
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-base font-bold text-[var(--text-primary)]">
                  {srv.name}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{srv.shortDesc}</p>
              </div>

              <div className="flex items-center gap-4 self-start sm:self-center tabular-nums">
                <div className="text-right">
                  <span className="block text-sm font-bold text-[var(--text-primary)]">
                    {formatVND(srv.salePrice ?? srv.price)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Clock className="h-3 w-3" />
                    {srv.durationMinutes} phút
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleServiceActive(srv.id)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-soft)]"
                >
                  {srv.isActive ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      Tạm ẩn
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5 text-[#1F5C3E]" />
                      Hiện lại
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
