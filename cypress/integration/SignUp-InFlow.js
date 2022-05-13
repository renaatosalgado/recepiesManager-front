/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

const user = {
  name: faker.lorem.words(2),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

let token = "";

describe("Sign-up, sign-in and logout flow", () => {
  before(() => {
    cy.request("DELETE", "http://localhost:5000/users/reset");
  });

  it("should create a new user", () => {
    cy.visit("http://localhost:3000/");

    cy.get("input[name=name]").type(user.name);
    cy.get("input[name=email]").type(user.email);
    cy.get("input[name=password]").type(user.password);
    cy.get("input[name=passwordConfirmation]").type(user.password);

    cy.intercept("POST", "/users/sign-up").as("createUser");
    cy.get("button[type=submit]").click();

    cy.wait("@createUser");
    cy.contains("Cadastro efetuado com sucesso!").should("be.visible");
    cy.url().should("equal", "http://localhost:3000/sign-in");
    cy.contains("Entrar").should("be.visible");
  });

  it("should sign-in with the created user credentials and then logout", () => {
    cy.visit("http://localhost:3000/sign-in");

    cy.get("input[name=email]").type(user.email);
    cy.get("input[name=password]").type(user.password);

    cy.intercept("POST", "/auth/sign-in").as("signIn");
    cy.get("button[type=submit]").click();

    cy.wait("@signIn");
    cy.contains("Suas receitas").should("be.visible");
    cy.url().should("equal", "http://localhost:3000/home");

    cy.get("#account-btn").click();
    cy.intercept("DELETE", "/auth/logout").as("logout");

    cy.contains("Logout").click();
    cy.wait("@logout");

    cy.url().should("equal", "http://localhost:3000/sign-in");
    cy.contains("Sessão encerrada, por favor faça login novamente.");
    cy.contains("Acesso");
  });
});
