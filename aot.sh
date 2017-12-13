#!/bin/dash
#!/bin/dash
echo "Clean aot and dist folders"

mkdir aot

cd aot
find -name "*" -print
cd ..

mkdir dist
cd dist
find -name "*" -print
cd ..

cd aot
find -name "*" -print
cd ..
cd dist
find -name "*" -print
cd ..


echo "populate aot folder"
node_modules/.bin/ngc -p ./tsconfig.aot.json
#node_modules/.bin/ngc -p src/tsconfig.app.json
ls -lat aot


#echo "populate dist folder"
#npm run build
#ls -lat dist
