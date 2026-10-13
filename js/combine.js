
async function main() {
  // load both datasets
  const [supportResponse, pressureResponse] = await Promise.all([
    fetch("data/hbsc_teacher_support.json"),
    fetch("data/hbsc_schoolwork_pressure.json")
  ]);

  const studentData = await supportResponse.json();
  const studentPressureData = await pressureResponse.json();

  const ages = ["11-year-olds", "13-year-olds", "15-year-olds"];

  // calculate average percentages for each age group
  function calculateAverages(data) {
    return ages.map((age) => {
      const entries = data.data.filter(
        (entry) => entry.age_group === age
      );

      const girlsAverage =
        entries.reduce((sum, entry) => sum + entry.female_pct, 0) /
        entries.length;

      const boysAverage =
        entries.reduce((sum, entry) => sum + entry.male_pct, 0) /
        entries.length;

      return {
        age: age,
        girls: girlsAverage,
        boys: boysAverage
      };
    });
  }

  const supportRows = calculateAverages(studentData);
  const pressureRows = calculateAverages(studentPressureData);

  // create one chart with four lines
  new Chart(document.getElementById("chartSchoolExperience"), {
    type: "line",

    data: {
      labels: ages,

      datasets: [
        {
          label: "Girls — schoolwork pressure",
          data: pressureRows.map((entry) => entry.girls),
          borderColor: "#BC6C25",
          backgroundColor: "#BC6C25",
          pointBackgroundColor: "#BC6C25",
          tension: 0.2
        },
        {
          label: "Boys — schoolwork pressure",
          data: pressureRows.map((entry) => entry.boys),
          borderColor: "#BC6C25",
          backgroundColor: "#BC6C25",
          pointBackgroundColor: "#BC6C25",
          borderDash: [6, 4],
          tension: 0.2
        },
        {
          label: "Girls — teacher support",
          data: supportRows.map((entry) => entry.girls),
          borderColor: "#606C38",
          backgroundColor: "#606C38",
          pointBackgroundColor: "#606C38",
          tension: 0.2
        },
        {
          label: "Boys — teacher support",
          data: supportRows.map((entry) => entry.boys),
          borderColor: "#606C38",
          backgroundColor: "#606C38",
          pointBackgroundColor: "#606C38",
          borderDash: [6, 4],
          tension: 0.2
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      animation: {
        duration: 1200
      },

      interaction: {
        mode: "index",
        intersect: false
      },

      plugins: {
        title: {
          display: true,
          text: "Schoolwork pressure and teacher support by age"
        },

        tooltip: {
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " +
                context.parsed.y.toFixed(1) + "%";
            }
          }
        }
      },

      scales: {
        y: {
          min: 25,
          max: 70,
          title: {
            display: true,
            text: "Students reporting each measure (%)"
          },
          ticks: {
            callback: function (value) {
              return value + "%";
            }
          }
        }
      }
    }
  });
}

main();
