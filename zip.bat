powershell -Command "Remove-Item -Path 'build\facebook-auto-poke-back.zip' -Force -ErrorAction SilentlyContinue"

powershell -Command "Compress-Archive -Path 'src\*' -DestinationPath 'build\facebook-auto-poke-back.zip' -Force"