test:
	@ cd generator &&\
		if [ $CI ]; then npm install; fi &&\
	  npm test &&\
	  cd ../styleguide &&\
		if [ $CI ]; then npm install; fi &&\
	  npm test;

.PHONY: test
