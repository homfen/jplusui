@IF EXIST "%~dp0\node\node.exe" (
  "%~dp0\node\node.exe"  "%~dp0\server\start.js" %*
) ELSE (
  node  "%~dp0\server\start.js" %*
)