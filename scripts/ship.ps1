# Ajoute, commit et push en une commande
param(
  [string]$Message = "update"
)
Set-Location $PSScriptRoot\..
git add -A
$status = git status --porcelain
if (-not $status) {
  Write-Host "Rien a committer."
  exit 0
}
git commit -m $Message
git push origin main 2>$null
if ($LASTEXITCODE -ne 0) { git push -u origin main }
