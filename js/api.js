const base_url = "https://api.football-data.org/";

function status(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getMatches() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/competitions/2001/matches")
      .then(function (response) {
        if (response) {
          response.json().then(function (hasil) {
            var card = "";
            hasil.matches.forEach(function (match) {
              card += `
              <div class="row">
          <div class="col s12 m12">
            <div class="card grey darken-1">
              <div class="card-content white-text">
                <span class="card-title center-align">${
                  match.group !== null ? match.group : "Non Group"
                }</span>
      
                <div class="col s4 m4 center-align"><h6>${
                  match.homeTeam.name
                }</h6></div>
                <div class="col s4 m4 center-align"><h4>${
                  match.score.fullTime.homeTeam === null
                    ? "-"
                    : match.score.fullTime.homeTeam +
                      " - " +
                      match.score.fullTime.awayTeam
                }</h4></div>
                <div class="col s4 m4 center-align"><h6>${
                  match.awayTeam.name
                }</h6></div>
              </div>
              <br><br>
              <div class="card-action right-align">
                <a class="yellow-text" href="./match.html?id=${
                  match.id
                }&saved=true">Detail</a>
              </div>
            </div>
          </div>
        </div>
              `;

              //console.log(match);
            });
            document.getElementById("home").innerHTML = card;
          });
        }
      });
  }
  fetch(base_url + "v2/competitions/2001/matches", {
    method: "GET",
    headers: {
      "X-Auth-Token": "43eea326f19348068ded5089c2dfe9f2",
    },
  }).then(function (data) {
    data.json().then(function (hasil) {
      var card = "";
      hasil.matches.forEach(function (match) {
        card += `
        <div class="row">
    <div class="col s12 m12">
      <div class="card grey darken-1">
        <div class="card-content white-text">
          <span class="card-title center-align">${
            match.group !== null ? match.group : "Non Group"
          }</span>

          <div class="col s4 m4 center-align"><h6>${
            match.homeTeam.name
          }</h6></div>
          <div class="col s4 m4 center-align"><h4>${
            match.score.fullTime.homeTeam === null
              ? "-"
              : match.score.fullTime.homeTeam +
                " - " +
                match.score.fullTime.awayTeam
          }</h4></div>
          <div class="col s4 m4 center-align"><h6>${
            match.awayTeam.name
          }</h6></div>
        </div>
        <br><br>
        <div class="card-action right-align">
          <a class="yellow-text" href="./match.html?id=${match.id}&saved=true">Detail</a>
        </div>
      </div>
    </div>
  </div>
        `;

        //console.log(match);
      });
      document.getElementById("home").innerHTML = card;
    });
  });
}

