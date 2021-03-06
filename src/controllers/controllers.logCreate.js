const fs = require("fs");

function createLastEntryLog(especie) {
  let data = JSON.stringify(especie, null, 2);

  fs.writeFile(`last-entry-log-${Date}.json`, data, (err) => {
    if (err) throw err;
    console.log(`Log de registro criado com sucesso ${Date()}`);
  });
}

function createAllEntryLog(especie) {
  let data = JSON.stringify(especie, null, 2);

  fs.writeFile(`data-logs-${Date()}.json`, data, (err) => {
    if (err) throw err;
    console.log("Log de registros atualizados com sucesso");
  });
}

module.exports = {
    createAllEntryLog,
    createLastEntryLog
}