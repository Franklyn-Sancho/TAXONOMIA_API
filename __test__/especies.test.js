const server = require("../server");
const request = require("supertest");

describe("Especies tests", () => {
    it("Should create a especie", async () => {
      const response = await request(server).post("/form").send({
        name: "tigre",
        reino: "animalia",
        filo: "chordata",
        classe: "mammalia",
        infraclasse: "plancetália",
        ordem: "carnivoro",
        familia: "panthera",
        genero: "felidae",
        especie: "c. tigre",
      });
  
      expect(response.status).toBe(200)
    });
  });