from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict

app = FastAPI()

# --- 1. DATA MODELS ---

# Login Model (Updated to use IC Number to match your latest App)
class UserLogin(BaseModel):
    ic_number: str
    password: str

# Signup Model
class UserSignup(BaseModel):
    full_name: str
    ic_number: str
    password: str

# App Restriction Model
class AppRestriction(BaseModel):
    id: int
    name: str
    icon_type: str  # 'social', 'game', 'edu'
    is_allowed: bool
    status_text: str

# --- 2. MOCK DATABASES ---

# User Data (Key = IC Number)
# We combined the 'user' info and 'balance' info into one record
users_db = {
    "050101-14-1234": {
        "name": "Lee Wei Jie",
        "password": "password123",
        "role": "student",
        "balance": 15.50
    },
    # Fallback for email testing if you revert code
    "test@example.com": {
        "name": "Test User",
        "password": "password123",
        "role": "student",
        "balance": 10.00
    }
}

# Apps Data
apps_db = [
    {"id": 1, "name": "Social Media", "icon_type": "social", "is_allowed": False, "status_text": "BLOCKED by Parent"},
    {"id": 2, "name": "Gaming Apps", "icon_type": "game", "is_allowed": True, "status_text": "1 hr Left"},
    {"id": 3, "name": "Educational Apps", "icon_type": "edu", "is_allowed": True, "status_text": "Allowed"},
]

# --- 3. API ROUTES ---

@app.get("/")
def read_root():
    return {"status": "SmartID System API Running", "message": "Ready for connections"}

# --- AUTHENTICATION ROUTES ---

@app.post("/login")
def login(data: UserLogin):
    # Check if user exists (by IC Number)
    user = users_db.get(data.ic_number)
    
    if not user or user['password'] != data.password:
        raise HTTPException(status_code=400, detail="Invalid IC Number or Password")
    
    return {
        "status": "success", 
        "user": user['name'], 
        "role": user['role'],
        "balance": user['balance']
    }

@app.post("/signup")
def signup(data: UserSignup):
    if data.ic_number in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Mock creation
    users_db[data.ic_number] = {
        "name": data.full_name,
        "password": data.password,
        "role": "student",
        "balance": 0.00
    }
    return {"status": "created", "user": data.full_name}

# --- DASHBOARD & ACTIVITY ROUTES ---

@app.get("/daily-limits")
def get_limits():
    # In a real app, we would calculate this from a transaction DB
    return {
        "food": {"spent": 5.00, "limit": 10.00},
        "travel": {"spent": 0.70, "limit": 8.00},
        "transactions": [
            {"type": "Canteen", "amount": 5.00, "time": "12:30 PM"},
            {"type": "Bus", "amount": 0.70, "time": "08:00 AM"}
        ]
    }

# --- APP RESTRICTION ROUTES ---

@app.get("/restrictions", response_model=List[AppRestriction])
def get_restrictions():
    return apps_db

@app.post("/restrictions/toggle/{app_id}")
def toggle_restriction(app_id: int):
    # Find app and toggle boolean
    for app_item in apps_db:
        if app_item["id"] == app_id:
            app_item["is_allowed"] = not app_item["is_allowed"]
            
            # Update status text dynamically based on new state
            if app_item["is_allowed"]:
                app_item["status_text"] = "Allowed"
            else:
                app_item["status_text"] = "BLOCKED by Parent"
                
            return {"status": "updated", "new_state": app_item["is_allowed"], "text": app_item["status_text"]}
            
    raise HTTPException(status_code=404, detail="App not found")

# To run: uvicorn main:app --reload