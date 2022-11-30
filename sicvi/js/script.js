// Arreglos que obtienen los valores de la promesa
let temperatura_obtenida = new Array();
let tiempo_obtenido = new Array();
// Arreglos que son pasados al grafico
let xVal = new Array();
let yVal = new Array();
let temperatura, tiempo;
let time = new Date;

fetch("https://localhost/codigo_html/php/informacion.php").then((res) => {
  res.json().then((data) => {

    var temp_card = "";
    var hum_card = "";
    
    data.forEach(data_card => {
      temp_card = data_card.Temperatura;
      hum_card = data_card.Humedad;
    });
    document.getElementById("temp_card").innerHTML = temp_card;
    document.getElementById("hum_card").innerHTML = hum_card;
  });
});

window.onload = function () {
  async function promesa() {
    return await new Promise((resolve, reject) => {
      fetch("https://localhost/codigo_html/php/informacion.php")
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  promesa().then((informacion) => {
    for (var i = 0; i < informacion.length; i++) {
      temperatura_obtenida[i] = informacion[i].Temperatura;
    }
    temperatura = Object.values(temperatura_obtenida);

    for (var i = 0; i < informacion.length; i++) {
      tiempo_obtenido[i] = informacion[i].Tiempo;
    }
    tiempo = Object.values(tiempo_obtenido);
    
    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",

      title: {
        text: "Invernadero",
      },
      data: [
        {
          type: "line",
          xValueType: "dateTime",
          xValueFormatString: "hh:mm:ss TT",
          dataPoints: dps,
        },
      ],
      axisX: {
        title: "Tiempo",
      },
      axisY: {
        fontFamily: "verdana",
        title: "Temperatura /°C",
      },
    });

    var updateInterval = 1000;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function () {
      for (var i = 0; i < tiempo.length; i++) {
        dps.push({
          x: parseInt(tiempo[i]),
          y: parseInt(temperatura[i]),
        });
      }

      if (dps.length > dataLength) {
        dps.shift();
      }

      chart.render();
    };

    updateChart(dataLength);
    setInterval(function () {
      updateChart();
    }, updateInterval);
  });
};
