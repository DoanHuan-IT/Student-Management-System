import '@testing-library/jest-dom'; //* Import các hàm matchers (toBeInTheDocument...)
import {cleanup} from '@testing-library/react';
import {beforeAll, afterEach, vi} from 'vitest';

//* Chạy 1 lần trước tất cả các test
beforeAll(() => {
    // Mock fetch toàn cục bằng vi.fn()
    globalThis.fetch = vi.fn();
    // Mock console để tránh rác log khi chạy test (tùy chọn)
    console.error = vi.fn();
    // Ghi đè console.error, warn, log, cho toàn bộ test, tránh hiện log khi chạy test, đỡ khó chịu
    // console.error = vi.fn()
    // console.warn = vi.fn()
    // console.log = vi.fn()
    // tùy dự án nếu không cần có thể comment lại
})

//* Chạy sau mỗi test case
afterEach(() => {
    // Dọn dẹp DOM sau mỗi lần render
    cleanup();

    // Xóa sạch các mock để không ảnh hưởng test sau
    vi.clearAllMocks();
    // Reset cache của module require/import (require)
    // vi.resetModules();
    // Restore tất cả spyOn về implementation gốc
    // vi.restoreAllMocks();
});