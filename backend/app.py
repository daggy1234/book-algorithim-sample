from ctypes import string_at
from datetime import datetime
import sqlite3
from typing import TypedDict
from flask import Flask
from flask import request
import werkzeug.exceptions
from flask_cors import CORS

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

con = sqlite3.connect('book_score.db')
con.row_factory = dict_factory
cur = con.cursor()

app = Flask(__name__)
CORS(app)



class BookRec(TypedDict):
	name: str
	author: str
	image: str
	category: int
	sub_number: int
	id: int

class ParameterDict(TypedDict):
	x: int
	y: int
	z: int

class BookPost(TypedDict):
	name: str
	date_of_birth: str
	books_read: str
	parameters: ParameterDict


def get_rec_type(x: int,y: int,z: int) -> tuple[int,int]:
	xy = x * y
	xz = z * x
	yz = y * z
	if xy > xz and xy > yz:
		if xy <=3:
			return (1,1)
		elif xy > 6:
			return (1,2)
		else:
			return (1,3)
	elif yz > xy and yz > xz:
		if yz <=3:
			return (1,1)
		elif yz > 6:
			return (1,2)
		else:
			return (1,3)
	elif xz > xy and xz > yz:
		if xz <=3:
			return (1,1)
		elif xz > 6:
			return (1,2)
		else:
			return (1,3)
	else:
		if xy == xz == yz:
			print("Wow 3 genres all liked equally. Type 7")
			return (7,0)
		elif xy == xz:
			print("Type 4")
			return (4,0)
		elif yz == xy:
			print("Type 5")
			return (5,0)
		elif xz == yz:
			print("Type 6")
			return (6,0)
		else:
			print("Unreachable case")
			return(0,0)


def get_rec(x: int, y: int, z: int) -> BookRec:
	global cur
	c,sn = get_rec_type(x,y,z)
	cur.execute('SELECT * FROM BOOK_LIST WHERE CATEGORY=? and SUB_NUMBER=?', (c,sn))
	out: BookRec = cur.fetchone()
	return out

@app.errorhandler(werkzeug.exceptions.BadRequest)
def handle_bad_request(e):
    return {"error": 'bad request!'}, 400


@app.errorhandler(werkzeug.exceptions.NotFound)
def handle_not_found_request(e):
    return {"error": 'not found'}, 404

@app.errorhandler(werkzeug.exceptions.InternalServerError)
def handle_internal_error_request(e):
    return {"error": f'Internal Server Error Occured: {e}'}, 500

@app.route("/")
def hello_world():
    return {"hello": "world"}

@app.route("/book-rec", methods=['POST'])
def get_book_rec():
	if request.method == 'POST':
		if isinstance(request.json, list):
			return {"error": "incorrect_body"}, 400
		data: BookPost = request.json
		print(data)
		params = data["parameters"]
		out = get_rec(params["x"], params["y"], params["z"])
		cur.execute("INSERT INTO USERS (NAME, BOOKS_READ, X, Y, Z) VALUES(?,?,?,?,?)", (data["name"], data["books_read"], params["x"], params["y"], params["z"]))
		con.commit()
		return {"body": out}
	return {"aaa": "why"}





