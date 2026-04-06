# 启动健康商城并自动启用iPhone 14 Pro Max设备模式

# 设置Chrome路径
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"

# 检查Chrome是否存在
if (-not (Test-Path $chromePath)) {
    Write-Host "Chrome not found at $chromePath"
    Write-Host "Please install Chrome or update the path in this script"
    pause
    exit
}

# 启动Vite开发服务器（如果还没有启动）
Write-Host "Starting Vite development server..."
Start-Process "npm" -ArgumentList "run dev" -WorkingDirectory "d:\personal\aiAst\healthMall" -NoNewWindow

# 等待服务器启动
Write-Host "Waiting for server to start..."
Start-Sleep -Seconds 3

# 启动Chrome并启用设备模式
Write-Host "Starting Chrome with iPhone 14 Pro Max device mode..."
$chromeArgs = @(
    "--auto-open-devtools-for-tabs",
    "--user-data-dir=D:\personal\aiAst\healthMall\chrome-profile",
    "http://localhost:5173"
)

Start-Process $chromePath -ArgumentList $chromeArgs

Write-Host "Health Mall app started with iPhone 14 Pro Max device mode"
Write-Host "Please wait for Chrome to open and devtools to load"
