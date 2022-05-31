import sqlite3
import json

con = sqlite3.connect('book_score.db')
cur = con.cursor()

cur.execute("""
CREATE TABLE USERS (
ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
NAME TEXT NOT NULL,
BOOKS_READ TEXT NOT NULL,
X INT NOT NULL,
Y INT NOT NULL,
Z INT NOT NULL
);""")

cur.execute("""
CREATE TABLE BOOK_LIST (
ID INT PRIMARY KEY NOT NULL,
NAME TEXT NOT NULL,
IMAGE TEXT NOT NULL,
CATEGORY INT NOT NULL,
SUB_NUMBER INT NOT NULL,
AUTHOR TEXT NOT NULL
);""")

f = json.load(open("data.json"))["books"]
for ind,item in enumerate(f):
	cur.execute("INSERT INTO BOOK_LIST (ID, NAME, IMAGE, CATEGORY, SUB_NUMBER, AUTHOR) VALUES(?, ?, ?, ?, ?, ?)",(ind,item['name'],item['image'],item['category'],item['number'],item['author']))
con.commit()
print("Migration Complete")


print(cur.execute("select * from BOOK_LIST"))
print(cur.fetchall())
con.close()