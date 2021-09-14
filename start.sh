if  ls | grep -q 'node_modules'; then
        clear
	while true
        do
		clear
        	node index.js
	done
else
	npm install
        clear
        while true
        do
		clear
        	node index.js
	done
fi