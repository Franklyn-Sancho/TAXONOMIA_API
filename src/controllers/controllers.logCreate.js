const fs = require("fs");

function createLastEntryLog(especie) {
  let data = JSON.stringify(especie, null, 2);

  fs.writeFile(`last-entry-log.json`, data, (err) => {
    if (err) throw err;
    console.log(`Log de registro criado com sucesso ${Date()}`);
  });
}


function createAllEntryLog(especie) {
  let data = JSON.stringify({
    Date: `última atualização ${Date()}`,
    Especies: especie
  });

  fs.writeFile(`data-logs.json`, data, (err) => {
    if (err) throw err;
    console.log("Log de registros atualizados com sucesso");
  });
}

module.exports = {
    createAllEntryLog,
    createLastEntryLog
}