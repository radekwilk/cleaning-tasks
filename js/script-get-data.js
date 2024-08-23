$(document).ready(function () {
  const fileInput = document.getElementById("input_file");
  const tbody = document.getElementById("table-body");
  const daily = document.getElementById("daily");
  const weekly = document.getElementById("weekly");
  const periodic = document.getElementById("periodic");
  const externalArea = document.getElementById("external_area");
  const guestsDining = document.getElementById("guest_area_dining");
  const guestRestroom = document.getElementById("guest_area_restrooms");
  const bohBuilding = document.getElementById("boh_building");
  const bohEquipment = document.getElementById("boh_equipment");

  const allTasks = document.getElementById("all-tasks");
  const frequencyColumn = 3; // this is hardcoded for now, will need to change it later
  const taskTypeColumn = 1; // this is hardcoded for now, will need to change it later
  let myData;
  let file;

  // We listen for any change in file input, and when it change we read the file and saving data in myData variable
  fileInput.addEventListener("change", (evt) => {
    file = evt.target.files[0];
    readXlsxFile(file).then((rows) => {
      tbody.innerHTML = "";

      rows.forEach((row) => {
        let tr = document.createElement("tr");
        row.forEach((cell) => {
          if (row[0] !== "Task ID") {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
          }
        });
        tbody.appendChild(tr);
      });
    });
  });

  // Select the rows for the daily cleaning
  allTasks.addEventListener("click", () => {
    // console.log("This is from the daily click button");
    // console.log(file);

    createTableData();
  });

  // Select the rows for the daily cleaning.
  daily.addEventListener("click", () => {
    createTableData("Daily", frequencyColumn);
  });

  // Select the rows for the weekly cleaning
  weekly.addEventListener("click", () => {
    createTableData("Weekly", frequencyColumn);
  });

  // Select the rows for the periodic cleaning
  periodic.addEventListener("click", () => {
    createTableData("Periodically", frequencyColumn);
  });

  // Select the rows for the external areas cleaning tasks
  externalArea.addEventListener("click", () => {
    createTableData("External", taskTypeColumn);
  });

  // Select the rows for the guest dining areas cleaning tasks
  guestsDining.addEventListener("click", () => {
    createTableData("Guest area - dining", taskTypeColumn);
  });

  // Select the rows for the guest restrooms areas cleaning tasks
  guestRestroom.addEventListener("click", () => {
    createTableData("Guest area - restrooms", taskTypeColumn);
  });

  // Select the rows for the boh building areas cleaning tasks
  bohBuilding.addEventListener("click", () => {
    createTableData("BOH - building", taskTypeColumn);
  });

  // Select the rows for the boh equipment areas cleaning tasks
  bohEquipment.addEventListener("click", () => {
    createTableData("BOH - equipment", taskTypeColumn);
  });

  // This is a function selecting all the rows with defined frequency parameter
  const createTableData = (parameter, colToLook) => {
    readXlsxFile(file).then((rows) => {
      tbody.innerHTML = "";

      // console.log(rows);
      for (let rowNum = 0; rowNum < rows.length; rowNum++) {
        if (parameter) {
          if (rows[rowNum][colToLook] === parameter) {
            if (rows[rowNum][0] !== "Task ID") {
              // console.log(rows[rowNum][0]);
              let trow = createTableRow(
                rows[rowNum].length,
                rows[rowNum],
                rows[rowNum][0]
              );
              tbody.append(trow);
            }
          }
        } else {
          // we are using the createTableRow function to create the rows with the relevant data
          if (rows[rowNum][0] !== "Task ID") {
            let trow = createTableRow(rows[rowNum].length, rows[rowNum]);
            tbody.appendChild(trow);
          }
        }
      }
    });
  };

  // This function will create a row with the <td> tags
  const createTableRow = (num, cell, idNum) => {
    let tr = document.createElement("tr");

    for (let cellNum = 0; cellNum < num - 1; cellNum++) {
      let td = document.createElement("td");
      td.innerHTML = `<td scope="col">${cell[cellNum]}</td>`;
      tr.append(td);
    }

    let imgCell = document.createElement("td");
    imgCell = addImg("cleaning", idNum);
    // console.log(`This is the image id: ${idNum}`);
    tr.append(imgCell);
    return tr;
  };

  // this function will add the correct image to the required row
  const addImg = (imgName, taskID) => {
    let td = document.createElement("td");
    td.innerHTML = `
      <img
        class="img-fluid rounded mx-auto d-block"
        src="img/cleaning-thumb.png"
        alt="Image if cleaning equipment"
        id="img-1"
      />`;

    td.classList.add("img-container", "cleaning-img");
    td.id = `${imgName}-${taskID}`;

    setAttributes(td, {
      "data-bs-toggle": "modal",
      "data-bs-target": "#exampleModal",
    });
    // td.setAttribute("data-bs-toggle", "#exampleModal");

    return td;
  };

  // function to set attributes
  function setAttributes(el, attrs) {
    for (let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
});
