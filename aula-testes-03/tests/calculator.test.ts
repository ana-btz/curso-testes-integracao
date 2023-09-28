import calculator from "calculator"

describe("math functions", () => {
    it("returns 5 for 2 and 3 params", () => {
        // Chamar a função que queremos testar com os paremetros
        const result = calculator.sum(2, 3);
        // Nesse cenário esperamos o resultado 5
        expect(result).toEqual(5);
    });

    it("returns -1 for 2 and 3 params", () => {
        const result = calculator.sub(2, 3);
        expect(result).toEqual(-1);
    });

    it("returns 2/3 for 2 and 3 params", () => {
        const result = calculator.div(2, 3);
        expect(result).toEqual(2 / 3);
    });

    it("returns 6 for 2 and 3 params", () => {
        const result = calculator.mul(2, 3);
        expect(result).toEqual(6);
    });
});