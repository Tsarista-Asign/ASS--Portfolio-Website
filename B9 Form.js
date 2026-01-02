window.onload = function () {
    // Tạo danh sách ngày, tháng, và năm khi trang được tải
    const ngaySelect = document.getElementById('ngay');
    const thangSelect = document.getElementById('thang');
    const namSelect = document.getElementById('nam');

    // Tạo danh sách năm từ 1950 đến 2024
    for (let i = 1950; i <= new Date().getFullYear(); i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        namSelect.appendChild(option);
    }

    // Hàm kiểm tra năm nhuận
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // Hàm cập nhật số ngày theo tháng và năm
    function updateDays() {
        const month = parseInt(thangSelect.value);
        const year = parseInt(namSelect.value);
        let daysInMonth;

        // Xác định số ngày của từng tháng
        if (month === 2) { // Tháng 2
            daysInMonth = isLeapYear(year) ? 29 : 28;
        } else if ([4, 6, 9, 11].includes(month)) { // Các tháng có 30 ngày
            daysInMonth = 30;
        } else { // Các tháng có 31 ngày
            daysInMonth = 31;
        }

        // Xóa các tùy chọn ngày hiện tại
        ngaySelect.innerHTML = '<option value="" disabled selected>Ngày</option>';

        // Thêm lại các tùy chọn ngày mới
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            ngaySelect.appendChild(option);
        }
    }

    thangSelect.addEventListener('change', updateDays);
    namSelect.addEventListener('change', updateDays);

    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        let isValid = true;

        document.querySelectorAll('.error-message').forEach(function (element) {
            element.innerHTML = '';
        });

        const ho = document.getElementById('ho').value.trim();
        if (!ho) {
            document.getElementById('ho-error').innerHTML = 'Họ không được để trống.';
            isValid = false;
        }

        const ten = document.getElementById('ten').value.trim();
        if (!ten) {
            document.getElementById('ten-error').innerHTML = 'Tên không được để trống.';
            isValid = false;
        }

        const sodienthoai = document.getElementById('sodienthoai').value.trim();
        const phonePattern = /^[0-9]{10}$/;
        if (!sodienthoai) {
            document.getElementById('sodienthoai-error').innerHTML = 'Số điện thoại không được để trống.';
            isValid = false;
        } else if (!phonePattern.test(sodienthoai)) {
            document.getElementById('sodienthoai-error').innerHTML = 'Số điện thoại phải có 10 chữ số và không chứa ký tự khác.';
            isValid = false;
        }

        const ngay = document.getElementById('ngay').value;
        const thang = document.getElementById('thang').value;
        const nam = document.getElementById('nam').value;
        if (!ngay || !thang || !nam) {
            document.getElementById('ngaysinh-error').innerHTML = 'Ngày sinh không được để trống.';
            isValid = false;
        }

        const gioitinh = document.querySelector('input[name="gioitinh"]:checked');
        if (!gioitinh) {
            document.getElementById('gioitinh-error').innerHTML = 'Giới tính không được để trống.';
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            alert('Gửi thành công!');
            window.location.reload();
        }
    });
};
