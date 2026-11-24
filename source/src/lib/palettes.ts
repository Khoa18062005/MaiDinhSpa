export type SpaThemeId =
  | 'alabaster-espresso'
  | 'herbal-celadon'
  | 'blush-camellia'
  | 'kyoto-matcha'
  | 'clinical-cobalt'
  | 'velvet-oud';

export interface SpaPaletteDefinition {
  id: SpaThemeId;
  name: string;
  badge: string;
  description: string;
  isDark?: boolean;
  swatches: {
    canvas: string;
    surface: string;
    action: string;
    accent: string;
  };
}

export const SPA_PALETTES: SpaPaletteDefinition[] = [
  {
    id: 'alabaster-espresso',
    name: 'Kem Sữa & Nâu Espresso',
    badge: 'Mặc định',
    description: 'Ấm áp, sang trọng kiểu tạp chí làm đẹp cổ điển (mẫu tham chiếu gốc).',
    swatches: {
      canvas: '#F6F1E9',
      surface: '#FAF7F2',
      action: '#2B2521',
      accent: '#B59461',
    },
  },
  {
    id: 'herbal-celadon',
    name: 'Ngọc Thảo Mộc & Rêu Rừng',
    badge: 'Dưỡng sinh',
    description: 'Tươi mát, thư thái hơi thở lá bồ kết, sả chanh và gội dưỡng sinh Đông y.',
    swatches: {
      canvas: '#EEF3EE',
      surface: '#F6F9F5',
      action: '#1B3B2B',
      accent: '#7E9987',
    },
  },
  {
    id: 'blush-camellia',
    name: 'Phấn Hoa Trà & Mận Trầm',
    badge: 'Nữ tính',
    description: 'Mềm mại, tôn vinh làn da căng bóng hồng hào chuẩn thẩm mỹ Hàn – Pháp.',
    swatches: {
      canvas: '#F9F0EE',
      surface: '#FDF7F6',
      action: '#3F2128',
      accent: '#B87B82',
    },
  },
  {
    id: 'kyoto-matcha',
    name: 'Trà Gạo Rang & Gỗ Tuyết Tùng',
    badge: 'Zen tĩnh lặng',
    description: 'Tối giản, tĩnh mịch như không gian thiền trà và đá nóng Onsen Nhật Bản.',
    swatches: {
      canvas: '#F3F2E8',
      surface: '#F9F8F2',
      action: '#283623',
      accent: '#9E8B56',
    },
  },
  {
    id: 'clinical-cobalt',
    name: 'Sứ Trắng & Xanh Khoáng Chất',
    badge: 'Chuẩn Y khoa',
    description: 'Tinh khiết, chuyên nghiệp dành cho Spa mạnh về phục hồi da B5 & công nghệ cao.',
    swatches: {
      canvas: '#EFF4F8',
      surface: '#F7FAFC',
      action: '#1A324A',
      accent: '#5C82A6',
    },
  },
  {
    id: 'velvet-oud',
    name: 'Đêm Trầm Hương & Vàng Kim',
    badge: 'VIP Tối',
    description: 'Không gian ánh nến trầm mặc, quyền lực với chữ kem ngà và nút vàng Champagne.',
    isDark: true,
    swatches: {
      canvas: '#181512',
      surface: '#231E1A',
      action: '#DFC084',
      accent: '#8C6E3E',
    },
  },
];
