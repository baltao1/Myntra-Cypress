import ProductandCart from "../Pages/ProductPage"; // Using Page Object Model
import "../support/index"

function pPriceSet(x){  // A function to prepare last three digits of the price to compare.
    x = x.split('')
    x.shift()
    let leng = 3;  // Because we are checking only the last three digits of the amount.
    let ans = ''
    for(let cc = ( x.length - leng ) ; cc < x.length ; cc++ ) ans+=x[cc]
    return ans
}

describe('Product & Cart Module',()=>{

    // Cypress.once('uncaught:exception', (err, runnable) => {
    //     return false;
    // }) // This solves the gtag error which is rather harmless but fails the test.

    
    it('Add to Bag Button UI',()=>{
        Cypress.once('uncaught:exception', (err, runnable) => {
            return false;
        })

        ProductandCart.assertingForTextChange()       
        
    })

    

    it('Add to Bag Button Functionality',()=>{
        Cypress.once('uncaught:exception', (err, runnable) => {
                 return false;
        })
        
        ProductandCart.addingProductToBag()
        
        cy.get('h1.pdp-title').then(($heading) => {
            let headingText = $heading.text();
            return headingText;
        }).then(hText => {
            ProductandCart.navigatingToBagPage()
            cy.wait(1000)
            ProductandCart.assertingForProductNameOnCartPage(hText)
        
        })
    })

    

    it('Bag Icon UI Change',()=>{
        ProductandCart.addingProductToBag()
        ProductandCart.validatingUIChange()
    })

    it('Cart Page UI/UX (Product Name)',()=>{
        ProductandCart.addingProductToBag()
        
        cy.get('h1.pdp-title').then(($heading) => {
            let headingText = $heading.text();
            return headingText;
        }).then(hText => {
            ProductandCart.navigatingToBagPage()
            cy.wait(1000)
            ProductandCart.assertingForProductNameOnCartPage(hText)
        
        })
    })

   

    it('Cart Page UI/UX (Product Details)',()=>{
        ProductandCart.addingProductToBag()
        cy.get('h1.pdp-name').then(($heading) => {
            let headingText = $heading.text();
            return headingText;
        }).then(pText => {
            ProductandCart.navigatingToBagPage()
            cy.wait(1000)
            cy.get('#cartItemsList > div > div > div > div.itemContainer-base-item > div.itemContainer-base-itemLeft > div > div.animation-fadeIn > div > div.itemComponents-base-toolTipContainer > div.itemComponents-base-toolTipCTA').click({force:true})
            cy.get('#cartItemsList > div > div > div > div.itemContainer-base-item > div.itemContainer-base-itemRight > div').contains(pText).screenshot()
        
        })
    })

    

    it('Cart Page UI/UX (Product Price)',()=>{
        ProductandCart.addingProductToBag()
        cy.get('#mountRoot > div > div:nth-child(1) > main > div.pdp-details.common-clearfix > div.pdp-description-container > div.pdp-price-info > div > p.pdp-discount-container > span.pdp-price').then(($heading) => {
            let headingText = $heading.text();
            let digi = pPriceSet(headingText)
            return digi;
         }).then(hText => {
            ProductandCart.navigatingToBagPage()
            cy.wait(1000)
            cy.get('.itemContainer-base-price').contains(hText).screenshot()
        
        })
    })

   

    it('Complete User Workflow Adding Product to the Bag',()=>{
        ProductandCart.visitProductsPage()
        cy.get('#desktopSearchResults > div.search-searchProductsContainer.row-base > section > ul > li:nth-child(1) > a').invoke('removeAttr','target').click() // Open Product Page in the Same Browser Tab.
        cy.get('#sizeButtonsContainer > div.size-buttons-size-buttons > div:nth-child(3) > div.size-buttons-buttonContainer > button > span').parent().click() // Select Third Product Size.
        cy.get('#mountRoot > div > div:nth-child(1) > main > div.pdp-details.common-clearfix > div.pdp-description-container > div:nth-child(2) > div:nth-child(2) > div > div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center').click() // Clicking on Add to Bag Button.
        cy.get('#mountRoot > div > div:nth-child(1) > main > div.pdp-details.common-clearfix > div.pdp-description-container > div:nth-child(2) > div:nth-child(2) > div > a > span:nth-child(1)').contains('GO TO BAG') // Asserting the Text Transformation.
        cy.get('#desktop-header-cnt > div.desktop-bound > div.desktop-actions > a.desktop-cart > span.desktop-badge.desktop-melon').should("exist") // UI Change occurs in the Bag Icon.
        cy.get('#desktop-headerMount > div > div.notify-container > div').should('be.visible').contains('Added to bag') // Adding Product to the Cart sends an alert popup which also contains the text "Added to Bag".

    })

})