import os
import sqlite3
import pickle
import hashlib

def process_user_data(user_input, secret_key="SUPER_SECRET_123"):
    # 1. Hardcoded Secret (High Severity)
    print(f"Using key: {secret_key}")
    
    # 2. Command Injection (High Severity)
    # Attack: "; rm -rf /"
    os.system("echo " + user_input)
    
    # 3. SQL Injection (High Severity)
    # Attack: "' OR '1'='1"
    conn = sqlite3.connect("users.db")
    conn.execute("SELECT * FROM users WHERE name = '%s'" % user_input)
    
    # 4. Insecure Deserialization (Critical Severity)
    # Can lead to Remote Code Execution (RCE)
    data = pickle.loads(user_input.encode())
    
    # 5. Weak Hashing Algorithm (Medium Severity)
    # MD5 is cryptographically broken
    return hashlib.md5(user_input.encode()).hexdigest()
