document.addEventListener("DOMContentLoaded", function() {
    var aankoopInfoCounter = 1;
    var addAankoopInfoBtn = document.getElementById("add-aankoop-info-btn");
    var aankoopInfoContainer = document.getElementById("aankoop-info-container");
    var taxCalculatorForm = document.getElementById("tax-calculator-form");
    var resultContainer = document.getElementById("result-container");
    var result = document.getElementById("result");
  
    addAankoopInfoBtn.addEventListener("click", function() {
      aankoopInfoCounter++;
      var aankoopInfo = document.createElement("div");
      aankoopInfo.classList.add("aankoop-info", "mt-5");
      aankoopInfo.innerHTML = `
        <h3>Aankoop ${aankoopInfoCounter}</h3>
        <div class="form-group">
          <label for="aankoop-datum-${aankoopInfoCounter}">Datum aankoop</label>
          <input type="date" class="form-control" id="aankoop-datum-${aankoopInfoCounter}">
        </div>
        <div class="form-group">
          <label for="aankoop-prijs-${aankoopInfoCounter}">Aankoopprijs</label>
          <input type="number" class="form-control" id="aankoop-prijs-${aankoopInfoCounter}" required>
        </div>
        <div class="form-group">
          <label for="aantal-stuks-${aankoopInfoCounter}">Aantal stuks</label>
          <input type="number" class="form-control" id="aantal-stuks-${aankoopInfoCounter}" required>
        </div>
        <div class="form-group">
          <label for="tisbis-aankoop-${aankoopInfoCounter}">TISbis op moment van aankoop</label>
          <input type="number" class="form-control" id="tisbis-aankoop-${aankoopInfoCounter}">
        </div>
      `;
      aankoopInfoContainer.appendChild(aankoopInfo);
    });
  
    taxCalculatorForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      var verkoopDatum = document.getElementById("verkoop-datum").value;
      var aantalStuks = document.getElementById("aantal-stuks").value;
      var verkoopPrijs = document.getElementById("verkoop-prijs").value;
      var assetTest = document.getElementById("asset-test").value;
      var tisbisVerkoop = document.getElementById("tisbis-verkoop").value;
  
      var belastbareBasis = 0;
      var details = ''
      for (var i = 1; i <= aankoopInfoCounter; i++) {
        var aankoopDatum = document.getElementById(`aankoop-datum-${i}`).value;
        var aankoopPrijs = document.getElementById(`aankoop-prijs-${i}`).value;
        var aantalStuksAankoop = document.getElementById(`aantal-stuks-${i}`).value;
        var tisbisAankoop = document.getElementById(`tisbis-aankoop-${i}`).value;
  
        if (tisbisVerkoop && tisbisAankoop) {
          belastbareBasisTISbis = (tisbisVerkoop - tisbisAankoop) * aantalStuksAankoop;
          if (belastbareBasisTISbis < (verkoopPrijs - aankoopPrijs) * aantalStuksAankoop) {
            belastbareBasis += (tisbisVerkoop - tisbisAankoop) * aantalStuksAankoop;
            details += `TISbis gebruikt: (${tisbisVerkoop} - ${tisbisAankoop}) * ${aantalStuksAankoop} = ${(tisbisVerkoop - tisbisAankoop) * aantalStuksAankoop} <br>`;
          } else { 
            belastbareBasis += (verkoopPrijs - aankoopPrijs) * aantalStuksAankoop
            details += `TISbis aanwezig maar NAV-beperking: (${verkoopPrijs} - ${aankoopPrijs}) * ${aantalStuksAankoop} = ${(verkoopPrijs - aankoopPrijs) * aantalStuksAankoop} <br>`;

          }
        } else {
          belastbareBasis += (verkoopPrijs - aankoopPrijs) * aantalStuksAankoop * (assetTest / 100);
          details += `Asset test gebruikt: (${verkoopPrijs} - ${aankoopPrijs}) * ${aantalStuksAankoop} * ${aantalStuksAankoop / 100} = ${(verkoopPrijs - aankoopPrijs) * aantalStuksAankoop * (assetTest / 100)} <br>`;
        }
      }
  
      var belasting = belastbareBasis * 0.3;
  
      result.innerHTML = `
        <h3 class="mb-3">Berekening</h3>
        <table class="table">
          <tr>
            <th>Datum verkoop</th>
            <td>${verkoopDatum}</td>
          </tr>
          <tr>
            <th>Aantal stuks</th>
            <td>${aantalStuks}</td>
          </tr>
          <tr>
            <th>Verkoopprijs</th>
            <td>€ ${verkoopPrijs}</td>
          </tr>
          <tr>
            <th>Asset test</th>
            <td>${assetTest}%</td>
          </tr>
          <tr>
            <th>TISbis op moment van verkoop</th>
            <td>€ ${tisbisVerkoop}</td>
          </tr>
          <tr>
            <th>Belastbare basis</th>
            <td>€ ${belastbareBasis}</td>
          </tr>
          <tr>
            <th>Belasting</th>
            <td>€ ${belasting}</td>
          </tr>
          <tr>
            <th>Detailberekening</th>
            <td>${details}</td>
          </tr>
        </table>
      `;

      resultContainer.classList.remove("d-none");
    });    

    document.getElementById("download-btn").addEventListener("click", function() {
        /* Get the data from the table */
        var data = [];
        var headers = [];
        var table = document.getElementById("result").getElementsByTagName("table")[0];
        for (var i = 0; i < table.rows[0].cells.length; i++) {
            headers[i] = table.rows[0].cells[i].innerHTML;
        }
        for (var i = 1; i < table.rows.length; i++) {
            var tableRow = [];
            for (var j = 0; j < table.rows[i].cells.length; j++) {
                tableRow.push(table.rows[i].cells[j].innerHTML);
            }
            data.push(tableRow);
        }
    
        /* Convert the data to a worksheet */
        var ws = XLSX.utils.aoa_to_sheet([headers].concat(data));
    
        /* Generate the workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Berekening");
    
        /* Download the workbook */
        XLSX.writeFile(wb, "berekening.xlsx");
    });
  });