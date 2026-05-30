# Active les hooks Git (push auto après chaque commit)
Set-Location $PSScriptRoot\..
git config core.hooksPath .githooks
Write-Host "Hooks actives: push automatique apres chaque commit (git commit)."
