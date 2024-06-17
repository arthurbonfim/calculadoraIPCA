import inflationHistory from "../data/data.js";

export const returnHistory = () => inflationHistory;

export const filterByYear = (year) => {
    return inflationHistory.filter(u => u.ano === year);
}

export const returnById = (id) => {
    return inflationHistory.find(u => u.id === id);
}

export const returnFluctuation = (value, initialMonth, initialYear, finalMonth, finalYear ) => {
    let calcResult = value;
    let startDate = new Date(initialYear, initialMonth);
    let endDate = new Date(finalYear, finalMonth);

    let periodFlut = inflationHistory.filter(u => {
        return (new Date(u.ano,u.mes)) >= startDate &&
        (new Date(u.ano,u.mes)) <= endDate;
    });

    if(startDate > endDate) {
        return {"err":"Invalid parameter"}
    }else{
        periodFlut.forEach(i => calcResult = calcResult * (1 +( i.ipca / 100)));
        return {"result":calcResult.toFixed(2)};
    }
}
