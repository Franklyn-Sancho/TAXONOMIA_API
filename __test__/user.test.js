const server = require("../server");
const request = require("supertest");

describe("Users tests", () => {
  it("Should create a moderator", async () => {

    const response = await request(server).post("/users/signup").send({
      email: "lilo@email.com",
      password: "12345",
    });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("frank@email.com");
  });

  it("Should login moderator", async () => {
    const response = await request(server).post("/users/signin").send({
      email: "lilo@email",
      password: "12345",
    });

    expect(response.status).toBe(200);
  });
});


