$(document).ready(function() {
  var aankoopInfoCounter = 1;

  $("#add-aankoop-info-btn").click(function() {
    aankoopInfoCounter++;
    var aankoopInfo = `
      <div class="aankoop-info mt-5">
        <h3>Aankoop ${aankoopInfoCounter}</h3>
        <div class="form-group">
        <label for="aankoop-datum-${aankoopInfoCounter}">Datum aankoop</label>
        <input type="date" class="form-control" id="aankoop-datum-${aankoopInfoCounter}" required>
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
    </div>
  `;
  $("#aankoop-info-container").append(aankoopInfo);
});

$("#tax-calculator-form").submit(function(e) {
  e.preventDefault();

  var verkoopDatum = $("#verkoop-datum").val();
  var aantalStuks = $("#aantal-stuks").val();
  var verkoopPrijs = $("#verkoop-prijs").val();
  var assetTest = $("#asset-test").val();
  var tisbisVerkoop = $("#tisbis-verkoop").val();

  var belastbareBasis = 0;
  for (var i = 1; i <= aankoopInfoCounter; i++) {
    var aankoopDatum = $(`#aankoop-datum-${i}`).val();
    var aankoopPrijs = $(`#aankoop-prijs-${i}`).val();
    var aantalStuksAankoop = $(`#aantal-stuks-${i}`).val();
    var tisbisAankoop = $(`#tisbis-aankoop-${i}`).val();

    if (tisbisVerkoop && tisbisAankoop) {
      belastbareBasis += (tisbisVerkoop - tisbisAankoop) * aantalStuksAankoop;
      if (belastbareBasis > (verkoopPrijs - aankoopPrijs) * aantalStuksAankoop) {
        belastbareBasis = (verkoopPrijs - aankoopPrijs) * aantalStuksAankoop;
      }
    } else {
      belastbareBasis += (verkoopPrijs - aankoopPrijs) * aantalStuksAankoop * assetTest;
    }
  }

  var belasting = belastbareBasis * 0.3;

  var result = `
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
    </table>
  `;

  $("#result").html(result);
  $("#result-container").removeClass("d-none");
});
});