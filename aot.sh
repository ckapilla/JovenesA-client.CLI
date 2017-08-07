#!/bin/dash
#!/bin/dash
echo "Clean aot and dist folders"
cd aot
find -name "*" -delete
cd ..
cd dist
find -name "*" -delete
cd ..

cd aot
find -name "*" -print
cd ..
cd dist
find -name "*" -print
cd ..


echo "populate aot folder"
node_modules/.bin/ngc -p tsconfig-aot.json
ls -lat aot


echo "populate dist folder"
npm run build
ls -lat dist
