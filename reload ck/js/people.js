
    let members = JSON.parse(localStorage.getItem("members")) || [];
    let editIndex = -1;

    function renderTable() {
      const tbody = document.getElementById("tableBody");
      tbody.innerHTML = "";

      members.forEach((member, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${member.name}</td>
          <td>${member.email}</td>
          <td>${member.role}</td>
          <td><span class="status ${member.status === 'active' ? 'active' : 'inactive'}"></span></td>
          <td class="actions">
              <i onclick="editMember(${index})">✏️</i>
              <i onclick="deleteMember(${index})">🗑️</i>
          </td>
        `;
        tbody.appendChild(row);
      });
    }

    function addMember() {
      const name = document.getElementById("newName").value.trim();
      const email = document.getElementById("newEmail").value.trim();
      const role = document.getElementById("newRole").value;

      if (!name) {
        alert("Vui lòng nhập họ và tên.");
        return;
      }

      if (!email.includes("@")) {
        alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
        return;
      }

      const member = {
        name,
        email,
        role,
        status: Math.random() > 0.5 ? "active" : "inactive"
      };

      if (editIndex >= 0) {
        members[editIndex] = member;
        editIndex = -1;
      } else {
        members.push(member);
      }

      localStorage.setItem("members", JSON.stringify(members));
      renderTable();
      document.getElementById("addMemberForm").style.display = "none";
      document.getElementById("newName").value = "";
      document.getElementById("newEmail").value = "";
      document.getElementById("newRole").value = "Member";
    }

    function showAddForm() {
      const form = document.getElementById("addMemberForm");
      form.style.display = form.style.display === "none" ? "block" : "none";
      editIndex = -1;
    }

    function editMember(index) {
      const member = members[index];
      document.getElementById("newName").value = member.name;
      document.getElementById("newEmail").value = member.email;
      document.getElementById("newRole").value = member.role;
      document.getElementById("addMemberForm").style.display = "block";
      editIndex = index;
    }

    function deleteMember(index) {
      if (confirm("Bạn có chắc chắn muốn xoá thành viên này không?")) {
        members.splice(index, 1);
        localStorage.setItem("members", JSON.stringify(members));
        renderTable();
      }
    }

    window.onload = renderTable;
