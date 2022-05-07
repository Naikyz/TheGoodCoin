from fastapi import FastAPI
from productType import Product
from json import dumps, loads
from os.path import exists
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

headers = {
    'Content-Type': 'application/json'
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/CID/")
async def create_watcher(params: dict):
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    for d in data:
        if d["CID"] == params["CID"]:
            return 400

    data.append({"name": params["name"], "description": params["description"],"price": params["price"], "CID": params["CID"]})
    print(data)
    f = open("./save.json", "w")
    f.write(dumps(data))
    f.close()
    return 200


@app.get("/CID/")
async def get_watchers():
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    return data


@app.delete("/CID/")
async def delete_watcher(params: dict):
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
        for d in data:
            if d["CID"] == params["CID"]:
                data.remove(d)
    else:
        data = []
    f = open("./save.json", "w")
    f.write(dumps(data))
    f.close()
    return 200
