function add(a, b) {
    console.log("debug"); // ❌ mauvaise pratique
    return a + b;
}

function divide(a, b) {
    return a / b; // ⚠ pas de vérification division par 0
}

module.exports = { add, divide };
