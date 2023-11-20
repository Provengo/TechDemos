if(Test-Path .\dummy-bank-storyline\spec\js\EventDef-no-ops.js) {
	mv -Force .\dummy-bank-storyline\spec\js\EventDef-no-ops.js .\dummy-bank-storyline\spec\js-disabled\
}
if(Test-Path .\dummy-bank-storyline\spec\js-disabled\EventDef-selenium.js) {
	mv -Force .\dummy-bank-storyline\spec\js-disabled\EventDef-selenium.js .\dummy-bank-storyline\spec\js\
}
provengo run --show-sessions dummy-bank-storyline