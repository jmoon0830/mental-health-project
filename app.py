import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect


from flask import Flask, jsonify, render_template

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

app = Flask(__name__)

postgres_name = "postgres"
postgres_password = "Jrazzle0830!"

engine = create_engine(f'postgresql://{postgres_name}:{postgres_password}@localhost/mentalhealthdb')
Base = automap_base()
Base.prepare(engine, reflect=True)
print(dir(Base.classes))
mentalhealth2014 = Base.classes.mental2014
mentalhealth2016 = Base.classes.mental_2016


@app.route("/")
def index():
    return render_template("index-justin.html")

@app.route("/#data")
def data():
    return render_template("index-justin.html#data")

@app.route("/#map")
def map():
    return render_template("index-justin.html#map")

@app.route("/#pie")
def pie():
    return render_template("index-justin.html#pie")

@app.route("/#chartjs")
def chartjs():
    return render_template("index-justin.html#chartjs")

@app.route("/test")
def test():
    session = Session(engine)
    results = session.query(mentalhealth2014).all()

    session.close()
    # mentalhealthresults = list(np.ravel(results))
    mentalhealthresults = [object_as_dict(r) for r in results]
    print(mentalhealthresults[0])
    # print(len(results))
    # for row in results:
    #     print(row)

    return jsonify(mentalhealthresults)

@app.route("/test2")
def test2():
    session = Session(engine)
    results = session.query(mentalhealth2016).all()

    session.close()
    # mentalhealthresults = list(np.ravel(results))
    mentalhealthresults = [object_as_dict(r) for r in results]
    print(mentalhealthresults[0])
    # print(len(results))
    # for row in results:
    #     print(row)

    return jsonify(mentalhealthresults)


if __name__ == "__main__":
    app.run(debug=True)