import React from 'react';
import { SpaSettings } from '@/types';

interface PrivacyPolicyPageProps {
  settings: SpaSettings;
}

export default function PrivacyPolicyPage({ settings }: PrivacyPolicyPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-7 sm:p-11">
        <h1 className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl">
          Chính sách Bảo vệ Dữ liệu Cá nhân &amp; Hồ sơ Chăm sóc Da
        </h1>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Áp dụng tại {settings.spaName} · Cập nhật tuân thủ Luật Bảo vệ dữ liệu cá nhân 2025
        </p>

        <div className="mt-7 space-y-6 text-[15px] leading-[1.75] text-[var(--text-secondary)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              1. Phạm vi thông tin thu thập
            </h2>
            <p className="mt-2">
              Khi bạn đặt lịch hẹn hoặc đăng ký thẻ thành viên thân thiết tại {settings.spaName}, chúng tôi chỉ thu thập các thông tin thiết yếu gồm: Họ tên, Số điện thoại liên hệ, Địa chỉ Email (tùy chọn), Ngày sinh (tùy chọn nhận quà sinh nhật) và các lưu ý về tình trạng da hoặc dị ứng tinh dầu do chính bạn cung cấp.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              2. Bảo mật ghi chú tình trạng làn da &amp; sức khỏe trị liệu
            </h2>
            <p className="mt-2">
              Mọi ghi chú chuyên môn về cơ địa, nền da nhạy cảm hoặc tiền sử kích ứng mỹ phẩm được phân loại là dữ liệu nhạy cảm, chỉ hiển thị nội bộ cho Quản trị viên tại quầy để điều chỉnh phác đồ an toàn và tuyệt đối không chia sẻ cho bất kỳ bên thứ ba quảng cáo nào.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              3. Quy tắc bảo vệ điểm thưởng thành viên
            </h2>
            <p className="mt-2">
              Để ngăn chặn hành vi mạo danh Số điện thoại xem lịch sử hoặc sử dụng điểm tích lũy của người khác, các hồ sơ khách hàng cũ tại quầy khi liên kết lên tài khoản trực tuyến đều phải xác minh thông qua mã hóa đơn/lịch hẹn đã hoàn thành hoặc đối chiếu trực tiếp tại lễ tân.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              4. Quyền chỉnh sửa &amp; yêu cầu xóa dữ liệu
            </h2>
            <p className="mt-2">
              Bạn có toàn quyền yêu cầu xem, đính chính hoặc xóa/ẩn danh hóa toàn bộ hồ sơ cá nhân bất cứ lúc nào bằng cách liên hệ trực tiếp Hotline {settings.phoneDisplay} hoặc Email {settings.email}.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
