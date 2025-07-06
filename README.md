# Sistem Manajemen Armada Transportasi Jakarta

## Cara Menjalankan Aplikasi

### Prerequisites
- Node.js (versi 22.17.0 atau lebih baru)
- pnpm (atau npm/yarn)

### Instalasi
1. Clone repository ini
```bash
git clone <repository-url>
cd sistem-manajemen-armada
```

2. Install dependencies
```bash
pnpm install
```

3. Jalankan aplikasi dalam mode development
```bash
pnpm dev
```

4. Buka browser dan akses `http://localhost:5173`

### Build untuk Production
```bash
pnpm build
```

## Arsitektur Aplikasi

### Tech Stack
- **Frontend Framework**: React 18 dengan TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI (Listbox, Dialog)
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback)
