
describe("This is our first test", () => {
    it("should return true", ()=>{
        expect("true").to.equal("true");
    })
})

describe("Testing our forms inputs", () => {
    beforeEach(function () {
        cy.visit("http://localhost:3000/");
    });

    it("Finds the name input", () => {
        // Arrange - get the element
        cy.get('[for="name"]')
        // Act - Mimic user interaction
        // Assert - Test/Verify
    })
})