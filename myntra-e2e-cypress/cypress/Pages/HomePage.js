///<reference types = "cypress">

class HomePage {
  elements = {
    title: () => cy.title(),
    navbar: () => cy.get("#desktop-header-cnt"),
    logo: () => cy.get(".desktop-logoContainer > .myntraweb-sprite"),
    men: () => cy.get('[data-reactid="19"] > .desktop-navLink > .desktop-main'),
    searchbar: () => cy.get(".desktop-searchBar"),
    searchbarSubmit: () => cy.get(".desktop-submit > .myntraweb-sprite"),
    profile: () => cy.get(".desktop-user"),
    wishlist: () => cy.get(".desktop-wishlist > .myntraweb-sprite"),
    bag: () => cy.get(".desktop-cart > .myntraweb-sprite"),
  };

  visitHomepage() {
    cy.visit("/", {
      headers: Cypress.config("headers"),
    });
    cy.wait(5000);
  }

  navbarIsloaded() {
    this.visitHomepage();
    cy.get(this.elements.navbar).should("be.visible");
    cy.get(this.elements.logo).should("be.visible");
    cy.get(this.elements.men).contains("Men").should("be.visible");
    cy.get(this.elements.searchbar).should("be.visible");
    cy.get(this.elements.profile).should("be.visible");
    cy.get(this.elements.wishlist).should("be.visible");
    cy.get(this.elements.bag).should("be.visible");
  }

  visitMens() {
    this.visitHomepage();
    this.elements.men().contains("Men").scrollIntoView().click();
  }

  clickOnLogin() {
    this.visitHomepage();
    cy.get(this.elements.navbar).should("be.visible");
    // cy.get('.desktop-user').trigger('mouseover');
    cy.get(".desktop-userIconsContainer > .desktop-userTitle").trigger(
      "mouseover"
    );
    // cy.get('.desktop-userActions').should('be.visible');
    // this.elements.profile().trigger("mouseover");
    // this.elements.profile().should("be.visible");
    // cy.contains("LOGIN / SIGNUP").click();
    cy.get('')

    cy.get(".desktop-userActions a:first-child").should("be.visible").click();
  }
}

module.exports = new HomePage();
