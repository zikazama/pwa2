var dbPromised = idb.open("mantap-bola", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("matches", {
    keyPath: "ID",
  });
  articlesObjectStore.createIndex("group", "group", {
    unique: false,
  });
});

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("matches", "readonly");
        var store = tx.objectStore("matches");
        return store.getAll();
      })
      .then(function (matches) {
        resolve(matches);
      });
  });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("matches", "readonly");
          var store = tx.objectStore("matches");
          return store.get(id);
        })
        .then(function(match) {
          resolve(match);
        });
    });
  }

function saveForLater(match) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("matches", "readwrite");
      var store = tx.objectStore("matches");
      console.log(match);
      store.add(match);
      return tx.complete;
    })
    .then(function () {
      console.log("Pertandingan berhasil di simpan.");
    });
}
