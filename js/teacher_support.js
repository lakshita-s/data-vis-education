let studentData;

// load dataset
async function fetchStudentData() {
  const response = await fetch("data/hbsc_teacher_support.json");
  studentData = await response.json();
}

async function main() {
  await fetchStudentData();

  const rows = ["11-year-olds", "13-year-olds", "15-year-olds"].map((age) => {
    const entries = studentData.data.filter((entry) => entry.age_group === age);

    const girlsAverage =
      entries.reduce((sum, entry) => sum + entry.female_pct, 0) /
      entries.length;

    const boysAverage =
      entries.reduce((sum, entry) => sum + entry.male_pct, 0) / entries.length;

    return {
      age: age,
      girls: girlsAverage,
      boys: boysAverage,
    };
  });

  // create chart
  new Chart(document.getElementById("chartSupportStudents"), {
    type: "bar",

    data: {
      labels: rows.map((entry) => entry.age),

      datasets: [
        {
          label: "Girls",
          data: rows.map((entry) => entry.girls),
          backgroundColor: "#606C38",
        },
        {
          label: "Boys",
          data: rows.map((entry) => entry.boys),
          backgroundColor: "#BC6C25",
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: { display: true, text: "Teacher support decreases by age" },
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
            text: "Students reporting teacher support (%)",
          },
        },
      },
    },
  });
}

main();
