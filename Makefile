build: index.js components
	@component build -n list

standalone:
	@component build --standalone List -n list.standalone
	mkdir -p dist
	mv build/list.standalone.js dist/list.js
	rm build/list.standalone.css
	uglifyjs -o dist/list.min.js dist/list.js

components:
	@component install

clean:
	rm -fr build components dist

.PHONY: clean