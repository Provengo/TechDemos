function checkColumns(){
    // This part runs in the browser.
    const table = document.querySelector(pvg.params.tableXPath);
    const rows = Array.from(table.querySelectorAll("tr"));
    const cellValue = function(cell){
        return parseFloat(cell.textContent.replace(/[^0-9.-]/g, ""));
    };
    rows.shift(); // skip the header row
    
    const cellArray = [];

    // check the sum in each row
    rows.forEach(function(row){
        let numberCells = Array.from(row.querySelectorAll("td.numeric")).map(cellValue);
        cellArray.push(numberCells);
    }); 
    let colCount = cellArray[0].length;
    let rowCount = cellArray.length;
    for ( let colIdx = 0; colIdx < colCount; colIdx++ ){
        let actualSum = 0;
        let expectedSum = cellArray[rowCount-1][colIdx];
        for ( let rowIdx = 0; rowIdx < rowCount-1; rowIdx++ ){
            actualSum += cellArray[rowIdx][colIdx];
        }
        pvg.log(`Expected sum at column ${colIdx}: ${expectedSum}, Actual sum: ${actualSum}`);
        if ( expectedSum !== actualSum ){
            pvg.log("FAILING TEST");
            pvg.fail(`Sum in col ${colIdx} is incorrect: expected ${expectedSum}, got ${actualSum}`);
        }
    }
    pvg.success("Column sums OK");
}

function checkRows(){
    // This part runs in the browser.
    const table = document.querySelector(pvg.params.tableXPath);
    const rows = Array.from(table.querySelectorAll("tr"));
    const cellValue = function(cell){
        return parseFloat(cell.textContent.replace(/[^0-9.-]/g, ""));
    };
    rows.shift(); // skip the header row
    
    // check the sum in each row
    rows.forEach(function(row){
        if ( !row.classList.contains("total") ){
            let numberCells = Array.from(row.querySelectorAll("td.numeric"));
            let lastCell = numberCells.pop();
            let expectedSum = cellValue(lastCell);
            let actualSum = numberCells.reduce(function(sum, cell){
                return sum + cellValue(cell);
            },0);
            pvg.log(`Expected sum: ${expectedSum}, Actual sum: ${actualSum}`);
            if ( expectedSum !== actualSum ){
                pvg.log("FAILING TEST");
                pvg.fail("Sum is incorrect");
            } else {
                pvg.success("Sum is correct");
            }
        }
    });
    if ( rows.length > 0 ){  
        pvg.success();
    } else {
        pvg.error("No rows to check");
    }
}

/**
 * Waits for the check specification events. Then performs the appropriate check using runCode.
 */
bthread("Perform check",function(){
    let tableName = waitFor( select("table").any() ).data.value;
    let direction = waitFor( select("direction").any() ).data.value;
    
    block( next, function(){
        session.runCode(
            {tableXPath: `#${tableName}`},
            direction=="rows" ? checkRows : checkColumns
        );
    });
});


bthread("valid-numbers", function(){
    const trigger = maybeEvent("Check cell validity");
    sync({
        waitFor: trigger.yes,
        interrupt: trigger.no
    });
    // waitFor( Event("Check cell validity") );
    block( next, function(){
        session.runCode(tableCheck);
    });
    rtv.assertEq("value1", "@{var1}")
})

function tableCheck(){
            pvg.rtv.set("var1", "value1")
            const currencyRe = /^\$\d{1,3}(,\d{1,3})*(.\d+)+$/;
            const isValidCurrencyAmountText = function(cell){
                return !isNaN(parseFloat(cell.replace(/[^0-9.-]/g, "")));
            };

            const numCells = document.querySelectorAll("td.numeric");
            numCells.forEach(function(cell){
                if ( !isValidCurrencyAmountText(cell.textContent) ){
                    pvg.fail(`Invalid currency value: ${cell.textContent}`);
                }
            });
            pvg.success("All currency values are valid");
        }