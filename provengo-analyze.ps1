if(Test-Path .\dummy-bank-storyline\spec\js-disabled\EventDef-no-ops.js) {
	mv -Force .\dummy-bank-storyline\spec\js-disabled\EventDef-no-ops.js .\dummy-bank-storyline\spec\js\
}
if(Test-Path .\dummy-bank-storyline\spec\js\EventDef-selenium.js) {
	mv -Force .\dummy-bank-storyline\spec\js\EventDef-selenium.js .\dummy-bank-storyline\spec\js-disabled\
}
provengo analyze -f pdf --style styled dummy-bank-storyline
