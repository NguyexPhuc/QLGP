let donations = JSON.parse(localStorage.getItem("donations")) || [];
    let editIndex = -1;

    function renderDonationTable() {
      const tbody = document.getElementById("donationTableBody");
      tbody.innerHTML = "";

      donations.forEach((donation, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${donation.name}</td>
          <td>${donation.date}</td>
          <td>${donation.amount}</td>
          <td>${donation.program}</td>
          <td>
            <span class="edit" onclick="editDonation(${index})">✏️</span>
            <span class="delete" onclick="deleteDonation(${index})">🗑️</span>
          </td>
        `;
        tbody.appendChild(row);
      });
    }

    function openForm(index = null) {
      document.getElementById("donationForm").style.display = "block";
      document.getElementById("overlay").style.display = "block";

      if (index !== null) {
        const d = donations[index];
        document.getElementById("name").value = d.name;
        document.getElementById("date").value = d.date;
        document.getElementById("amount").value = d.amount;
        document.getElementById("program").value = d.program;
        editIndex = index;
      } else {
        document.getElementById("form").reset();
        editIndex = -1;
      }
    }

    function closeForm() {
      document.getElementById("donationForm").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }

    document.getElementById("form").addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const date = document.getElementById("date").value;
      const amount = document.getElementById("amount").value.trim();
      const program = document.getElementById("program").value.trim();

      if (!name || !date || !amount || !program) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      const newDonation = { name, date, amount, program };

      if (editIndex >= 0) {
        donations[editIndex] = newDonation;
      } else {
        donations.push(newDonation);
      }

      localStorage.setItem("donations", JSON.stringify(donations));
      renderDonationTable();
      closeForm();
    });

    function editDonation(index) {
      openForm(index);
    }

    function deleteDonation(index) {
      if (confirm("Bạn có chắc muốn xoá mục công đức này không?")) {
        donations.splice(index, 1);
        localStorage.setItem("donations", JSON.stringify(donations));
        renderDonationTable();
      }
    }

    window.onload = renderDonationTable;