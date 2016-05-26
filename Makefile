test:
	@ cd generator &&\
	  if [ $CI ]; then npm install; fi &&\
	  npm test &&\
	  cd ../webpack-config &&\
	  if [ $CI ]; then npm install; fi &&\
	  npm test &&\
	  cd ../stylelint-config &&\
	  if [ $CI ]; then npm install; fi &&\
	  npm test &&\
	  cd ../styleguide &&\
	  if [ $CI ]; then npm install; fi &&\
	  npm test;

.PHONY: test
