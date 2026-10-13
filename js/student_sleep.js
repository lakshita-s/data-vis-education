let studentSleepData;
// load dataset
async function fetchStudentSleepData() {
  const response = await fetch("data/yrbs_student_sleep.json");
  studentSleepData = await response.json();
}

async function main() {
  await fetchStudentSleepData();

  const rows = studentSleepData.data;

  // create chart
  new Chart(document.getElementById("chartSleepStudents"), {
    type: "line",

    data: {
      labels: rows.map((entry) => entry.group),

      datasets: [
        {
          label: "Students getting 8+ hours of sleep",
          data: rows.map((entry) => entry.percentage),
          borderColor: "#606C38",
          backgroundColor: "rgba(96, 108, 56, 0.5)",
          fill: true,
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      responsive: true,

      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },

      plugins: {
        title: {
          display: true,
          text: "Students getting less sleep as they get older",
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
            text: "Students sleeping 8+ hours on an average school night (%)",
          },
        },
      },
    },
  });
}

main();
