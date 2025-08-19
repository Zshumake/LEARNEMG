#!/usr/bin/env python3
"""
Check the actual structure of the Anki database
"""

import sqlite3

def check_database_structure():
    """Check what tables and columns exist in the database"""
    db_path = "/Volumes/Internal Storage/Working Programs/EMG_flashcards/collection.anki2"
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get all table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        
        print("📋 Available tables:")
        for table in tables:
            print(f"  - {table[0]}")
        
        print("\n" + "="*50)
        
        # Check structure of key tables
        for table_name in ['notes', 'cards', 'col']:
            try:
                cursor.execute(f"PRAGMA table_info({table_name})")
                columns = cursor.fetchall()
                
                print(f"\n🔍 Table '{table_name}' structure:")
                for col in columns:
                    print(f"  {col[1]} ({col[2]})")
            except:
                print(f"\n❌ Table '{table_name}' not found")
        
        # Try to get a sample of notes
        try:
            cursor.execute("SELECT * FROM notes LIMIT 5")
            sample_notes = cursor.fetchall()
            print(f"\n📝 Sample notes ({len(sample_notes)} rows):")
            for note in sample_notes:
                print(f"  Note: {note}")
        except Exception as e:
            print(f"\n❌ Error getting sample notes: {e}")
        
        # Check if there's a col table with deck info
        try:
            cursor.execute("SELECT * FROM col LIMIT 1")
            col_data = cursor.fetchall()
            print(f"\n🗂️ Collection info:")
            for col in col_data:
                print(f"  {col}")
        except Exception as e:
            print(f"\n❌ Error getting collection info: {e}")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Error checking database: {e}")

if __name__ == "__main__":
    check_database_structure()