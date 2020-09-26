from flask import Flask, render_template, redirect

app = Flask(__name__)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/craigslist_app")


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

if __name__ == "__main__":
    app.run(debug=True)