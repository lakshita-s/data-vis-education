let studentHealthData;
  // load dataset
async function fetchStudentHealthData() {
  const response = await fetch("data/hbsc_health_complaints.json");
  studentHealthData = await response.json();
}

async function main() {
  await fetchStudentHealthData();
  const rows = ["11-year-olds", "13-year-olds", "15-year-olds"].map((age) => {
    const entries = studentHealthData.data.filter(
      (entry) => entry.Age_group === age,
    );

  // calculate average percentages for each age group
    const girlsAverage =
      entries.reduce((sum, entry) => sum + entry.Girl, 0) / entries.length;

    const boysAverage =
      entries.reduce((sum, entry) => sum + entry.Boy, 0) / entries.length;
    return {
      age: age,
      girls: girlsAverage,
      boys: boysAverage,
    };
  });

// create chart
  new Chart(document.getElementById("chartHealthStudents"), {
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
        title: {
          display: true,
          text: "Students reporting multiple health concerns increases by age",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.parsed.y.toFixed(1) + "%"; //show percentage sign
            },
          },
        },
        legend: {
        labels:{
        font: "sets-grotesk-l",
        weight: "400",
      }
    }
    },
      scales: {
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Students reporting multiple health concerns 1+ times a week (%)",
          },
        },
      },
    },
  });
}

main();
