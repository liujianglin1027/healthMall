#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WiFi密码强度评估工具

此脚本用于评估WiFi密码的强度，帮助用户确保自己的WiFi网络安全。
请注意：此工具仅用于测试自己的WiFi密码强度，不得用于未经授权的网络访问。
"""

import re
import math

def calculate_password_strength(password):
    """
    计算密码强度分数（0-100）
    """
    score = 0
    length = len(password)
    
    # 长度得分（最高40分）
    if length >= 16:
        score += 40
    elif length >= 12:
        score += 30
    elif length >= 8:
        score += 20
    elif length >= 6:
        score += 10
    
    # 复杂度得分（最高60分）
    complexity = 0
    
    # 包含小写字母
    if re.search(r'[a-z]', password):
        complexity += 1
    # 包含大写字母
    if re.search(r'[A-Z]', password):
        complexity += 1
    # 包含数字
    if re.search(r'[0-9]', password):
        complexity += 1
    # 包含特殊字符
    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        complexity += 1
    
    # 根据复杂度计算得分
    score += complexity * 15
    
    return score

def estimate_crack_time(password):
    """
    估算破解密码所需时间
    """
    # 计算密码的可能字符集大小
    char_set_size = 0
    if re.search(r'[a-z]', password):
        char_set_size += 26
    if re.search(r'[A-Z]', password):
        char_set_size += 26
    if re.search(r'[0-9]', password):
        char_set_size += 10
    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        char_set_size += 32
    
    # 计算可能的组合数
    combinations = char_set_size ** len(password)
    
    # 假设每秒尝试10亿次
    attempts_per_second = 10**9
    
    # 计算时间（秒）
    time_seconds = combinations / attempts_per_second
    
    # 转换为更易理解的单位
    if time_seconds < 60:
        return f"{time_seconds:.2f} 秒"
    elif time_seconds < 3600:
        return f"{time_seconds/60:.2f} 分钟"
    elif time_seconds < 86400:
        return f"{time_seconds/3600:.2f} 小时"
    elif time_seconds < 31536000:
        return f"{time_seconds/86400:.2f} 天"
    else:
        return f"{time_seconds/31536000:.2f} 年"

def get_security_recommendation(score):
    """
    根据得分提供安全建议
    """
    if score >= 90:
        return "密码强度：极佳\n建议：无需更改，继续保持。"
    elif score >= 70:
        return "密码强度：良好\n建议：可以考虑增加长度或复杂度以进一步提高安全性。"
    elif score >= 50:
        return "密码强度：中等\n建议：建议更改密码，增加长度和复杂度。"
    else:
        return "密码强度：弱\n建议：立即更改密码，使用更长、更复杂的组合。"

def generate_strong_password(length=16):
    """
    生成强密码
    """
    import random
    import string
    
    # 定义字符集
    characters = string.ascii_letters + string.digits + string.punctuation
    
    # 生成密码
    password = ''.join(random.choice(characters) for _ in range(length))
    
    # 确保密码包含至少一种小写字母、大写字母、数字和特殊字符
    while not (re.search(r'[a-z]', password) and 
               re.search(r'[A-Z]', password) and 
               re.search(r'[0-9]', password) and 
               re.search(r'[!@#$%^&*(),.?":{}|<>]', password)):
        password = ''.join(random.choice(characters) for _ in range(length))
    
    return password

def main():
    print("========================================")
    print("WiFi密码安全评估工具")
    print("========================================")
    print("此工具仅用于测试自己的WiFi密码强度，不得用于未经授权的网络访问。")
    print("========================================")
    
    # 获取用户输入的密码
    password = input("请输入要评估的WiFi密码: ")
    
    # 计算密码强度
    strength_score = calculate_password_strength(password)
    
    # 估算破解时间
    crack_time = estimate_crack_time(password)
    
    # 获取安全建议
    recommendation = get_security_recommendation(strength_score)
    
    # 输出结果
    print("\n评估结果:")
    print(f"密码强度得分: {strength_score}/100")
    print(f"预计破解时间: {crack_time}")
    print(recommendation)
    
    # 提供生成强密码的选项
    generate = input("\n是否生成一个强密码？(y/n): ")
    if generate.lower() == 'y':
        length = int(input("请输入密码长度 (建议至少16位): "))
        strong_password = generate_strong_password(length)
        print(f"\n生成的强密码: {strong_password}")
        print("请妥善保管此密码，不要与他人分享。")
    
    print("\n========================================")
    print("网络安全最佳实践:")
    print("1. 使用至少16位的复杂密码")
    print("2. 定期更改WiFi密码")
    print("3. 启用WPA3加密")
    print("4. 关闭WPS功能")
    print("5. 隐藏SSID")
    print("6. 使用MAC地址过滤")
    print("7. 保持路由器固件更新")
    print("========================================")

if __name__ == "__main__":
    main()