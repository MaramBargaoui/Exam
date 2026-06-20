param(
    [string]$BackendUrl = "http://localhost:8080/api-docs"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$specDir = Join-Path $root "openapi"
$publicDir = Join-Path $root "public\openapi"

New-Item -ItemType Directory -Force -Path $specDir | Out-Null
New-Item -ItemType Directory -Force -Path $publicDir | Out-Null

Write-Host "Fetching OpenAPI spec from $BackendUrl ..."
Invoke-WebRequest -Uri $BackendUrl -OutFile (Join-Path $specDir "openapi.json") -UseBasicParsing
Copy-Item (Join-Path $specDir "openapi.json") (Join-Path $publicDir "openapi.json") -Force

Write-Host "OpenAPI spec saved to openapi/openapi.json and public/openapi/openapi.json"
