class ProductandCart{
    elements = {
        title : () => cy.title(),
        firstProduct : () => cy.get('#desktopSearchResults > div.search-searchProductsContainer.row-base > section > ul > li:nth-child(1) > a'),
        selectSize : () => cy.get('#sizeButtonsContainer > div.size-buttons-size-buttons > div:nth-child(2) > div.size-buttons-buttonContainer > button > span'),
        selectAddToBag : () => cy.get('#mountRoot > div > div:nth-child(1) > main > div.pdp-details.common-clearfix > div.pdp-description-container > div:nth-child(2) > div:nth-child(2) > div > div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center'),
        selectGoToBag : () => cy.get('#mountRoot > div > div:nth-child(1) > main > div.pdp-details.common-clearfix > div.pdp-description-container > div:nth-child(2) > div:nth-child(2) > div > a > span:nth-child(1)'),
        selectBagPage : () => cy.xpath('//*[@id="mountRoot"]/div/div[1]/main/div[2]/div[2]/div[2]/div[2]/div/a'),
        selectProductNameOnProductPage : () => cy.get('h1.pdp-title'),
        selectProductNameInBag : () => cy.get('#cartItemsList > div > div > div > div.itemContainer-base-item > div.itemContainer-base-itemRight > div'),
        selectBagIconUIChange : () => cy.get('.desktop-badge'),
    }


    
    visitProductsPage(){
        cy.visit('/clothing',{headers : Cypress.config('headers')})
    }
    
    selectingFirstProduct(){
        this.visitProductsPage()
        this.elements.firstProduct().invoke('removeAttr','target').click()
    }

    selectingProductSize(){
        this.selectingFirstProduct()
        this.elements.selectSize().parent().click()
    }

    addingProductToBag(){
        this.selectingProductSize()
        this.elements.selectAddToBag().click()
    }

    assertingForTextChange(){
        this.addingProductToBag()
        this.elements.selectGoToBag().contains('GO TO BAG')
    }

    navigatingToBagPage(){
        this.elements.selectBagPage().invoke('removeAttr','target').click()

    }

    assertingForProductNameOnCartPage(x){
        this.elements.selectProductNameInBag().contains(x) // x is what needs to be verified.
    }

    selectingProductNameOnProductPage(){
        this.elements.selectProductNameOnProductPage()
    }

    validatingUIChange(){
        this.elements.selectBagIconUIChange().should("exist")
    }



    
}



module.exports = new ProductandCart; 