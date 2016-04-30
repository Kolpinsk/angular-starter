# link/unlink

link_modules:
	node helpers/link.js

unlink_modules:
	node helpers/unlink.js



# tests

travis-test:
	@ cd generator &&\
	  npm install &&\
	  npm test

test:
	@ cd generator && npm test;



.PHONY: test
