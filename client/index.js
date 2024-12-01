function taikhoan() {
    let taikhoan = 0;
    return function () {
        return {
            nap: (sotien = 0) => {
                taikhoan += sotien;
            },
            rut: (sotien = 0) => {
                const cloneTaiKhoan = taikhoan;
                taikhoan -= sotien
                if (taikhoan < 0) {
                    console.log("tai khoan het tien");
                    taikhoan = cloneTaiKhoan;
                }
            },
            hienThi: () => {
                console.log(taikhoan);

            }
        }
    }
}

// const loi = taikhoan();
// loi().nap(500);
// loi().hienThi();
// loi().rut(700);
// loi().hienThi();


const tong = (a, b) => {
    return a + b;
}

const hieu = (a) => {
    return (b) => {
        return (c) => {
            return a - b - c;
        }
    }
}

// console.log(tong(6, 5));
// console.log(hieu(6)(5)(2));

const dequy = (a) => {



    console.log(a);
    if (a > 0) {
        dequy(--a);
    }

}

// dequy(10);