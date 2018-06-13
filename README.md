# bai_tap_lon_web

schema:  student lecturer partner admin internship internship-rating news


#api

tất cả các lỗi trả về đều có thuộc tính message để ghỉ mô tả lỗi

example url: localhost:3000/api/getInfo?param1=2&param2=3;

student: (tất cả đều y/c login trước nếu ko sẽ trả về lỗi có message: mail required)
    + getInfo (GET):
      - mô tả: lấy thông tin của user hiện tại
      - param : ko
      - url : localhost:3000/api/student/getInfo  (GET)
      - yêu cầu : có token trên browser (nếu ko sẽ có các json trả về yêu cầu login)
    + updateInfo(PUT): 
      - mô tả: update ìnfo của user hiện tại (lúc đầu khi khởi tạo form thì gọi getInfo để  lấy giá trị mặc định từ server hoặc cho giá trị mặc định trên client để tránh người dùng nhập quá nhiều tham só)
      - url : localhost:3000/api/student/updateInfo
      - param: để trong body của gói tin với các thuộc tính {
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
    +asignForIntern(PUT): 
      - url : vd: localhost:3000/api/student/asignForIntern?id=fldsk  
      - mô tả : đăng kí vào một đơn thực tập
      - param: {id} (id là id bài viết mà sinh viên đăng kí)
    +getSkill (GET): 
      - mô tả: lấy toàn bộ skill của sinh viên hiện tại
      - url: localhost:3000/api/student/getSkill
      - param: ko có
    +findNotif(POST): phần body có title, ownerId
      - url : localhost:3000/api/student/findNotif
      - param: để trong body của gói tin : {title, ownerId}
      - mô tả : tìm thông tin thực tập
    +inbox(POST): nhắn tin của svien với các người khác
      - url: localhost:3000/api/student/inbox
      - param: để trong body của gói tin { receivMail, title, content }
    +sendBriefReport(POST): gửi thông báo vắn tắt
      - url: localhost:3000/api/student/sendBriefReport
      - param: để trong body của gói tin { receivMail, content } (đăng nhập trước)
    +sendFullReport(POST): gửi file report lên server
      -url: localhost:3000/api/student/sendFullReport
      -param: để DataForm (input có type là file thì phải có thuộc tính name là report và trong formData phải có thêm reciveMail) (đăng nhập trước)
    +seeReview(GET) : xem review từ lecturer or partner
      -url: localhost:3000/api/student/seeReview?intern=3
    +allNotif(GET): 
lecturer
 + updateInfo(PUT): 
  - url: localhost:3000/api/lecturer/updateInfo
  - gom vnumail, birthday(ko bat buoc), phone, note, password(ko bat buoc)
 + getListStudentFollow(GET): lấy toàn bộ sinh viên đang follow minh
   - url : localhost:3000/api/lecturer/getListStudentFollow
   - yeu cau : dang nhap
 + reviewReport(GET): 
   - url: localhost:3000/api/lecturer/reviewReport
   - yeu cau: dang nhap
 + inbox (POST): tương tự cái trên
 + reviewStudent(POST): xem nhận xét về sinh viên
   - url: localhost:3000/api/lecturer/reviewStudent
   - yêu cầu: đăng nhập
   - param: để trong body gói tin {studentId, internId}
 + giveGrade(POST): cho cho điểm sinh viên
   - url: localhost:3000/api/lecturer/giveGrade
   - yêu cầu : đăng nhập
   - param: để trong body gói tin {studentId, internId, grade}
 + genExcel(GET): download file bảng điểm
   - url: localhost:3000/api/lecturer/genExcel
   - yêu cầu: đăng nhập và là giảng viên
   - chỉ cần copy đường link vào và đang đăng nhập là download được
Partner
 + updateInfo(PUT): 
   - url: localhost:3000/api/partner/updateInfo
   - param: trong body: {name, info, password}
   - yeu cau: dang nhap
 + postIntern(POST): dang tuyen dung
  - url: localhost:3000/api/partner/postIntern
  - param: trong body: { content, title, startTime, endTime }
  - yeu cau: dang nhap
 + editIntern(PUT): chinh sua intern
  - url : localhost:3000/api/partner/editIntern
  - param: trong body: { id, content, title, startTime, endTime }
            id: la id cua intern
  - yeu cau: dang nhap
 + inbox: nhu tren
 + allStudentInIntern(GET): lay toan bo sinh vien duoc nhan
  - url: localhost:3000/api/partner/allStudentInIntern
  - param : none
  - yeu cau: dang nhap