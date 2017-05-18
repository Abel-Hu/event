@echo off

:一定要强制杀死node，不然runtime文件夹不能删除
wmic process where name='node.exe' call terminate

cd %cd%\

:windows安装node依赖
rd /s /q app
rd /s /q runtime
rd /s /q node_modules
rd /s /q coverage
rd /s /q .nyc_output
npm install
