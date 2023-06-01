///<reference types = "cypress">

class LoginPage {
  elements = {
    signInContainer: () => cy.get(".signInContainer"),
    header: () => cy.get(".welcome-header"),
    numberField: () => cy.get(".form-control"),
    submitBtn: () => cy.get(".submitBottomOption"),
    getHelp: () => cy.get(".get-help > span"),
  };

  visitLogin() {
    cy.visit("/login?referer=https://www.myntra.com/", {
      headers: Cypress.config("headers"),
    });
  }

  checkUiElements() {
    this.visitLogin();
    this.elements.signInContainer().should("be.visible");
    this.elements.header().contains("Login or Signup");
    this.elements.numberField().should("be.visible");
    this.elements.submitBtn().contains("CONTINUE").should("be.visible");
    this.elements.getHelp().contains("Get help").should("be.visible");
  }

  enterRegisteredNumber(){
    
  }
}

module.exports = new LoginPage();
