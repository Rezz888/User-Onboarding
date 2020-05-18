
describe("This is our first test", () => {
    it("should return true", ()=>{
        expect("true").to.equal("true");
    })
})

describe("Testing our forms inputs", () => {
    beforeEach(function () {
        cy.visit("http://localhost:3000/");
    });

    //pulling url from beforeEach
    it("Input name into the name input", () => {
        //Arrange - Get the element
        //Act - Mimic user interaction
        //Assert - Test / Verify
        cy.get('input[name="name"]')
        .type("Rezaur Rahman")
        .should("have.value", "Rezaur Rahman")

        cy.get('input[name="email"]')
        .type("waffle@lala.com")
        .should("have.value", "waffle@lala.com")
        cy.contains("Email is taken");
        cy.get('input[name="email"]')
        .clear();
        cy.contains("Must include email address");
        cy.get('input[name="email"]')
        .type("razeeeb@gmail.com")
        .should("have.value", "razeeeb@gmail.com")

        cy.get('input[name="password"]')
        

        cy.get('select').select('Teacher')
       

        cy.get('input[type="checkbox"]').check().should("be.checked");

        cy.get("form").submit();

        cy.get('.users')
        .should('exist')
        
    });
});