function getMatchById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches
        .match(base_url + "v2/competitions/2001/matches")
        .then(function (response) {
          if (response) {
            response.json().then(function (hasil) {
              var card = "";
              detailMatch = hasil.matches.filter(function (match) {
                return match.id === parseInt(idParam);
              });
              detailMatch = detailMatch[0];
              console.log(detailMatch);
              resolve(detailMatch);
              document.getElementById("body-content").innerHTML = `
              <div class="row">
              <div class="col s12 m12">
                <div class="card grey darken-1 large">
                  <div class="card-content white-text">
                    <span class="card-title center-align">${
                      detailMatch.group !== null
                        ? detailMatch.group
                        : "Non Group"
                    }</span>
          
                    <div class="col s4 m4 center-align"><h6>${
                      detailMatch.homeTeam.name
                    }</h6></div>
                    <div class="col s4 m4 center-align"><h4>${
                      detailMatch.score.fullTime.homeTeam === null
                        ? "-"
                        : detailMatch.score.fullTime.homeTeam +
                          " - " +
                          detailMatch.score.fullTime.awayTeam
                    }</h4></div>
                    <div class="col s4 m4 center-align"><h6>${
                      detailMatch.awayTeam.name
                    }</h6></div>
                  </div>
                  <hr>
                  <div class="card-action">
                    <a class="yellow-text" href="./index.html">Kembali</a>
                  </div>
                </div>
              </div>
            </div>
                `;
            });
            //document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
          }
        });
    }
    fetch(base_url + "v2/competitions/2001/matches", {
      method: "GET",
      headers: {
        "X-Auth-Token": "43eea326f19348068ded5089c2dfe9f2",
      },
    }).then(function (data) {
      data.json().then(function (hasil) {
        var card = "";
        detailMatch = hasil.matches.filter(function (match) {
          return match.id === parseInt(idParam);
        });
        detailMatch = detailMatch[0];
        document.getElementById("body-content").innerHTML = `
              <div class="row">
              <div class="col s12 m12">
                <div class="card grey darken-1 extra-large">
                  <div class="card-content white-text">
                    <span class="card-title center-align">${
                      detailMatch.group !== null
                        ? detailMatch.group
                        : "Non Group"
                    }</span>
          
                    <div class="col s4 m4 center-align"><h6>${
                      detailMatch.homeTeam.name
                    }</h6></div>
                    <div class="col s4 m4 center-align"><h4>${
                      detailMatch.score.fullTime.homeTeam === null
                        ? "-"
                        : detailMatch.score.fullTime.homeTeam +
                          " - " +
                          detailMatch.score.fullTime.awayTeam
                    }</h4></div>
                    <div class="col s4 m4 center-align"><h6>${
                      detailMatch.awayTeam.name
                    }</h6></div>
                  </div>
                  <br><br>
                  <hr>
                  <h4 class="col-12 white-text center-align">Durasi         : ${detailMatch.score.duration} </h4>
                  <h4 class="col-12 white-text center-align">Half-time      : ${detailMatch.score.halfTime.homeTeam !== null ? detailMatch.score.halfTime.homeTeam+' - '+detailMatch.score.halfTime.awayTeam : ' - '} </h4>
                  <h4 class="col-12 white-text center-align">Full-time      : ${detailMatch.score.fullTime.homeTeam !== null ? detailMatch.score.fullTime.homeTeam+' - '+detailMatch.score.fullTime.awayTeam : ' - '} </h4>
                  <h4 class="col-12 white-text center-align">Extra-time     : ${detailMatch.score.extraTime.homeTeam !== null ? detailMatch.score.extraTime.homeTeam+' - '+detailMatch.score.extraTime.awayTeam : ' Tidak Ada '} </h4>
                  <h4 class="col-12 white-text center-align">Penalties      : ${detailMatch.score.penalties.homeTeam !== null ? detailMatch.score.penalties.homeTeam+' - '+detailMatch.score.penalties.awayTeam : ' Tidak Ada '} </h4>
                  <div class="card-action">
                    <a class="yellow-text" href="./index.html">Kembali</a>
                  </div>
                </div>
              </div>
            </div>
                `;
        resolve(detailMatch);
        //console.log(detailMatch);
        //document.getElementById("home").innerHTML = card;
      });
    });
  });
}

function getSavedMatches() {
  getAll().then(function(matches) {
    console.log(matches);
    // Menyusun komponen card artikel secara dinamis
    var matchesHTML = "";
    matches.forEach(function(match) {
      
      matchesHTML += `
      <div class="row">
      <div class="col s12 m12">
        <div class="card grey darken-1">
          <div class="card-content white-text">
            <span class="card-title center-align">${
              match.group !== null ? match.group : "Non Group"
            }</span>
  
            <div class="col s4 m4 center-align"><h6>${
              match.homeTeam.name
            }</h6></div>
            <div class="col s4 m4 center-align"><h4>${
              match.score.fullTime.homeTeam === null
                ? "-"
                : match.score.fullTime.homeTeam +
                  " - " +
                  match.score.fullTime.awayTeam
            }</h4></div>
            <div class="col s4 m4 center-align"><h6>${
              match.awayTeam.name
            }</h6></div>
          </div>
          <br><br>
          <div class="card-action right-align">
            <a class="yellow-text" href="./match.html?id=${
              match.id
            }&saved=true">Detail</a>
          </div>
        </div>
      </div>
    </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = matchesHTML;
  });
}

function getSavedMatchById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(match) {
    matchHTML = '';
    var matchHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${match.cover}" />
      </div>
      <div class="card-content">
        <span class="card-title">${match.post_title}</span>
        ${snarkdown(match.post_content)}
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = matchHTML;
  });
}