let studentPressureData;
// load dataset
async function fetchStudentPressureData() {
  const response = await fetch("data/hbsc_schoolwork_pressure.json");
  studentPressureData = await response.json();
}

async function main() {
  await fetchStudentPressureData();
  const rows = ["11-year-olds", "13-year-olds", "15-year-olds"].map((age) => {
    const entries = studentPressureData.data.filter(
      (entry) => entry.age_group === age,
    );

    // (used claude to help for this the first time)
    // calculate average percentages for each age group 
    const girlsAverage =
      entries.reduce((sum, entry) => sum + entry.female_pct, 0) / entries.length;

    const boysAverage =
      entries.reduce((sum, entry) => sum + entry.male_pct, 0) / entries.length;

    return {
      age: age,
      girls: girlsAverage,
      boys: boysAverage,
    };
  });

  // create chart
  new Chart(document.getElementById("chartPressureStudents"), {
    type: "bar",

    data: {
      labels: rows.map((entry) => entry.age),

      datasets: [
        {
          label: "Girls",
          data: rows.map((entry) => entry.girls),
          backgroundColor: "#BC6C25",
        },
        {
          label: "Boys",
          data: rows.map((entry) => entry.boys),
          backgroundColor: "#606C38",
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: { display: true, text: "Schoolwork pressure increases by age" },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.parsed.y.toFixed(1) + "%";
            },
          },
        },
        labels:{
        font: "sets-grotesk-l",
        weight: "400",
    },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Students reporting schoolwork pressure (%)",
          },
        },
      },
    },
  });
}

main();
