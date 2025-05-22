document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("userRole");

    // Kiểm tra quyền và hiển thị form thêm thành viên
    if (role === "admin") {
        document.getElementById("addMemberForm").style.display = "block";
    }

    loadMembers(); // Tải danh sách thành viên từ Local Storage
});

// Danh sách thành viên mẫu (Sẽ được lưu vào Local Storage)
const members = JSON.parse(localStorage.getItem("members")) || [
    { id: 1, name: "Nguyễn Văn An", email: "phuc@123", role: "Admin" },
    { id: 2, name: "Trần Thị Bình", email: "phuc@123", role: "Editor" },
    { id: 3, name: "Lê Minh Châu", email: "phuc@123", role: "Member" }
];
localStorage.setItem("members", JSON.stringify(members)); // Lưu vào Local Storage

// Hiển thị danh sách thành viên
function loadMembers() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    
    const members = JSON.parse(localStorage.getItem("members"));
    members.forEach(member => {
        let actions = "";
        if (localStorage.getItem("userRole") === "admin") {
            actions = `<button onclick="editMember(${member.id})">✏️ Chỉnh sửa</button>
                       <button onclick="deleteMember(${member.id})">🗑 Xóa</button>`;
        } else if (localStorage.getItem("userRole") === "editor") {
            actions = `<button onclick="editMember(${member.id})">✏️ Chỉnh sửa</button>`;
        }

        tableBody.innerHTML += `<tr id="member-${member.id}">
                                    <td>${member.name}</td>
                                    <td>${member.email}</td>
                                    <td>${member.role}</td>
                                    <td><span class="status active"></span></td>
                                    <td>${actions}</td>
                                </tr>`;
    });
}

// Thêm thành viên (Chỉ Admin)
function addMember() {
    const newName = document.getElementById("newName").value;
    const newEmail = document.getElementById("newEmail").value;
    const newRole = document.getElementById("newRole").value;
    
    let members = JSON.parse(localStorage.getItem("members"));
    members.push({ id: Date.now(), name: newName, email: newEmail, role: newRole });
    localStorage.setItem("members", JSON.stringify(members));

    loadMembers(); // Cập nhật danh sách
}

// Xóa thành viên (Chỉ Admin)
function deleteMember(id) {
    let members = JSON.parse(localStorage.getItem("members"));
    members = members.filter(member => member.id !== id);
    localStorage.setItem("members", JSON.stringify(members));

    loadMembers(); // Cập nhật danh sách
}

// Chỉnh sửa thành viên (Admin, Editor)
function editMember(id) {
    alert("Chức năng chỉnh sửa đang được phát triển!");
}
