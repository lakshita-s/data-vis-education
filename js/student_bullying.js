let studentBullyingData;
// load dataset
async function fetchStudentBullyingData() {
  const response = await fetch("data/pisa_bullying.json");
  studentBullyingData = await response.json();
}

async function main() {
  await fetchStudentBullyingData();
  const rows = studentBullyingData.data;

  // create chart
  new Chart(document.getElementById("chartBullyingStudents"), {
    type: "bar",

    data: {
      labels: rows.map((entry) => entry.country),

      datasets: [
        {
          label: "Students experiencing bullying",
          data: rows.map((entry) => entry.any_bullying_pct),
          backgroundColor: "#606C38",
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      responsive: true,

      plugins: {
        title: {
          display: true,
          text: "Students experiencing bullying by country",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.parsed.y.toFixed(1) + "%";
            },
          },
        },
      },

      scales: {
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Experiencing any bullying (%)",
          },
        },
      },
    },
  });
}

main();
