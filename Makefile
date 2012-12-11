build: index.js components
	@component build -n list

standalone:
	@component build --standalone List -n list.standalone
	mkdir -p dist
	mv build/list.standalone.js dist/list.js
	rm build/list.standalone.css

components:
	@component install

clean:
	rm -fr build components

.PHONY: clean