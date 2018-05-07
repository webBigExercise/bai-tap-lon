# bai_tap_lon_web

schema:  student lecturer partner admin internship internship-rating news


#api

student: 
    + getInfo: 0 cần tham số
    + updateInfo: cần tất cả tham số  sau (lúc đầu khi khởi tạo form thì gọi getInfo để  lấy giá trị mặc định từ server hoặc cho giá trị mặc định trên client để tránh người dùng nhập quá nhiều tham só) : {
            avatar : string,
            privateEmail : string,
            skypeID : string,
            facebook : string,
            phoneNumber : string,
            EnglishSkill : string,
            diploma : string,
            expreneced: number,
            wantToBe: string,
            note: string,

    }
    +asignForIntern: vd: /api/asignForIntern?id=fldsk  (id là id bài viết mà sinh viên đăng kí)
    +getSkill : lấy toàn bộ skill của sinh viên
    +findNotif: phần body có title, ownerId