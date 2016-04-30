travis-test:
	@ cd generator
	@ npm install
	@ npm test

test:
	@ cd generator && npm test;

.PHONY: test
